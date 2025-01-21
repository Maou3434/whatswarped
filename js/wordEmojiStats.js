const stopWords = new Set([
    "the", "and", "a", "in", "on", "at", "of", "to", "for", "by", "with", "about", "as", "from", "into", "up", "down",
    "out", "over", "under", "between", "through", "during", "before", "after", "above", "below", "around", "across",
    "along", "following", "behind", "beside", "near", "underneath", "without", "within", "among", "but", "if", "or",
    "because", "while", "so", "although", "even", "though", "until", "unless", "such", "that", "which", "who", "whom",
    "whose", "this", "these", "those", "is", "am", "are", "was", "were", "be", "been", "being", "have", "has", "had", 
    "having", "do", "does", "did", "doing", "i", "you", "he", "she", "it", "we", "they", "u", "ur", "y", "yo", "im", "id",
    "ive", "dont", "cant", "wanna", "gonna", "gotta", "jus", "lol", "lmao", "brb", "btw", "omg", "fyi", "smh", "nor", 
    "either", "than"
]);

function trackWordFrequency(message, wordFrequency) {
    message.split(/\s+/).forEach((word) => {
        const cleanedWord = cleanWord(word);
        if (isValidWord(cleanedWord)) {
            wordFrequency[cleanedWord] = (wordFrequency[cleanedWord] || 0) + 1;
        }
    });
}

function cleanWord(word) {
    return word.replace(/[^\w\s]/g, "").toLowerCase();
}

function isValidWord(word) {
    return word && !stopWords.has(word);
}

function trackPhraseFrequency(message, phraseFrequency) {
    const words = message.split(/\s+/).map(cleanWord);
    for (let i = 0; i < words.length - 1; i++) {
        if (isValidWord(words[i]) && isValidWord(words[i + 1])) {
            const phrase = `${words[i]} ${words[i + 1]}`;
            phraseFrequency[phrase] = (phraseFrequency[phrase] || 0) + 1;
        }
        if (i < words.length - 2 && isValidWord(words[i + 2])) {
            const threeWordPhrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
            phraseFrequency[threeWordPhrase] = (phraseFrequency[threeWordPhrase] || 0) + 1;
        }
    }
}

function displayWordEmojiStats(results) {
    console.log(results);
}
