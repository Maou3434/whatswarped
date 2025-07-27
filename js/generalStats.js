// generalStats.js

let activeHoursChart;

function displayActiveHours(activeHours) {
    const ctx = document.getElementById("activeHoursChart").getContext("2d");
    if (activeHoursChart) {
        activeHoursChart.data.datasets[0].data = activeHours;
        activeHoursChart.update();
    } else {
        activeHoursChart = new Chart(ctx, getChartConfig(activeHours));
    }
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

function animateNumber(element, start, end, duration = 1200) {
    // element is now the .stat-value span
    if (typeof end !== 'number') {
        element.textContent = end;
        return;
    }
    const range = end - start;
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        element.textContent = Math.floor(start + range * progress).toLocaleString();
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = end.toLocaleString();
        }
    }
    requestAnimationFrame(step);
}

function launchConfetti(targetSelector) {
    // Simple confetti burst using emoji for now
    const container = document.querySelector(targetSelector);
    if (!container) return;
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    for (let i = 0; i < 32; i++) {
        const span = document.createElement('span');
        span.textContent = ['🎉','✨','🥳','🎊','💫'][Math.floor(Math.random()*5)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + '%';
        span.style.top = '-10px';
        span.style.fontSize = (Math.random() * 1.2 + 1.2) + 'em';
        span.style.opacity = 0.85;
        span.style.transition = `transform 1.6s cubic-bezier(.4,0,.2,1), opacity 1.6s`;
        confetti.appendChild(span);
        setTimeout(() => {
            span.style.transform = `translateY(${60 + Math.random()*40}vh) rotate(${Math.random()*360}deg)`;
            span.style.opacity = 0;
        }, 50);
    }
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1800);
}

function displayGeneralStats(results) {
    // Remove 'hidden' from all stat elements before animating
    document.querySelectorAll('.stat').forEach(stat => stat.classList.remove('hidden'));
    animateNumber(document.getElementById("totalMessages"), 0, results.totalMessages);
    animateNumber(document.getElementById("wordCount"), 0, results.wordCount);
    setTextContent("topEmoji", results.topEmoji ? `${results.topEmoji} (${results.topEmojiCount} times)` : "None");
    setTextContent("mostUsedWord", results.mostUsedWord ? `${results.mostUsedWord} (${results.mostUsedWordCount} times)` : "None");
    setTextContent("mostUsedPhrase", results.mostUsedPhrase ? `${results.mostUsedPhrase} (${results.mostUsedPhraseCount} times)` : "None");
    setTextContent("longestMessage", results.longestMessage ? `"${results.longestMessage}"` : "None");
    animateNumber(document.getElementById("mediaCount"), 0, results.mediaCount);
    displayActiveHours(results.activeHours);
    displayParticipantsStats(results.participants);

    document.querySelectorAll(".stat").forEach((stat, i) => {
        setTimeout(() => {
            stat.classList.add("visible");
        }, 200 + i * 120);
    });
    launchConfetti("#results");
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
    // Remove 'hidden' from all stat elements before animating
    document.querySelectorAll('.stat').forEach(stat => stat.classList.remove('hidden'));
    animateNumber(document.getElementById("totalMessages"), 0, stats.messages);
    animateNumber(document.getElementById("wordCount"), 0, stats.wordCount);
    const { topEmoji, topEmojiCount } = getTopEmoji(stats.emojis);
    setTextContent("topEmoji", topEmoji ? `${topEmoji} (${topEmojiCount} times)` : "None");
    const { mostUsedWord, mostUsedWordCount } = getMostUsedWord(stats.wordFrequency);
    setTextContent("mostUsedWord", mostUsedWord ? `${mostUsedWord} (${mostUsedWordCount} times)` : "None");
    const { mostUsedPhrase, mostUsedPhraseCount } = getMostUsedPhrase(stats.phraseFrequency);
    setTextContent("mostUsedPhrase", mostUsedPhrase ? `${mostUsedPhrase} (${mostUsedPhraseCount} times)` : "None");
    setTextContent("longestMessage", stats.longestMessage ? `"${stats.longestMessage}"` : "None");
    animateNumber(document.getElementById("mediaCount"), 0, stats.mediaCount);
    displayActiveHours(stats.activeHours);

    document.querySelectorAll(".stat").forEach((stat, i) => {
        setTimeout(() => {
            stat.classList.add("visible");
        }, 200 + i * 120);
    });
    launchConfetti("#results");
}

function setTextContent(elementId, text) {
    // Only update the .stat-value span
    document.getElementById(elementId).textContent = text;
}
