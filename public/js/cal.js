function takeValue(x) {
	if(document.getElementById('inputwindow')) {
		document.getElementById('inputwindow').value += x;
	}
	
	if(typeof x!== 'number'){
		throw Error('The given value is not a number');
	}
}

function clearInput(y) {
	document.getElementById('inputwindow').value = y;
}


function calculateResult() {
	var result = eval(document.getElementById('inputwindow') ? document.getElementById('inputwindow').value : arguments[0]);
	if(document.getElementById('inputwindow')) {
		document.getElementById('inputwindow').value = result;
	}
	if(arguments[0] === null) {
		throw Error('The given argument is not a number')
	} 
	return arguments[0] * arguments[1]
}