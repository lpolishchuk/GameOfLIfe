


let mainContainer = document.getElementById("mainContainer");
let row = 10, boxes = 10, gameOff = true;
let boxHistory = [], paintedBoxNumber = 16, maxPaintedBoxNumber = 16, theEndOfTheGame = false;

checkCurrentState = function(rowNumber, boxNumber) {
	return boxHistory[rowNumber][boxNumber] === undefined ? false :
		boxHistory[rowNumber][boxNumber].currentState === true;
}

setCurrentState = (rowNumber, boxNumber, currentState, boxHistory) => {
	boxHistory[rowNumber][boxNumber].currentState = currentState;
}

neighborLifeStateCounter = function (rowNumber, boxNumber) {
	let paintedBoxesCounter = 0;
	if( //top-left angle
		rowNumber !== 0 && 
		boxNumber != 0 && 
		checkCurrentState(rowNumber - 1, boxNumber - 1)) paintedBoxesCounter += 1;
	if( //top-right angle
		rowNumber !== 0 && 
		boxNumber != boxes - 1 && 
		checkCurrentState(rowNumber - 1, boxNumber + 1)) paintedBoxesCounter += 1;
	if( //bottom-right angle
		boxNumber != boxes - 1 && 
		rowNumber != row - 1 && 
		checkCurrentState(rowNumber + 1, boxNumber + 1)) paintedBoxesCounter += 1;
	if( //bottom-left angle
		rowNumber != row - 1 && 
		boxNumber != 0 && 
		checkCurrentState(rowNumber + 1, boxNumber - 1)) paintedBoxesCounter += 1;
	if( rowNumber !== 0 && checkCurrentState(rowNumber - 1, boxNumber)) paintedBoxesCounter += 1;
	if (boxNumber != boxes - 1 && checkCurrentState(rowNumber, boxNumber + 1)) paintedBoxesCounter += 1;
	if(rowNumber != row - 1 && checkCurrentState(rowNumber + 1, boxNumber)) paintedBoxesCounter += 1;
	if(boxNumber != 0 && checkCurrentState(rowNumber, boxNumber - 1)) paintedBoxesCounter += 1;
	return paintedBoxesCounter;
}

setBoxColor = (rowNumber, boxNumber, currentState) => {
	element = document.getElementById(`row${rowNumber}box${boxNumber}`);
	currentState ? element.setAttribute("class", "paintedBox") : element.setAttribute("class", "emptyBox");
}


 renderBoxCounter = function () {
 	document.getElementById("boxCounter").innerHTML = `Painted box number which you can use: ${paintedBoxNumber}`;
 } 


changeColor = function (rowNumber, boxNumber) {
	let choosenBox = document.getElementById(`row${rowNumber}box${boxNumber}`);
	if ( //redraw from light box into dark
		gameOff &&
		paintedBoxNumber > 0 &&
		!checkCurrentState(rowNumber, boxNumber)
		) {
		paintedBoxNumber -= 1;
		choosenBox.setAttribute("class", "paintedBox");
		setCurrentState(rowNumber, boxNumber, true, boxHistory);
	}
	else if ( // redraw dark box into light
		gameOff && 
		checkCurrentState(rowNumber, boxNumber) &&
		paintedBoxNumber < maxPaintedBoxNumber
	) {
		paintedBoxNumber += 1;
		choosenBox.setAttribute("class", "emptyBox");
		setCurrentState(rowNumber, boxNumber, false, boxHistory);
	}
	renderBoxCounter();
}
 
 const gameMethods = {
 	gameEnd: function(setInterval){
		console.log('end');
		clearInterval(setInterval);
	},
	gameStart: function () {
		setInterval(function() {
			gameOff = false;
			console.log('old old history in the house', boxHistory);
			let newHistory = [...boxHistory];
			let paintedAdjacentBoxes = 0;
			for (var index = 0; index < row; index++) {
				for (var i = 0; i < boxes; i++) {
					if( !checkCurrentState(index, i) && neighborLifeStateCounter(index, i) == 3) {
						setCurrentState(index, i, true, newHistory);
						setBoxColor(index, i, true);

					} else if ( checkCurrentState(index, i) &&
						neighborLifeStateCounter(index, i) == 3 ||
						neighborLifeStateCounter(index, i) == 2 ) {
						setCurrentState(index, i, false, newHistory);
						setBoxColor(index, i, false);

					}
				}
			}
			console.log('newHistory', newHistory);
			console.log('old', boxHistory);
			boxHistory = newHistory;
		}, 10000);
	}
}


gameClear = function() {
	clearInterval(gameStart.setInterval());
	gameOff = true;
	for (var index = 0; index < row; index++) {
		for (var i = 0; i < boxes; i++) {
			setCurrentState(index, i, false, boxHistory);
			boxHistory[index][i].previousState = false;
			paintedBoxNumber = maxPaintedBoxNumber;
			renderBoxCounter();
			document.getElementById(`row${index}box${i}`).setAttribute("class", "emptyBox");
		}
	}
}

BoxConstructor = function (x, y) {
	for (var index = 0; index < y; index++) { //row append
		let rowElement = document.createElement("div");
		rowElement.setAttribute("class", "rowElement");
		rowElement.setAttribute("id", `rowElement${index}`);
		mainContainer.appendChild(rowElement);
		boxHistory.push([index]);
		for (var i = 0; i < x; i++) { //box append
			let box = document.createElement("div");
			box.setAttribute("class", "emptyBox");
			box.setAttribute("id", `row${index}box${i}`);
			let rowNumber = index, boxNumber = i;
			box.onclick = function () {
				changeColor(rowNumber, boxNumber);
			};
			rowElement = document.getElementById(`rowElement${index}`);
			rowElement.appendChild(box);
			boxHistory[index][i] = { currentState: false };
		}
	}
	renderBoxCounter();
}

BoxConstructor(row, boxes);
