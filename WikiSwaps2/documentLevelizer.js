/*
	Document Level-izer

	Takes in a wikipage identifier, outputs a level object.
*/


/*

	Document Processing:
	1. Break the document into atoms
	2. Identify all concept words, and all their locations

*/


/*
	Level object has rounds / atoms which have 
*/


//Main's Parameters

let documentRef = chemistry;
let documentText = null;
let documentHTML = null;

//Runtime

let setenceList = [];
let conceptWords = [];

function analyzeDocument(document){
	getSetenceTokens(documentText, documentHTML);
	getConceptWords(documentHTML);
}

function getSetenceTokens(text, html){
	//Breaks the text into an array of setences
	//Populates sentenceList with this
}

function getConceptWords(html){
	//Identifies words that occur in hyperlinks
	//Populates conceptWords with this
}

function getConcepts(html) {
    const concepts = [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
        if (link.textContent && !concepts.includes(link.textContent)) {
            concepts.push(link.textContent.trim());
        }
    });
    return concepts;
}


function getConceptsFromHyperlinks(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const links = tempDiv.querySelectorAll('a');
    const concepts = new Set();

    links.forEach(link => {
        const text = link.textContent.trim();
        concepts.add(text);
    });

    return Array.from(concepts);
}

function getOccurrencesOfConcepts(text, concepts) {
    const occurrences = [];
    concepts.forEach(concept => {
        const regex = new RegExp(`\\b${concept}\\b`, 'g'); // Ensures whole word matching
        let match;
        while ((match = regex.exec(text)) !== null) {
            occurrences.push({
                text: match[0],
                index: match.index
            });
        }
    });

    return occurrences;
}

function createTextBlocks(text, occurrences) {
    let lastIndex = 0;
    const blocks = [];
    const sortedOccurrences = occurrences.sort((a, b) => a.index - b.index);
    const exclusionList = [
    	", ", 
    	", and",
    	" or ",
    	"- ",
    	"\n",
    	"\n-",
    	"\n*"
    	];

    sortedOccurrences.forEach((occurrence, index) => {

    	if (occurence.index > lastIndex) {

	    	const substringBetween = text.substring(lastIndex, occurrence.index).trim();

		    if (!exclusionList.includes(substringBetween)){

				// Text before the concept
		        blocks.push({ text: text.substring(lastIndex, occurrence.index), type: 0 });

		        // The concept itself
		        blocks.push({ text: occurrence.text, type: 1 });
		        lastIndex = occurrence.index + occurrence.text.length;
	    	}
	    }

    	

    });

    // Remaining text after the last concept
    if (lastIndex < text.length) {
        blocks.push({ text: text.substring(lastIndex), type: 0 });
    }

    return blocks;
}

function shuffleConcepts(blocks) {
    const conceptBlocks = blocks.filter(block => block.type === 1);
    const nonConceptBlocks = blocks.filter(block => block.type === 0);

    // Shuffle concept blocks
    for (let i = conceptBlocks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [conceptBlocks[i], conceptBlocks[j]] = [conceptBlocks[j], conceptBlocks[i]];
    }

    // Reassemble the blocks with shuffled concepts
    const shuffledBlocks = [...nonConceptBlocks, ...conceptBlocks].sort((a, b) => a.index - b.index);
    return shuffledBlocks;
}

function replaceAndMarkDifferences(originalBlocks, shuffledBlocks) {
    return originalBlocks.map((block, index) => {
        if (block.type === 1 && block.text !== shuffledBlocks[index].text) {
            return { ...shuffledBlocks[index], changed: true };
        }
        return shuffledBlocks[index];
    });
}

const htmlContent = document.getElementById('ele').innerHTML;


const concepts = getConcepts(documentHTML);
const occurances = getOccurrences(documentText, concepts);
const blocks = createTextBlocks(documentText, occurrences);
const shuffledBlocks = shuffleConcepts(blocks);
const finalBlocks = replaceAndMarkDifferences(blocks, shuffledBlocks);




