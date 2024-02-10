/*
    search.js

    MediaWiki API Demos
    Demo of `Search` module: Search for a text or title

    MIT License
*/

var url = "https://en.wikipedia.org/w/api.php"; 

//Parameters
// term = the answer you wish the result to have
//

function makeSearch(term) {

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
        .then(function(response){return response.json();})
        .then(function(response) {

            // Processing of response goes here
            var text =  cleanSnippet(response.query.search[0].snippet);
            var replace = new RegExp(term,"ig");
            console.log("trimSnippet input: "+text);
            text = trimSnippet(text);
            console.log("trimSnippet output: "+text);
            var temp = text.replaceAll(replace,'___')
            console.log(replace);
            
            //Here we replace, then retry if the blank is not inserted.
            
            if (temp == text) {
                makeSearch(term)
            } else {
             document.getElementById("searchResult").innerHTML = document.getElementById("searchResult").innerHTML + "<br> <b>Hint:</b> " + temp+ "<br>"; 
            }
        })
        .catch(function(error){console.log(error);});

}

function cleanSnippet(snippet){
        console.log("Initial Snippet: " + snippet);
        var div = document.createElement("div");
        div.innerHTML = snippet;
        console.log("Text Content: " + div.textContent);
        return div.textContent || div.innerText || "";
}
//makeSearch("hat");



/*

Example Results (For debugging)

Cheese:
Barley Mow The Beehive Carlton Tavern, Kilburn The Champion The Cheshire ___ The Clachan Coach and Horses, Hill Street Coach and Horses, Soho Coal Hole

Humans:
Policy of China and Japan; Bilateral Interaction between Belarus-China; human rights issues in contemporary international relations. Prannik Tatiana Alexandrovna
*/