// Function to calculate general statistics
function calculateGeneralStats(parsedData) {
    const totalMessages = parsedData.length;
    const uniqueParticipants = new Set(parsedData.map((entry) => entry.sender)).size;
    const wordCount = parsedData.reduce((count, entry) => count + entry.message.split(/\s+/).length, 0);
    const mediaCount = parsedData.filter((entry) => entry.message.toLowerCase() === "media omitted").length;

    return {
        totalMessages,
        uniqueParticipants,
        wordCount,
        mediaCount,
    };
}

// Function to display general statistics
function displayGeneralStats(stats) {
    const statsList = `
        <ul>
            <li><strong>Total Messages:</strong> ${stats.totalMessages}</li>
            <li><strong>Unique Participants:</strong> ${stats.uniqueParticipants}</li>
            <li><strong>Total Word Count:</strong> ${stats.wordCount}</li>
            <li><strong>Media Messages:</strong> ${stats.mediaCount}</li>
        </ul>
    `;
    statsContainer.innerHTML = statsList;
}
