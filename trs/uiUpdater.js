// uiUpdater.js

export function displayResults(totalMessages, wordCount, emojiCount, mediaCount, senderMessageCount) {
    const resultsDiv = document.getElementById('resultsSection');
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <h2>Chat Statistics</h2>
        <p>Total Messages: ${totalMessages}</p>
        <p>Total Word Count: ${wordCount}</p>
        <p>Media Sent: ${mediaCount}</p>
    `;

    const topEmoji = Object.entries(emojiCount).sort((a, b) => b[1] - a[1])[0];
    resultsDiv.innerHTML += `<p>Top Emoji: ${topEmoji[0]} (Used ${topEmoji[1]} times)</p>`;

    const activeHoursData = getActiveHoursData(senderMessageCount);
    displayActiveHoursChart(activeHoursData);

    const participantList = Object.entries(senderMessageCount).map(([sender, count]) => {
        return `<p>${sender}: ${count} messages</p>`;
    }).join('');
    resultsDiv.innerHTML += `<h3>Participant Breakdown</h3>${participantList}`;
}
