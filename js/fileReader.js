let results;

function handleFileInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file) {
        alert("Please choose a file.");
        return;
    }

    reader.onload = function(e) {
        const chatData = e.target.result;
        results = analyzeChat(chatData);

        displayGeneralStats(results);
        displayWordEmojiStats(results);
        displayActiveHours(results.activeHours);
    };

    reader.readAsText(file);
}