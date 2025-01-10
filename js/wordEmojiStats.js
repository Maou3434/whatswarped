// wordEmojiStats.js

// Updated stop words list (including auxiliary verbs, conjunctions, pronouns, and slang)
const stopWords = [
    "the", "and", "a", "in", "on", "at", "of", "to", "for", "by", "with", "about", "as", "from", "into", "up", "down",
    "out", "over", "under", "between", "through", "during", "before", "after", "above", "below", "around", "across",
    "along", "following", "behind", "beside", "near", "underneath", "without", "within", "among", "but", "if", "or",
    "because", "while", "so", "although", "even", "though", "until", "unless", "such", "that", "which", "who", "whom",
    "whose", "this", "these", "those", "is", "am", "are", "was", "were", "be", "been", "being", "have", "has", "had", 
    "having", "do", "does", "did", "doing", "i", "you", "he", "she", "it", "we", "they", "u", "ur", "y", "yo", "im", "id",
    "ive", "dont", "cant", "wanna", "gonna", "gotta", "jus", "lol", "lmao", "brb", "btw", "omg", "fyi", "smh", "nor", 
    "either", "than"
];

// Function to track word frequency excluding stop words
function trackWordFrequency(message, wordFrequency) {
    message.split(/\s+/).forEach((word) => {
        const cleanedWord = word.replace(/[^\w\s]/g, "").toLowerCase(); // Clean word and make it lowercase

        // Skip empty strings, stop words (including auxiliary verbs, conjunctions, pronouns, and slang)
        if (cleanedWord && !stopWords.includes(cleanedWord)) {
            wordFrequency[cleanedWord] = (wordFrequency[cleanedWord] || 0) + 1;
        }
    });
}


function trackPhraseFrequency(message, phraseFrequency) {
    const words = message.split(/\s+/);
    for (let i = 0; i < words.length - 1; i++) {
        const phrase = words.slice(i, i + 2).join(" ").toLowerCase();
        phraseFrequency[phrase] = (phraseFrequency[phrase] || 0) + 1;
        if (i < words.length - 2) {
            const threeWordPhrase = words.slice(i, i + 3).join(" ").toLowerCase();
            phraseFrequency[threeWordPhrase] = (phraseFrequency[threeWordPhrase] || 0) + 1;
        }
    }
}

function displayWordEmojiStats(results) {
    // Function to display word and emoji stats (e.g., top emojis, word frequencies)
    console.log(results);
}
