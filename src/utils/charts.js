// Initialize charts
function initializeCharts() {
    const ctx = document.getElementById('insights-chart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'User Activity',
                data: [65, 59, 80, 81, 56, 85],
                borderColor: '#00ffee',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });

    // Update chart data periodically
    setInterval(() => {
        const newData = chart.data.datasets[0].data.map(() => 
            Math.floor(Math.random() * 100)
        );
        chart.data.datasets[0].data = newData;
        chart.update('none');
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCharts); 