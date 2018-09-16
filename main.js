


let mainContainer = document.getElementById("mainContainer");
console.log(mainContainer);

let boxHistory = [];

let changeColor = function (rowNumber, boxNumber) {
	console.log(rowNumber, boxNumber);
	let choosenBox = document.getElementById(`row${rowNumber}box${boxNumber}`);
	choosenBox.setAttribute("class", "paintedBox");
}

BoxConstructor = function (x, y) {

	for (var index = 0; index < y; index++) {
		let rowElement = document.createElement("div");
		rowElement.setAttribute("class", "rowElement");
		rowElement.setAttribute("id", `rowElement${index}`);
		mainContainer.appendChild(rowElement);
		boxHistory.push([index]);

		// boxHistory.push([index]);
		//rows append
		for (var i = 0; i < x; i++) {
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
			boxHistory[index][i].currentstate = false;
			boxHistory[index][i].previousState = false;
			// boxHistory[index-1][index].push(i);
			//box append
		}
	}
}


BoxConstructor(30,30);
// console.log(mainContainer);

// console.log(boxHistory);

