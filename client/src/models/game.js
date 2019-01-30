const PubSub = require('../helpers/pub_sub.js');
const LettersGameView = require('../views/letters_game_view.js');
const NumbersGameView = require('../views/numbers_game_view.js');
const ConundrumGameView = require('../views/conundrum_view.js')
const Letters = require('./letters.js');
const Words = require('./words.js')
// const Conundrum = require('./conundrum.js')
const PlayerView = require('../views/player_view.js');
const Numbers = require('./numbers.js');

const Game = function() {
}

Game.prototype.playCountdown = function(){

  let round = 0;
  //Generates a new word checker object and listens for the channel relating to when a word is submitted
  const words = new Words();
  words.loadWords();

  const letters = new Letters();
  const numbers = new Numbers();
  // const conundrum = new Conundrum();

  const rounds = ["C","L","L"];

  let lettersGameView;
  let conundrumGameView;
  let wordInputForm1
  let wordInputForm2
  let inputDiv;
  // const startButton = document.querySelector('#start-button');
  // startButton.addEventListener('click', function() {

  const button = document.querySelector('#start-button');
  button.addEventListener('click', function(event) {

      if (rounds[round] === "L") {

        console.log('round loop');

        letters.letters = [];

        const selection = letters.getRandomLetters();
        words.selection = selection.join('');
        words.round = round;

        words.bindEvents();
        const gameContainer = document.querySelector('#game-container');
        gameContainer.innerHTML = '';


        //Generate the letters game view
        lettersGameView = new LettersGameView(gameContainer, selection,round);
        lettersGameView.setupEventListener();

      } else if (rounds[round] === "N") {

        console.log('maths round');
        numbers.selection = [];
        numbers.getRandomNumbers();
        const selection = numbers.selection;
        const target = numbers.target;
        numbers.bindEvents();
        const gameContainer = document.querySelector('#game-container');
        gameContainer.innerHTML = '';

        numbersGameView = new NumbersGameView(gameContainer, selection, target, round);
        numbersGameView.setupEventListener();
      }

      else if (rounds[round] === "C") {
        //Code for calling End Game View
        words.getConundrum();
        words.bindConundrumEvents();
        const jumble = words.jumble;
        const answer = words.answer;
        console.log(jumble);

        const gameContainer = document.querySelector('#game-container');
        gameContainer.innerHTML = '';

        conundrumGameView = new ConundrumGameView(gameContainer, jumble, answer);
        conundrumGameView.setupEventListener();
      }

      else {
        //Code for calling End Game View
      }
      round +=1;

    });
  };

module.exports = Game;
