// Analyze the uploaded chat data
function analyzeChat(chatData) {
    const lines = chatData.split("\n");
    const messageRegex = /^\d{2}\/\d{2}\/\d{2,4}, \d{1,2}:\d{2} - (.+?): (.+)$/;
    const emojiRegex = /([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}])/gu;
    const mediaRegex = /(sent a photo|sent a video|sent an audio|sent a document|sent a contact|media omitted)/i;

    let totalMessages = 0;
    let participants = {};
    let wordCount = 0;
    let emojis = {};
    let activeHours = Array(24).fill(0);
    let wordFrequency = {};
    let phraseFrequency = {};
    let longestMessage = "";
    let mediaCount = 0;

    lines.forEach((line) => {
        const match = line.match(messageRegex);
        if (match) {
            const sender = match[1];
            let message = match[2];

            // Skip media and placeholder messages
            if (message.includes("<Media omitted>") || message.toLowerCase().includes("null") || message.toLowerCase().includes("deleted message")) {
                mediaCount++;
                return;
            }

            totalMessages++;

            // Count messages by sender
            participants[sender] = (participants[sender] || 0) + 1;

            // Word count
            wordCount += message.split(/\s+/).length;

            // Track emojis
            const emojisInMessage = message.match(emojiRegex);
            if (emojisInMessage) {
                emojisInMessage.forEach((emoji) => {
                    emojis[emoji] = (emojis[emoji] || 0) + 1;
                });
            }

            // Track active hours
            const messageTime = line.split(" - ")[0];
            const hour = parseInt(messageTime.split(", ")[1].split(":")[0]);
            activeHours[hour]++;

            // Count media messages
            if (mediaRegex.test(message)) {
                mediaCount++;
            }

            // Word frequency analysis
            message.split(/\s+/).forEach((word) => {
                const cleanedWord = word.replace(/[^\w\s]/g, "").toLowerCase();
                if (cleanedWord && !["the", "and", "a", "in", "is", "to"].includes(cleanedWord)) {
                    wordFrequency[cleanedWord] = (wordFrequency[cleanedWord] || 0) + 1;
                }
            });

            // Phrase frequency analysis
            const words = message.split(/\s+/);
            for (let i = 0; i < words.length - 1; i++) {
                const phrase = words.slice(i, i + 2).join(" ").toLowerCase();
                phraseFrequency[phrase] = (phraseFrequency[phrase] || 0) + 1;
                if (i < words.length - 2) {
                    const threeWordPhrase = words.slice(i, i + 3).join(" ").toLowerCase();
                    phraseFrequency[threeWordPhrase] = (phraseFrequency[threeWordPhrase] || 0) + 1;
                }
            }

            // Track the longest message
            if (message.length > longestMessage.length) {
                longestMessage = message;
            }
        }
    });

    // Extract most used emoji, word, and phrase
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
