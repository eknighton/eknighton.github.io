//startLoadGame()
var games = []
var titles = []

function startLoadGame(){
	console.open()
	startAddTitles(function(){
		return startTryTitle(finishLoadGame,generateBlank)
	});
}
function finishLoadGame(data){

	console.log('finishedLoadingGame')
	games[games.length] = data

	//CHECK IF GAMES CONTAINS 

	var game = games.shift() //Removes first element and returns it

	data = game.coreData
	document.getElementById("spank").innerHTML = data[0];
	document.getElementById("spank").name = data[1]
	console.log("Correct answer is: " + data[1])
	setGuidanceText("Answer the question.")

		if (games.length < 3) {
			startLoadGame()
		}
}

function startAddTitles(call) { //Sends request for 10 titles to Wikipedia API

	var url = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=random&grnnamespace=0&prop=revisions%7Cimages&rvprop=title&grnlimit=10"

	var xhr = new XMLHttpRequest();
	xhr.open('GET',url,true)
	xhr.onload = function() {
		return finishAddTitles(JSON.parse(this.response), call);
	}
	xhr.send()
	
}
function finishAddTitles(data, call) {
	console.log("finishingAddTitles")
	var title
	for (var key in data.query.pages) {
			title = data.query.pages[key].title
			title = new String(title)
			title = new String(title.replaceAll(' ','_'))
			titles[titles.length] = title
	}
	return call()
}


function startTryTitle(call, test) { //Tries title 1, removing it in the 

	if (titles.length < 1) {
		return startAddTitles(startTryTitle(call, test))
	}
	//Grabs title, removing it from cache
	var title = titles[titles.length-1]
	titles.length = titles.length-1

	var charsToGet = 1200;
	var exLimit = "max";
	var urlBase = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&formatversion=2&excharacters="
		+ charsToGet.toString()
		+ "&exlimit="
		+ exLimit.toString()
		+ "&explaintext=1&titles="
	var url = urlBase + title

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function() {
		return finishTryTitle(call, JSON.parse(this.response), test);
	}
	xhr.send();
}
function finishTryTitle(call, data, test) {
		console.log("finishingTryTitle")
		var content = data.query.pages[0].extract;
		content = parse(content)
		results = test(content)
		if (results.pass){
			return call(results)
		}else {
			return startTryTitle(call, test)
		}
}


function gptParse(content) {



}

function parse(content) {



	//Gets Spaced

	text = new String(content)
	// Not Internet Explorer compatible
	text = new String(text.replaceAll('\n', ' <p></p> ')) 
	// End incompatible segment
	var spaced = text.split(" ")

	console.log("Printing Text: ")

	//Gets Ends

	var ends = []
	for (var i = 0; i < spaced.length; i++) {
		item = spaced[i]
		if (item.charAt(item.length-1) == "."){
			if (item.length > 3 || item.charAt(0) == item.charAt(0).toLowerCase() ){
				ends[ends.length] = i
			}
		}
	}

	//Gets Blanks

	var blanks = []
	var item = ""
	for (var k = 0; k < spaced.length; k++) {
		item = spaced[k]
		if (item.length > 3) {

			if (item.charAt(0) == item.charAt(0).toLowerCase()){

				var flag = true
				for (var i = 0; i < item.length; i++){
					if (item.charAt(i).toLowerCase() == item.charAt(i).toUpperCase()){
							flag = false
					}
				}
				if (flag){
						blanks[blanks.length] = k
				}
			}
		}
	}

	return [spaced,ends,blanks]
}

function generateBlank(data) {
	var spaced = data[0]
	var ends = data[1]
	var blanks = data[2]

	var que 
	var ans

	//return {pass: true}
	return {pass: true, input: data, question: que, answer: ans}
}

function finishGettingPage() {
	
}