function analyzeChat(chatData) {
    const lines = chatData.split("\n");
    const messageRegex = /^\d{2}\/\d{2}\/\d{2,4}, \d{1,2}:\d{2} - (.+?): (.+)$/;
    const emojiRegex = /([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}])/gu;
    const mediaRegex = /(sent a photo|sent a video|sent an audio|sent a document|sent a contact|media omitted)/i;

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

            // Check for media messages (photo, video, audio, etc.)
            if (mediaRegex.test(message)) {
                mediaCount++;
            }

            // Count word frequency (excluding trivial words like 'the', 'a', etc.)
            message.split(/\s+/).forEach((word) => {
                const cleanedWord = word.replace(/[^\w\s]/g, "").toLowerCase();
                if (cleanedWord && !["the", "and", "a", "in", "is", "to"].includes(cleanedWord)) {
                    wordFrequency[cleanedWord] = (wordFrequency[cleanedWord] || 0) + 1;
                }
            });

            // Count phrase frequency (for simplicity, use 2-3 word phrases)
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

// Function to handle file input and display the results
function handleFileInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file) {
        alert("Please choose a file.");
        return;
    }

    reader.onload = function(e) {
        const chatData = e.target.result;
        const results = analyzeChat(chatData);

        // Display results on the page
        displayResults(results);
    };

    reader.readAsText(file);
}

// Function to display the results in a readable format
function displayResults(results) {
    // Total Messages
    document.getElementById('totalMessages').textContent = `Total Messages: ${results.totalMessages}`;

    // Word Count
    document.getElementById('wordCount').textContent = `Total Words: ${results.wordCount}`;

    // Top Emoji
    document.getElementById('topEmoji').textContent = `Top Emoji: ${results.topEmoji} (${results.topEmojiCount} occurrences)`;

    // Most Used Word
    document.getElementById('mostUsedWord').textContent = `Most Used Word: ${results.mostUsedWord} (${results.mostUsedWordCount} occurrences)`;

    // Most Used Phrase
    document.getElementById('mostUsedPhrase').textContent = `Most Used Phrase: ${results.mostUsedPhrase} (${results.mostUsedPhraseCount} occurrences)`;

    // Longest Message
    document.getElementById('longestMessage').textContent = `Longest Message: "${results.longestMessage}"`;

    // Media Sent
    document.getElementById('mediaCount').textContent = `Media Sent: ${results.mediaCount}`;

    // Active Hours (Display as a bar chart or table, depending on your preference)
    displayActiveHours(results.activeHours);

    // Participant Breakdown
    displayParticipants(results.participants);
}

// Function to display active hours as a bar chart
function displayActiveHours(activeHours) {
    const ctx = document.getElementById('activeHoursChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [{
                label: 'Messages Sent by Hour',
                data: activeHours,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to display participant message breakdown
function displayParticipants(participants) {
    const participantList = document.getElementById('participantsList');
    participantList.innerHTML = '';

    Object.keys(participants).forEach(participant => {
        const li = document.createElement('li');
        li.textContent = `${participant}: ${participants[participant]} messages`;
        participantList.appendChild(li);
    });
}
