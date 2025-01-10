// chatAnalyzer.js

export function analyzeChat(chatData, callback) {
    const messages = chatData.split('\n');
    let totalMessages = 0;
    let wordCount = 0;
    let emojiCount = {};
    let mediaCount = 0;
    let senderMessageCount = {};

    const messageRegex = /(\d{1,2}\/\d{1,2}\/\d{2,4}, \d{1,2}:\d{1,2} (?:AM|PM)) - (.*?): (.*)/;
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji})/gu;

    messages.forEach(msg => {
        const match = msg.match(messageRegex);
        if (match) {
            totalMessages++;
            const sender = match[2];
            const messageContent = match[3];

            wordCount += messageContent.split(' ').length;

            const emojis = [...messageContent.matchAll(emojiRegex)];
            emojis.forEach(emoji => {
                emojiCount[emoji[0]] = (emojiCount[emoji[0]] || 0) + 1;
            });

            if (messageContent.includes('media omitted')) {
                mediaCount++;
            }

            senderMessageCount[sender] = (senderMessageCount[sender] || 0) + 1;
        }
    });

    callback(totalMessages, wordCount, emojiCount, mediaCount, senderMessageCount);
}

export function getActiveHoursData(messages) {
    const hourData = Array(24).fill(0);
    const timeRegex = /\d{1,2}\/\d{1,2}\/\d{2,4}, (\d{1,2}):\d{1,2} (?:AM|PM)/;

    messages.forEach(msg => {
        const timeMatch = msg.match(timeRegex);
        if (timeMatch) {
            const hour = parseInt(timeMatch[1]);
            hourData[hour]++;
        }
    });

    return hourData;
}
