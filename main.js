


let mainContainer = document.getElementById("mainContainer");
console.log(mainContainer);

let boxHistory = [];


BoxConstructor(30,30);
console.log(mainContainer);


let changeColor = function (rowNumber, boxNumber) {
	console.log(rowNumber, boxNumber);
}

let BoxConstructor = function (x, y) {

	for (var index = 1; index <= y; index++) {
		let rowElement = document.createElement("div");
		rowElement.setAttribute("class", "rowElement");
		rowElement.setAttribute("id", `rowElement${index}`);
		mainContainer.appendChild(rowElement);

		// boxHistory.push([index]);
		//rows append
		for (var i = 1; i <= x; i++) {
			let box = document.createElement("div");
			box.setAttribute("class", "emptyBox");
			box.setAttribute("id", `box${i}`);
			let rowNumber = index, boxNumber = i;
			box.onclick = function () {
				changeColor(rowNumber, boxNumber);
			};
			rowElement = document.getElementById(`rowElement${index}`);
			rowElement.appendChild(box);
			// boxHistory[index-1][index].push(i);
			//box append
		}
	}
}

