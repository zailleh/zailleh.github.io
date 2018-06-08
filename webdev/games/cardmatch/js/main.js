// Define Functions //////////////////////////////////////////////////

// Creates the deck to be used for the game containing all cards required for matching.
var createDeck = function()
{
	deck = [];
	var suits = ['Spade','Heart','Diamond','Club'];
	var ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

	console.log("creating deck. difficulty is: " + difficulty + " - total cards: " + (4*(Math.round(ranks.length / difficulty))));
	
	for (var i = 0; i < suits.length; i++)
		for (var j = 0; j < Math.round(ranks.length / difficulty); j++)
			deck.push({
				rank: ranks[j],
				cardImageRow: i, //suit starting at Ace
				cardImageColumn: j, //rank
			});

	console.log(deck.length + ' cards created');
}


// Shuffle the deck, which is created in order
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// wait function
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// sleep function
async function sleep(ms) {
  //console.log('Taking a break...');
  await wait(ms);
  //console.log('Two second later');
}

// flips cards over to show their rank and suit when clicked
var flipCard = function ()
	{
		var cardID = this.getAttribute('data-id');
		console.log("User flipped " + deck[cardID].rank);
		console.log(deck[cardID].rank);

		cardsInPlay.push(deck[cardID].rank);

		this.style.width = '0px';

		//get margin values for new margin
		var marginHz = 12 + (175/2) + 'px';

		this.style.marginLeft = marginHz;
		this.style.marginRight = marginHz;

		//console.log("Total Width: " + getTotalEleWidth(this));
		
		console.log("Sides Margin: " + marginHz);

		console.log('flipping card - 0px');
		
		setTimeout(function(element){
	  	element.setAttribute('style','--row: ' + deck[cardID].cardImageRow + '; --col: ' + deck[cardID].cardImageColumn + ';')
	  	console.log('flipping card - 175px');
		},350,this);

		
		this.className = 'flippedCard';
		this.removeEventListener('click', flipCard);

		setTimeout(function(){
    	checkForMatch();
		},700);
	}

var asyncAlert = async function(msg)
{
	alert(msg);
}

// checks flipped cards for match
var checkForMatch = function()
	{
		if (cardsInPlay.length === 2)
		{

			var popUp = document.getElementById('popup');
			var popMsg = document.createElement('span');

			if (cardsInPlay[0] === cardsInPlay[1])
			{
				markMatchedCards();
				
				popMsg.className = "match"
				popMsg.innerText = "Match!"
			}
			else
			{
				resetFlippedCards();
				
				popMsg.className = "nomatch"
				popMsg.innerText = "No Match!"
			}

			while (popUp.firstChild !== null) {
				popUp.removeChild(popUp.firstChild);
			}

			popUp.appendChild(popMsg);
			popUp.style.opacity = '1'

			setTimeout(function(element){
				element.style.opacity = '0';

			},3000,popUp);

			setTimeout(function(element,child){
				element.removeChild(popMsg);
			},3350,popUp,popMsg);

		}
	}

// troubleshooting function
/*
var getTotalEleWidth = function(element)
{
	var computedStyle = window.getComputedStyle(element,null)

	var marginLeft = Number(computedStyle.getPropertyValue("margin-left").match(/\d+/));
	var marginRight = Number(computedStyle.getPropertyValue("margin-left").match(/\d+/));
	var blockWidth = Number(computedStyle.getPropertyValue("width").match(/\d+/));

	return (marginLeft + marginRight + blockWidth);
} */

// common function used to flip cards to show their back and set them back to default visualisations
var resetCards = function(cards)
{

	for (var i = 0; i < cards.length; i++)
	{
		//set animation styles for unflipped cards
		cards[i].style.width = '0px';
		cards[i].style.marginLeft = 12 + (175/2) + 'px'
		cards[i].style.marginRight = 12 + (175/2) + 'px'
		
		cards[i].addEventListener('click', flipCard);

		setTimeout(function(element){
			//remove animation styles for unflipped cards.
	  	element.removeAttribute('style');
	  	element.className = 'unmatchedCard';
	  	
		},350+(i*350/4),cards[i]);

		
	}

	//clear cards in play array
	cardsInPlay.length = 0;
		
}


// resets the board at the current difficulty
var resetBoard = function()
{

	createBoard();
	shuffle(deck);

	var cards = document.getElementById('game-board').children;

	resetCards(cards);
}


// get all flipped cards and flip them back over
var resetFlippedCards = function()
{
	var cards = document.querySelectorAll('.flippedCard');

	resetCards(cards);

}


// marks matched cards as matched and removes the event listener
var markMatchedCards = function(){
	// get flipped cards and mark them matched
	var cards = document.querySelectorAll('.flippedCard');

	for (var i = 0; i < cards.length; i++)
	{
		cards[i].className = 'matchedCard';
	}

	//clear cards in play array
	cardsInPlay.length = 0;
}


// create the board of cards to match
var createBoard = function(){

	console.log('creating game board');

	var gameBoard = document.getElementById('game-board');

	// remove all children
	while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
	}

	for (var i = 0; i < deck.length; i++)
	{
		var cardElement = document.createElement('div');

		cardElement.setAttribute('data-id',i);
		cardElement.className = 'unmatchedCard';
		cardElement.addEventListener('click', flipCard);

		gameBoard.appendChild(cardElement);

	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function changeDifficulty() {
	difficulty = parseInt(document.getElementById("difficulty").options[document.getElementById("difficulty").selectedIndex].value);
	console.log('changing diffuclty to: ' + difficulty);
	createDeck();
	createBoard();
}


// Initialise global variables //////////////////////////
var deck = [];
var difficulty = parseInt(document.getElementById("difficulty").options[document.getElementById("difficulty").selectedIndex].value);
var cardsInPlay = [];

//register event listeners //////////////////////////////
//register event listener for reset buttons
document.getElementById('resetGameButtonTop').addEventListener('click',resetBoard);
document.getElementById('resetGameButtonBottom').addEventListener('click',resetBoard);

//register event listener for instructions toggle
document.getElementById('instructionsToggle').addEventListener('click',function(){
	var instructions = document.getElementById('instructionsContainer');

	if (instructions.style.height !== '0px')
	{
		instructions.style.height = '0px';
	}
	else
	{
		instructions.style.height = '125px';
	}
});

document.getElementById('difficulty').addEventListener('onChange',changeDifficulty);


// Begin execution //////////////////////////////////////
console.log("Up and running!");

// initialize the deck
createDeck(difficulty);

//create the game board
resetBoard();



