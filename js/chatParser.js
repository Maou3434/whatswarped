function analyzeChat(chatData) {
    const lines = chatData.split("\n");
    const messageRegex = /^\d{2}\/\d{2}\/\d{2,4}, \d{1,2}:\d{2} - (.+?): (.+)$/;
    const emojiRegex = /([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}])/gu;

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

            if (message.includes("<Media omitted>") || message.toLowerCase().includes("null") || message.toLowerCase().includes("deleted message")) {
                mediaCount++;
                if (!participants[sender]) {
                    participants[sender] = {
                        messages: 0,
                        wordCount: 0,
                        emojis: {},
                        wordFrequency: {},
                        phraseFrequency: {},
                        longestMessage: "",
                        activeHours: Array(24).fill(0),
                        mediaCount: 0,
                    };
                }
                participants[sender].mediaCount++;
                return;
            }

            totalMessages++;
            if (!participants[sender]) {
                participants[sender] = {
                    messages: 0,
                    wordCount: 0,
                    emojis: {},
                    wordFrequency: {},
                    phraseFrequency: {},
                    longestMessage: "",
                    activeHours: Array(24).fill(0),
                    mediaCount: 0,
                };
            }
            participants[sender].messages++;
            const messageWordCount = message.split(/\s+/).length;
            participants[sender].wordCount += messageWordCount;
            wordCount += messageWordCount;

            const emojisInMessage = message.match(emojiRegex);
            if (emojisInMessage) {
                emojisInMessage.forEach((emoji) => {
                    emojis[emoji] = (emojis[emoji] || 0) + 1;
                    participants[sender].emojis[emoji] = (participants[sender].emojis[emoji] || 0) + 1;
                });
            }

            const messageTime = line.split(" - ")[0];
            const hour = parseInt(messageTime.split(", ")[1].split(":")[0]);
            activeHours[hour]++;
            participants[sender].activeHours[hour]++;

            trackWordFrequency(message, wordFrequency);
            trackWordFrequency(message, participants[sender].wordFrequency);
            trackPhraseFrequency(message, phraseFrequency);
            trackPhraseFrequency(message, participants[sender].phraseFrequency);

            if (message.length > longestMessage.length && messageWordCount > 3 && !isNonsensical(message)) {
                longestMessage = message;
            }
            if (message.length > participants[sender].longestMessage.length && messageWordCount > 3 && !isNonsensical(message)) {
                participants[sender].longestMessage = message;
            }
        }
    });

    const { topEmoji, topEmojiCount } = getTopEmoji(emojis);
    const { mostUsedWord, mostUsedWordCount } = getMostUsedWord(wordFrequency);
    const { mostUsedPhrase, mostUsedPhraseCount } = getMostUsedPhrase(phraseFrequency);

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

function getTopEmoji(emojis) {
    const topEmoji = Object.keys(emojis).reduce((a, b) => emojis[a] > emojis[b] ? a : b, "");
    const topEmojiCount = emojis[topEmoji] || 0;
    return { topEmoji, topEmojiCount };
}

function getMostUsedWord(wordFrequency) {
    const mostUsedWord = Object.keys(wordFrequency).reduce((a, b) => wordFrequency[a] > wordFrequency[b] ? a : b, "");
    const mostUsedWordCount = wordFrequency[mostUsedWord] || 0;
    return { mostUsedWord, mostUsedWordCount };
}

function getMostUsedPhrase(phraseFrequency) {
    const mostUsedPhrase = Object.keys(phraseFrequency).reduce((a, b) => phraseFrequency[a] > phraseFrequency[b] ? a : b, "");
    const mostUsedPhraseCount = phraseFrequency[mostUsedPhrase] || 0;
    return { mostUsedPhrase, mostUsedPhraseCount };
}

function isNonsensical(message) {
    const words = message.split(/\s+/);
    const uniqueWords = new Set(words);
    return uniqueWords.size / words.length < 0.5;
}