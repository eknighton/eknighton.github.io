
//trimSnippet() helps avoid hints that start mid-sentence.
function trimSnippet(snippet) {
	if (snippet.at(0).toUpperCase == snippet.at(0)) {
		return snippet;
	} else if (snippet.at(0) == " ") {
		console.log ("edge case: starts with space")
		return snippet;
	} else {
		var temp = snippet.indexOf(". ")
		if (temp >= 0) {
			return snippet.substring(temp+2,snippet.length);
		} else {
			return "";
		}
	}
}
/*
	Generates a Wikipedia API call from the params object, then feeds it into the callback function.
*/	
function callWikiAPI(params, callback) {

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    console.log(url);

    fetch(url)
        .then(callback(response))
        .catch(function(error){console.log(error);});
}

/*
	A crude way to do Search API calls.
	> Check wikipedia API reference for full list of possible parameters and their values.
*/
function searchWikipedia(term, callback) {

    var params = {
        action: "query",
        list: "search",
        srsearch: term,
        srprop: "snippet",
        srsort: "random",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    console.log(url);

    fetch(url)
        .then(callback(response))
        .catch(function(error){console.log(error);});
}