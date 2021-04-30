

//Highlighting Events

function highlight(id){
	document.getElementById(id).style.backgroundColor = "pink";
}

function dehighlight(id){
	document.getElementById(id).style.backgroundColor = "coral"
}

//API accesss

function requestQRNG(call){
	var url = "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8"
	var xhr = new XMLHttpRequest();
	xhr.open('GET',url,true)
	xhr.onload = function() {
		return receiveQRNG(JSON.parse(this.response), call)
	}
	xhr.send()
}
function receiveQRNG(jparsed, call){
	QRNGnum = jparsed.data
	return call(QRNGnum)
}

//Update the content with API results

function updateCoinFlip(QRNGnum){
	var coin = "Error, invalid QRNG result."
	if (QRNGnum >= 128) {
		coin = "Heads"
	} else {
		coin = "Tails"
	}
	document.getElementById("QCFlipResult").innerHTML = coin
}

function updateNumber(QRNGnum){
	document.getElementById("QRNGnumberResult").innerHTML = QRNGnum;
}

//Interaction Events

async function onClickNumber(){
	document.getElementById("QRNGnumberResult").innerHTML = "Rolling!"
	setTimeout(requestQRNG(updateNumber),500);
}

async function onClickCoinFlip(){
	document.getElementById("QCFlipResult").innerHTML = "Flipping!"
	setTimeout(requestQRNG(updateCoinFlip),500);
}


//On load




