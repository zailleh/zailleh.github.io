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

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(ms) {
  //console.log('Taking a break...');
  await wait(ms);
  //console.log('Two second later');
}


var flipCard = function ()
	{
		var cardID = this.getAttribute('data-id');
		console.log("User flipped " + cards[cardID].rank);
		console.log(cards[cardID].cardImage);
		console.log(cards[cardID].rank);

		cardsInPlay.push(cards[cardID].rank);

		this.style.width = '0px';

		//get margin values for new margin
		var marginHz = 12 + (175/2) + 'px';

		this.style.marginLeft = marginHz;
		this.style.marginRight = marginHz;

		console.log("Total Width: " + getTotalEleWidth(this));
		
		console.log("Sides Margin: " + marginHz);

		console.log('flipping card - 0px');
		
		setTimeout(function(element){
    	element.setAttribute('src',cards[cardID].cardImage);
	  	element.removeAttribute('style');
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

var checkForMatch = function()
	{

		if (cardsInPlay.length === 2)
		{
			if (cardsInPlay[0] === cardsInPlay[1])
			{
				markMatchedCards();
				asyncAlert("You found a match!");
			}
			else
			{
				resetFlippedCards();
				asyncAlert("Sorry, try again");
			}
		}
	}

var getTotalEleWidth = function(element)
{
	var computedStyle = window.getComputedStyle(element,null)

	var marginLeft = Number(computedStyle.getPropertyValue("margin-left").match(/\d+/));
	var marginRight = Number(computedStyle.getPropertyValue("margin-left").match(/\d+/));
	var blockWidth = Number(computedStyle.getPropertyValue("width").match(/\d+/));

	return (marginLeft + marginRight + blockWidth);
}

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
    	element.setAttribute('src','images/back.png');
	  	element.removeAttribute('style');
	  	element.className = 'unmatchedCard';
	  	
		},350,cards[i]);

		
	}

	//clear cards in play array
	cardsInPlay.length = 0;
		
}

var resetBoard = function()
{
	// get all cards and flip them back over
	var cards = document.getElementById('game-board').children;

	resetCards(cards);
}

var resetFlippedCards = function()
{
	// get all flipped cards and flip them back over
	var cards = document.querySelectorAll('.flippedCard');

	resetCards(cards);

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

