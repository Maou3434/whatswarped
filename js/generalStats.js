// generalStats.js

function displayActiveHours(activeHours) {
    const ctx = document.getElementById("activeHoursChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Labels for each hour
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
    });
}


function displayGeneralStats(results) {
    // Display total messages
    document.getElementById("totalMessages").textContent = `Total Messages: ${results.totalMessages}`;

    // Display word count
    document.getElementById("wordCount").textContent = `Word Count: ${results.wordCount}`;

    // Display top emoji
    if (results.topEmoji) {
        document.getElementById("topEmoji").textContent = `Top Emoji: ${results.topEmoji} (${results.topEmojiCount} times)`;
    } else {
        document.getElementById("topEmoji").textContent = "Top Emoji: None";
    }

    // Display most used word
    if (results.mostUsedWord) {
        document.getElementById("mostUsedWord").textContent = `Most Used Word: ${results.mostUsedWord} (${results.mostUsedWordCount} times)`;
    } else {
        document.getElementById("mostUsedWord").textContent = "Most Used Word: None";
    }

    // Display most used phrase
    if (results.mostUsedPhrase) {
        document.getElementById("mostUsedPhrase").textContent = `Most Used Phrase: ${results.mostUsedPhrase} (${results.mostUsedPhraseCount} times)`;
    } else {
        document.getElementById("mostUsedPhrase").textContent = "Most Used Phrase: None";
    }

    // Display longest message
    if (results.longestMessage) {
        document.getElementById("longestMessage").textContent = `Longest Message: "${results.longestMessage}"`;
    } else {
        document.getElementById("longestMessage").textContent = "Longest Message: None";
    }

    // Display media count
    document.getElementById("mediaCount").textContent = `Media Sent: ${results.mediaCount}`;

    // Render the active hours graph
    displayActiveHours(results.activeHours);

}

