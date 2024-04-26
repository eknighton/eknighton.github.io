

/*	
	Set term.
	Search for term.
*/


function searchWiki(term) {

    var params = {
        action: "query",
        list: "search",
        srwhat: "text",
        srsearch: term,

        srprop: "snippet",
        srsort: "incoming_links_asc", //"random",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    console.log(url);

    fetch(url)
        .then(callback(response))
        .catch(function(error){console.log(error);});
}