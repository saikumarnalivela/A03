function takeValue(x) {
	document.getElementById('inputwindow').value += x;
	if(typeof x !== 'number'){
		throw error('The given value is not a number');
	}
}

function clearInput(y) {
	document.getElementById('inputwindow').value = y;
}

function calculateResult() {
	var result = eval(document.getElementById('inputwindow').value);
	document.getElementById('inputwindow').value = result;
}