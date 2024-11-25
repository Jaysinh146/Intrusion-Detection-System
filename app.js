// Global variables to store attack signatures, traffic data, and alerts
let attackSignatures = [];
let trafficData = [];
let alerts = [];

// Create the traffic chart (using Chart.js)
const ctx = document.getElementById('trafficChart').getContext('2d');
const trafficChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Packet Size (KB)',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Function to add malicious signature (bad behavior)
function addSignature() {
  const signature = document.getElementById('signatureInput').value;
  if (signature) {
    attackSignatures.push(signature);
    document.getElementById('signatureInput').value = ''; // Clear input field
    updateSignatureList();
  } else {
    alert('Please enter a valid signature!');
  }
}

// Update the list of added signatures on the page
function updateSignatureList() {
  const signatureList = document.getElementById('signatureList');
  signatureList.textContent = attackSignatures.join(', ') || "None";
}

// Function to simulate incoming network packets
function simulateTraffic() {
  const packets = ['normaldata1', 'malware123', 'normaldata2', 'attack456', 'suspiciousdata'];
  const randomPacket = packets[Math.floor(Math.random() * packets.length)];
  
  // Simulate packet size (1 to 10 KB)
  const packetSize = Math.random() * 10 + 1;
  
  // Check if packet matches any signature
  const isMalicious = attackSignatures.some(signature => randomPacket.includes(signature));
  
  // If malicious, add alert to list
  if (isMalicious) {
    alerts.push(`Malicious packet detected: ${randomPacket}`);
    displayAlerts();
  }

  // Update traffic chart with packet size
  updateTrafficChart(packetSize);

  console.log(`Packet: ${randomPacket}, Size: ${packetSize.toFixed(2)} KB`);
}

// Update the traffic chart with new packet data
function updateTrafficChart(packetSize) {
  const time = new Date().toLocaleTimeString();
  trafficChart.data.labels.push(time);
  trafficChart.data.datasets[0].data.push(packetSize);
  trafficChart.update();
}

// Function to display alerts on the page
function displayAlerts() {
  const alertsList = document.getElementById('alertsList');
  alertsList.innerHTML = ''; // Clear previous alerts
  
  // Add all alerts to the list
  alerts.forEach(alert => {
    const listItem = document.createElement('li');
    listItem.textContent = alert;
    alertsList.appendChild(listItem);
  });
}

// Function to download the chart as an image
function downloadChart() {
  // Get the chart image in base64 format
  const chartImage = trafficChart.toBase64Image();
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = chartImage;
  link.download = 'traffic_chart.png'; // Set the download file name
  
  // Trigger the download
  link.click();
}

// Function to reset the system (clear everything)
function resetSystem() {
  // Clear attack signatures
  attackSignatures = [];
  document.getElementById('signatureList').textContent = "None";
  
  // Clear alerts
  alerts = [];
  document.getElementById('alertsList').innerHTML = '';
  
  // Clear chart data
  trafficChart.data.labels = [];
  trafficChart.data.datasets[0].data = [];
  trafficChart.update();
  
  // Clear the input field
  document.getElementById('signatureInput').value = '';
  
  console.log("System reset completed.");
}
