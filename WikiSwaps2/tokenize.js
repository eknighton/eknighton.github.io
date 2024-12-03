function tokenize(text) {
    const sentences = splitIntoSentences(text);
    const twoSentenceBlocks = groupSentencesIntoBlocks(sentences);
    return twoSentenceBlocks;
}

function splitIntoSentences(text) {
    // Regular expression that splits the text at each period, question mark, or exclamation mark followed by a space or end of text.
    const sentenceRegex = /(?<!\b(?:Mr|Mrs|Ms|Dr|Jr|Sr|vs)\.)(?<!\b\w\.\w\.)(?<=[.?!])\s+(?=[A-Z])/;
    return text.split(sentenceRegex);
}

function groupSentencesIntoBlocks(sentences) {
    const blocks = [];
    for (let i = 0; i < sentences.length; i += 2) {
        // Combine two sentences or include the last single sentence if it's the last one without a pair.
        const block = sentences[i] + (sentences[i + 1] ? ' ' + sentences[i + 1] : '');
        blocks.push(block);
    }
    return blocks;
}


/**
 * Trims text after specified section headers.
 * @param {string} text - The Wikipedia page text to process.
 * @param {string[]} sectionsToCut - Section titles to stop at (e.g., "See Also", "References").
 * @returns {string} The trimmed text.
 */

function trimAfterSections(text, sectionsToCut) {
    const sectionPattern = sectionsToCut
        .map(section => `==\\s*${section}\\s*==`) // Match "== Section Name =="
        .join('|');
    const regex = new RegExp(`(${sectionPattern})[\\s\\S]*`, 'i'); // Case insensitive, match everything after
    return text.replace(regex, '').trim();
}