import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hidden-letters',
  templateUrl: './hidden-letters.component.html',
  styleUrls: ['./hidden-letters.component.scss']
})
export class HiddenLettersComponent implements OnInit {
  @Input() letter: string;

  constructor() {}

  ngOnInit(): void {}
}
