document.addEventListener("DOMContentLoaded", () => {
    // Removed IntersectionObserver for .stat elements to avoid conflict with manual .visible class toggling
});

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

        document.getElementById("results").classList.remove("hidden");
        document.getElementById("activeHoursSection").classList.remove("hidden");
        document.getElementById("participantSelectionSection").classList.remove("hidden");

        AOS.refresh();
    };

    reader.readAsText(file);
}