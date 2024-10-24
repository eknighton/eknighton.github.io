/*function getConcepts(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const links = tempDiv.querySelectorAll('a');
    const concepts = new Set();

    links.forEach(link => {
        const text = link.textContent.trim();
        concepts.add(text);
    });

    return Array.from(concepts);
}*/

function getConcepts(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const links = doc.querySelectorAll('a');
    const concepts = new Set();

    links.forEach(link => {
        const text = link.textContent.trim();
        if (text) concepts.add(text);
    });
    console.log(Array.from(concepts));


    return Array.from(concepts);
}

function getFilteredConcepts(html) {
    let allConcepts = getConcepts(html);
    const containsEnglishLetter = /^(?=.*[a-zA-Z])/;
    let filteredConcepts = allConcepts.filter(concept => concept.length >= 2 && concept.length <= 16 && containsEnglishLetter.test(concept));

    return filteredConcepts;
}
