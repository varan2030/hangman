import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/service/word.service';
import { Subscription } from 'rxjs';
import { DefinitionService } from 'src/app/service/definition.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { GifService } from 'src/app/service/gif.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  hiddenWord: any[];
  word: string;
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  wordSubscription: Subscription;
  rightAnswer = [];
  wrongAnswer = [];
  attempts: number = 8;
  selected: any;
  definition: string = '';
  winScore: number = 0;
  lostScore: number = 0;
  hintClicked: boolean = false;
  defClicked: boolean = false;
  constructor(
    private wordService: WordService,
    private definitionService: DefinitionService,
    private gifService: GifService,
    private modalDialog: MatDialog
  ) {}

  startNewGame() {
    this.rightAnswer = [];
    this.wrongAnswer = [];
    this.attempts = 8;
    this.hintClicked = false;
    this.defClicked = false;
    this.definition = '';
    this.wordSubscription = this.wordService.getWord().subscribe(data => {
      if (data) {
        this.word = data.word;
        this.hiddenWord = Array(data.word.length).fill(' ');
      }
    });
  }

  getLetter(letter) {
    if (this.attempts > 0 && this.hiddenWord.includes(' ')) {
      if (this.word.includes(letter)) {
        for (let i = 0; i < this.word.length; i++) {
          if (this.word[i] === letter) {
            this.hiddenWord[i] = letter.toUpperCase();
          }
        }
        this.rightAnswer.push(letter);
        if (!this.hiddenWord.includes(' ')) {
          this.openModal('win');
          this.winScore++;
        }
      } else {
        if (!this.wrongAnswer.includes(letter)) {
          this.wrongAnswer.push(letter);
          this.attempts--;
          if (this.attempts <= 0) {
            this.openModal('lost');
            this.lostScore++;
          }
        }
      }
    }
  }

  getDefinition() {
    this.defClicked = true;
    this.definitionService.getDefinition(this.word).subscribe(data => {
      if (data) {
        this.definition = data.definition[0];
      }
    });
    if (this.attempts <= 0) {
      this.openModal('lost');
      this.lostScore++;
    }
  }

  getHint() {
    this.hintClicked = true;
    const letter = () =>
      this.word[Math.floor(Math.random() * this.word.length)];
    this.getLetter(letter());
    if (this.hiddenWord.includes(letter)) {
      this.getHint();
    }
  }

  openModal(status?) {
    if (status === 'win') {
      this.gifService.getGif(this.word).subscribe(gifUrl => {
        console.log(gifUrl);
        this.modalDialog.open(ModalComponent, {
          data: {
            status: 'win',
            gifUrl: gifUrl.gif
          }
        });
      });
    } else {
      this.modalDialog.open(ModalComponent, {
        data: {
          status: 'lost',
          message: `The word is: ${this.word}`
        }
      });
    }
  }

  ngOnInit(): void {
    this.startNewGame();
  }
}
