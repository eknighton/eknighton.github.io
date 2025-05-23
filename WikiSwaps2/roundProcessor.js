/*
	Round Processor

	Handles the html and text of a round
*/

function prepRound(text, concepts){

    let occurences = getOccurrencesOfConcepts(text, concepts);
    console.log(occurences);
    console.log("End of occurences");
    let blocks = createTextBlocks(text, occurences);
    console.log(blocks);
    console.log("end of blocks");
    let shuffledBlocks = shuffleConcepts(blocks);
    console.log(shuffledBlocks);
    console.log("end of shuffledblocks");
    let finalBlocks = replaceAndMarkDifferences(blocks, shuffledBlocks);
    console.log(finalBlocks);
    console.log("end of finalBlocks");
    let changes = finalBlocks.filter(block => block.changed).length
    return {start: finalBlocks, solution: blocks, changed: changes};
}

function processRound(text, html){

    let concepts = getFilteredConcepts(html);
    console.log(concepts);
    console.log("End of concepts");

    return prepRound(text, concepts);
}

function processRound(text, html, bonusConcepts){

    let concepts = getFilteredConcepts(html).concat(bonusConcepts);
    console.log(concepts);
    console.log("End of concepts");

    return prepRound(text, concepts);
}


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');  // Escapes regex special characters
}

function getOccurrencesOfConcepts(text, concepts) {
    console.log("Searchin text for concepts: " + text);
    const occurrences = [];
    concepts.forEach(concept => {

        const escapedConcept = escapeRegExp(concept);
        const regex = new RegExp(`(?<!\\w)${escapedConcept}(?!\\w)`, 'g'); // Ensures it behaves similarly to \b but for any characters
        //const regex = new RegExp(`\\b${concept}\\b`, 'g'); // Ensures whole word matching
        let match;
        while ((match = regex.exec(text)) !== null) {
            occurrences.push({
                text: match[0],
                index: match.index
            });
            console.log("getting occurences");
        }
    });

    return occurrences;
}

function createTextBlocks(text, occurrences) {
    let lastIndex = 0;
    const blocks = [];
    const sortedOccurrences = occurrences.sort((a, b) => a.index - b.index);

    sortedOccurrences.forEach((occurrence, index) => {
       
        console.log("Index: "+ occurrence.index)
        console.log("Last index: " + lastIndex);
        if (occurrence.index <= lastIndex && lastIndex != 0){
            // Skip It
        } else {
            // Text before the concept
            if (occurrence.index > lastIndex) {
                blocks.push({ text: text.substring(lastIndex, occurrence.index), concept: false });
            }
            // The concept itself
            blocks.push({ text: occurrence.text, concept: true });
            lastIndex = occurrence.index + occurrence.text.length;
        }
    });

    // Remaining text after the last concept
    if (lastIndex < text.length) {
        blocks.push({ text: text.substring(lastIndex), concept: false });
    }

    return blocks;
}

function shuffleConcepts(blocks) {
    // Collect indexes and texts of concept blocks 
    let conceptIndexes = [];
    let conceptBlocks = [];

    let output = [];

    blocks.forEach((block, index) => {
        if (block.concept) {
            conceptIndexes.push(index);
            conceptBlocks.push({...block});
        }
        output.push({...block});
    });

    // Shuffle the concept texts array
    for (let i = conceptBlocks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [conceptBlocks[i], conceptBlocks[j]] = [conceptBlocks[j], conceptBlocks[i]];
    }

    // Reassign the shuffled concept texts back to their original positions
    conceptIndexes.forEach((blockIndex, idx) => {
        output[blockIndex] = conceptBlocks[idx];
    });

    return output;
}


function replaceAndMarkDifferences(originalBlocks, shuffledBlocks) {
    return originalBlocks.map((block, index) => {
        if (block.concept && block.text !== shuffledBlocks[index].text) {
            return { ...shuffledBlocks[index], changed: true, discovered: false, corrected: false};
        }
        return { ...shuffledBlocks[index], changed: false, discovered: false, corrected: false};
    });
}


