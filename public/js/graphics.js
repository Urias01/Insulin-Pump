
let graphic = document.getElementById('myChart');

const data = {
  labels: ['4h', '8h', '12h', '16h', '20h', '24h'],
  datasets: [{
    label: 'Insulin tests',
    data: [154, 83, 132, 105, 208, 147],
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(255, 100, 20, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(255, 15, 65, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(255, 100, 20, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 15, 65, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }],
}

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

let chart = new Chart(graphic, {
  type: 'line',
  data: data,
  options: options
});