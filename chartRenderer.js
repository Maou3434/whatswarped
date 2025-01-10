// chartRenderer.js

import { Chart } from 'chart.js';

export function displayActiveHoursChart(activeHoursData) {
    const ctx = document.getElementById('activeHoursChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => i + ":00"),
            datasets: [{
                label: 'Messages Sent',
                data: activeHoursData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    });
}
