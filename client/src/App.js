import React from "react";
import "./App.css";
import API from "./utils/API";

function App() {
	API.getWord()
		.then((item) => console.log(item))
		.catch((err) => console.log(err));
	return <div className="App">Hangman</div>;
}

export default App;
