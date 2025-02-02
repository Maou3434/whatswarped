document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    stats.forEach(stat => observer.observe(stat));
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