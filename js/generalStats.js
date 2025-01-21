// generalStats.js

function displayActiveHours(activeHours) {
    const ctx = document.getElementById("activeHoursChart").getContext("2d");
    new Chart(ctx, getChartConfig(activeHours));
}

function getChartConfig(activeHours) {
    return {
        type: "bar",
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [
                {
                    label: "Messages Sent by Hour",
                    data: activeHours,
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Hour of the Day",
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Messages",
                    },
                },
            },
        },
    };
}

function displayGeneralStats(results) {
    setTextContent("totalMessages", `Total Messages: ${results.totalMessages}`);
    setTextContent("wordCount", `Word Count: ${results.wordCount}`);
    setTextContent("topEmoji", results.topEmoji ? `Top Emoji: ${results.topEmoji} (${results.topEmojiCount} times)` : "Top Emoji: None");
    setTextContent("mostUsedWord", results.mostUsedWord ? `Most Used Word: ${results.mostUsedWord} (${results.mostUsedWordCount} times)` : "Most Used Word: None");
    setTextContent("mostUsedPhrase", results.mostUsedPhrase ? `Most Used Phrase: ${results.mostUsedPhrase} (${results.mostUsedPhraseCount} times)` : "Most Used Phrase: None");
    setTextContent("longestMessage", results.longestMessage ? `Longest Message: "${results.longestMessage}"` : "Longest Message: None");
    setTextContent("mediaCount", `Media Sent: ${results.mediaCount}`);
    displayActiveHours(results.activeHours);
    displayParticipantsStats(results.participants);
}

function displayParticipantsStats(participants) {
    const participantSelect = document.getElementById("participantSelect");
    participantSelect.innerHTML = '<option value="all">All Participants</option>';

    for (const participant of Object.keys(participants)) {
        const option = document.createElement("option");
        option.value = participant;
        option.textContent = participant;
        participantSelect.appendChild(option);
    }
}

function handleParticipantChange(event) {
    const participant = event.target.value;
    if (participant === "all") {
        displayGeneralStats(results);
    } else {
        const stats = results.participants[participant];
        displayParticipantStats(participant, stats);
    }
}

function displayParticipantStats(participant, stats) {
    setTextContent("totalMessages", `Total Messages: ${stats.messages}`);
    setTextContent("wordCount", `Word Count: ${stats.wordCount}`);
    const { topEmoji, topEmojiCount } = getTopEmoji(stats.emojis);
    setTextContent("topEmoji", topEmoji ? `Top Emoji: ${topEmoji} (${topEmojiCount} times)` : "Top Emoji: None");
    const { mostUsedWord, mostUsedWordCount } = getMostUsedWord(stats.wordFrequency);
    setTextContent("mostUsedWord", mostUsedWord ? `Most Used Word: ${mostUsedWord} (${mostUsedWordCount} times)` : "Most Used Word: None");
    const { mostUsedPhrase, mostUsedPhraseCount } = getMostUsedPhrase(stats.phraseFrequency);
    setTextContent("mostUsedPhrase", mostUsedPhrase ? `Most Used Phrase: ${mostUsedPhrase} (${mostUsedPhraseCount} times)` : "Most Used Phrase: None");
    setTextContent("longestMessage", stats.longestMessage ? `Longest Message: "${stats.longestMessage}"` : "Longest Message: None");
    setTextContent("mediaCount", `Media Sent: ${stats.mediaCount}`);
    displayActiveHours(stats.activeHours);
}

function setTextContent(elementId, text) {
    document.getElementById(elementId).textContent = text;
}
