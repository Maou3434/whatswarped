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
        const results = analyzeChat(chatData); // Analyze the chat data

        // Show the results section after analysis
        document.getElementById('resultsSection').style.display = 'block';
        displayResults(results); // Display the analyzed results

        // Show participant selection after analysis is complete
        document.getElementById('participantSection').style.display = 'block';
        populateParticipantDropdown(results.participants);
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

// Function to populate participant dropdown
function populateParticipantDropdown(participants) {
    const participantSelect = document.getElementById('participantSelect');
    participantSelect.innerHTML = '<option value="">Select a participant</option>'; // Reset dropdown

    Object.keys(participants).forEach(participant => {
        const option = document.createElement('option');
        option.value = participant;
        option.textContent = participant;
        participantSelect.appendChild(option);
    });
}
