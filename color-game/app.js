

// GLOBAL VARIABLES 
let numSquares = 6;  // a variable that keeps track of numbers that we're on
let colors = []; 
let pickedColor;  // this will be a variable with no value 

// SELECTORS 
let squares = document.querySelectorAll('.square'); 
let pickedHTML = document.querySelector('.picked-color')
let messageDisplay = document.querySelector(".status"); 
let title = document.querySelector('h1')
const resetButton = document.querySelector('#reset'); 
let modeButtons = document.querySelectorAll('.mode');

init(); 

/***** INIT FUNCTION ******/ 

function init() {
	setupModeButtons(); //mode buttons event listener function  
	setupSquares(); 	// set-up of square listeners 
	reset() // then we want to set the screen, which means, running our reset function. 
}

/***** BUTTONS/SQUARES FUNCTION ******/  

function setupModeButtons() {
	modeButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected'); 
			// this, the button that was clicked on 
			this.textContent === 'Easy' ? numSquares = 3: numSquares = 6; 
	
			if(this.textContent === 'Easy') { 
				numSquares = 2; 
			} else {
				numSquares = 6;
			}
			reset()
		});
	});
}


function setupSquares() {
	for (let i = 0; i < squares.length; i++) {
		squares[i].addEventListener('click', function() {
				// grab color of clicked square, this referes to the item that was clicked on, which is the square, it's like saying squares[i].style.background, we save it in a variable
				let clickedColor = this.style.backgroundColor; 
				if(clickedColor === pickedColor) {
					messageDisplay.textContent = "correct!"; 
					resetButton.textContent = 'Play again?';  
					changeColors(pickedColor); 
					title.style.backgroundColor = pickedColor; 
				} else {
					this.style.backgroundColor = "#232323"
					messageDisplay.textContent = "Try again!"; 
				}
		});
	} 
}

/***** RESET FUNCTION ******/
function reset() {
	// generate all new colors, use the same variables again 
	colors = generateColors(numSquares);
	// pick a new random color from array 
	pickedColor = pickColor();  
	messageDisplay.textContent = ''; 
	resetButton.textContent = 'New Colors'; //this is the resetButton
	// change colorDisplay to match picked color  
	pickedHTML.textContent = pickedColor; 
	//change colors of squares
	for (let i = 0; i < squares.length; i++) {
		// if there is a color (so 3 or 6 for example)
		// then we need to assign that color to that square
		// if there's not more than 3 colors (for example), then, hide the squares
		if(colors[i]) {
			squares[i].style.display = 'block'; // to make sure that all 6 are visible first
			squares[i].style.backgroundColor = colors[i];
		} else { 
			squares[i].style.display = 'none'; 
		}
	title.style.backgroundColor = "steelblue"; 
	}
}

resetButton.addEventListener('click', function() {
	init();  
}); 

/***** OTHER FUNCTIONS ******/

function changeColors(color) {
	squares.forEach((square) => 
	square.style.backgroundColor = color)
}

// pick a random number 
function pickColor() {
	//this will give a random number between 0 and 5, which will be the index 
	let random = Math.floor(Math.random() * colors.length)
	return colors[random]; // we will use that variable random to access an element from the colors array at that index 
}

function generateColors(num) {
	let colorArr = []
	// repeat num times 
	for(var i = 0; i <= num; i++) {
		// get random color and push into arr
		var color = randomColor(colorArr[i])
		colorArr.push(color); 
	}
	return colorArr
}

function randomColor() {
	let red = Math.floor(Math.random() * 256);
	let green = Math.floor(Math.random() * 256);
	let blue = Math.floor(Math.random() * 256);
	return `rgb(${red}, ${green}, ${blue})` 
}

