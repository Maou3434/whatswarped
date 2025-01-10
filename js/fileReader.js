// fileReader.js

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
        displayGeneralStats(results);
        displayWordEmojiStats(results);
        displayActiveHoursChart(results.activeHours);
    };

    reader.readAsText(file);
}
