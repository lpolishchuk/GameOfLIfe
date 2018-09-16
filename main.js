


let mainContainer = document.getElementById("mainContainer");
let row = 30, boxes = 30, gameOff = true;
let boxHistory = [], paintedBoxNumber = 5, maxPaintedBoxNumber = 5;

let changeColor = function (rowNumber, boxNumber) {
	let choosenBox = document.getElementById(`row${rowNumber}box${boxNumber}`);
	if ( //paint from light box into dark
		gameOff &&
		paintedBoxNumber > 0 &&
		boxHistory[rowNumber][boxNumber].currentState === false
		) {
		paintedBoxNumber -= 1;
		choosenBox.setAttribute("class", "paintedBox");
		boxHistory[rowNumber][boxNumber].currentState = true;
	}
	else if ( // pain dark box into light
		gameOff && 
		boxHistory[rowNumber][boxNumber].currentState === true &&
		paintedBoxNumber < maxPaintedBoxNumber
	) {
		paintedBoxNumber += 1;
		choosenBox.setAttribute("class", "emptyBox");
		boxHistory[rowNumber][boxNumber].currentState = false;
	}
	renderBoxCounter();
}
gameStart = function() {
	gameOff = false;
	console.log('start')
}

gameClear = function() {
	gameOff = true;
	for (var index = 0; index < row; index++) {
		for (var i = 0; i < boxes; i++) {
			boxHistory[index][i].currentState = false;
			boxHistory[index][i].previousState = false;
			paintedBoxNumber = maxPaintedBoxNumber;
			renderBoxCounter();
			document.getElementById(`row${index}box${i}`).setAttribute("class", "emptyBox");
		}
	}
}

gameEnd = function(){
	console.log('end');

}

 renderBoxCounter = function () {
 	document.getElementById("boxCounter").innerHTML = `Painted box number which you can use: ${paintedBoxNumber}`;
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
			boxHistory[index].push([i])
			boxHistory[index][i].currentState = false;
			boxHistory[index][i].previousState = false;
		}
	}
	renderBoxCounter();
}

BoxConstructor(row, boxes);
