console.log("Up and running!");


var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

var cardsInPlay = [];

var flipCard = function ()
	{
		var cardID = this.getAttribute('data-id');
		console.log("User flipped " + cards[cardID].rank);
		console.log(cards[cardID].cardImage);
		console.log(cards[cardID].rank);

		cardsInPlay.push(cards[cardID].rank);

		this.setAttribute('src',cards[cardID].cardImage);
		this.className = 'flippedCard';

		setTimeout(function(){
    	checkForMatch();
		},500);
	}

var checkForMatch = function()
	{

		if (cardsInPlay.length === 2)
		{
			if (cardsInPlay[0] === cardsInPlay[1])
			{
				markMatchedCards();
				alert("You found a match!");
			}
			else
			{
				resetFlippedCards();
				alert("Sorry, try again");
			}
		}
	}

var resetBoard = function(){
	// get all cards and flip them back over
	var cards = document.getElementById('game-board').children;

	for (var i = 0; i < cards.length; i++)
	{
		cards[i].setAttribute('src','images/back.png');
	}

	//clear cards in play array
	cardsInPlay.length = 0;
}

var resetFlippedCards = function(){
	// get all flipped cards and flip them back over
	var cards = document.querySelectorAll('.flippedCard');

	for (var i = 0; i < cards.length; i++)
	{
		cards[i].setAttribute('src','images/back.png');
		cards[i].className = 'unmatchedCard';
	}

	//clear cards in play array
	cardsInPlay.length = 0;
}

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

var createBoard = function(){
	for (var i = 0; i < cards.length; i++)
	{
		var cardElement = document.createElement('img');

		cardElement.setAttribute('src','images/back.png');
		cardElement.setAttribute('data-id',i);
		cardElement.className = 'unmatchedCard';
		cardElement.addEventListener('click', flipCard);

		document.getElementById('game-board').appendChild(cardElement);
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

//create the game board
createBoard();

//register event listener for reset button.
document.getElementById('resetGameButton').addEventListener('click',resetBoard);