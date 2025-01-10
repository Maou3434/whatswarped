// Calculate general statistics from parsed chat data
function calculateGeneralStats(parsedData) {
    const stats = {
        totalMessages: parsedData.length,
        messagesPerSender: {}
    };

    parsedData.forEach(({ sender }) => {
        if (!stats.messagesPerSender[sender]) {
            stats.messagesPerSender[sender] = 0;
        }
        stats.messagesPerSender[sender]++;
    });

    return stats;
}

// Display general statistics
function displayGeneralStats(stats) {
    const generalStatsList = document.getElementById("generalStatsList");
    generalStatsList.innerHTML = ""; // Clear previous stats

    const totalMessagesItem = document.createElement("li");
    totalMessagesItem.textContent = `Total Messages: ${stats.totalMessages}`;
    generalStatsList.appendChild(totalMessagesItem);

    for (const [sender, count] of Object.entries(stats.messagesPerSender)) {
        const senderItem = document.createElement("li");
        senderItem.textContent = `${sender}: ${count} messages`;
        generalStatsList.appendChild(senderItem);
    }
}
