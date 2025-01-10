// generalStats.js

function displayGeneralStats(results) {
    // Display total messages
    document.getElementById("totalMessages").textContent = `Total Messages: ${results.totalMessages}`;

    // Display word count
    document.getElementById("wordCount").textContent = `Word Count: ${results.wordCount}`;

    // Display top emoji
    document.getElementById("topEmoji").textContent = `Top Emoji: ${results.topEmoji} (${results.topEmojiCount} times)`;

    // Display most used word
    document.getElementById("mostUsedWord").textContent = `Most Used Word: ${results.mostUsedWord} (${results.mostUsedWordCount} times)`;

    // Display most used phrase
    document.getElementById("mostUsedPhrase").textContent = `Most Used Phrase: ${results.mostUsedPhrase} (${results.mostUsedPhraseCount} times)`;

    // Display longest message
    document.getElementById("longestMessage").textContent = `Longest Message: ${results.longestMessage}`;

    // Display media count
    document.getElementById("mediaCount").textContent = `Media Omitted: ${results.mediaCount}`;
}
