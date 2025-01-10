// chatParser.js

// Function to parse and analyze chat data
function analyzeChat(chatData) {
    const lines = chatData.split("\n");
    const messageRegex = /^\d{2}\/\d{2}\/\d{2,4}, \d{1,2}:\d{2} - (.+?): (.+)$/;
    const emojiRegex = /([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}])/gu;

    let totalMessages = 0;
    let participants = {};
    let wordCount = 0;
    let emojis = {};
    let activeHours = Array(24).fill(0); // Track active hours for heat map
    let wordFrequency = {};
    let phraseFrequency = {};
    let longestMessage = "";
    let mediaCount = 0;

    lines.forEach((line) => {
        const match = line.match(messageRegex);
        if (match) {
            const sender = match[1];
            let message = match[2];

            // Skip non-informative or placeholder messages
            if (message.includes("<Media omitted>") || message.toLowerCase().includes("null") || message.toLowerCase().includes("deleted message")) {
                mediaCount++; // Count media omitted messages as media
                return; // Skip the rest of the processing for this message
            }

            totalMessages++;
            // Count messages per participant
            participants[sender] = (participants[sender] || 0) + 1;

            // Count words in the message
            wordCount += message.split(/\s+/).length;

            // Track emojis in the message
            const emojisInMessage = message.match(emojiRegex);
            if (emojisInMessage) {
                emojisInMessage.forEach((emoji) => {
                    emojis[emoji] = (emojis[emoji] || 0) + 1;
                });
            }

            // Track the most active hours
            const messageTime = line.split(" - ")[0];
            const hour = parseInt(messageTime.split(", ")[1].split(":")[0]);
            activeHours[hour]++;

            // Track word and phrase frequencies
            trackWordFrequency(message, wordFrequency);
            trackPhraseFrequency(message, phraseFrequency);

            // Track the longest message
            if (message.length > longestMessage.length && message.split(" ").length > 3) {
                longestMessage = message;
            }
        }
    });

    const topEmoji = Object.keys(emojis).reduce((a, b) => emojis[a] > emojis[b] ? a : b, "");
    const topEmojiCount = emojis[topEmoji] || 0;

    const mostUsedWord = Object.keys(wordFrequency).reduce((a, b) => wordFrequency[a] > wordFrequency[b] ? a : b, "");
    const mostUsedWordCount = wordFrequency[mostUsedWord] || 0;

    const mostUsedPhrase = Object.keys(phraseFrequency).reduce((a, b) => phraseFrequency[a] > phraseFrequency[b] ? a : b, "");
    const mostUsedPhraseCount = phraseFrequency[mostUsedPhrase] || 0;

    return {
        totalMessages,
        participants,
        wordCount,
        topEmoji,
        topEmojiCount,
        activeHours,
        mostUsedWord,
        mostUsedWordCount,
        mostUsedPhrase,
        mostUsedPhraseCount,
        longestMessage,
        mediaCount,
    };
}
