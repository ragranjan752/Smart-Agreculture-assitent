// ========== Advisor Tab Switching ==========
document.querySelectorAll('.advisor-tab-button').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all tabs
    document.querySelectorAll('.advisor-tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.advisor-content').forEach(tab => tab.classList.remove('active'));

    // Activate selected tab
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// ========== 1. Chatbot Query ==========
function sendChatbotQuery() {
  const query = document.getElementById('chatbot-input').value.trim();
  const responseDiv = document.getElementById('chatbot-response');

  if (query === "") {
    responseDiv.textContent = "Please enter a query.";
    return;
  }

  // Simulated response (replace with real API call)
  responseDiv.innerHTML = `<strong>Bot:</strong> Thanks for your question. Here's a helpful tip for farmers: Rotate crops regularly to maintain soil fertility!`;
}

// ========== 2. Pest & Disease Detection ==========
function detectDisease() {
  const fileInput = document.getElementById('disease-image');
  const resultDiv = document.getElementById('disease-result');

  if (!fileInput.files || fileInput.files.length === 0) {
    resultDiv.textContent = "Please upload an image of the affected plant.";
    return;
  }

  const file = fileInput.files[0];

  // Simulated detection logic
  resultDiv.innerHTML = `<strong>Result:</strong> Possible pest: <em>Aphids</em>. Suggestion: Use neem oil spray and monitor crop regularly.`;
}

// ========== 3. Fertilizer Recommendation ==========
function recommendFertilizer() {
  const crop = document.getElementById('crop-name').value.trim().toLowerCase();
  const soil = document.getElementById('soil-details').value.trim().toLowerCase();
  const resultDiv = document.getElementById('fertilizer-result');

  if (crop === "" || soil === "") {
    resultDiv.textContent = "Please enter both crop and soil information.";
    return;
  }

  // Simulated recommendation logic
  let recommendation = "NPK 10-26-26 for early growth stages.";
  if (crop.includes("rice")) {
    recommendation = "Use Urea + DAP for rice crops in loamy soil.";
  } else if (crop.includes("wheat")) {
    recommendation = "Apply 120:60:40 NPK ratio with micronutrients.";
  }

  resultDiv.innerHTML = `<strong>Recommendation for ${crop}:</strong> ${recommendation}`;
}

// ========== 4. Voice-Based Query ==========
function startVoiceQuery() {
  const responseDiv = document.getElementById('voice-response');

  if (!('webkitSpeechRecognition' in window)) {
    responseDiv.textContent = "Sorry, your browser doesn't support voice recognition.";
    return;
  }

  const recognition = new webkitSpeechRecognition(); // Use SpeechRecognition if supported
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  responseDiv.textContent = "Listening... 🎤";

  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    responseDiv.innerHTML = `<strong>You said:</strong> ${transcript}<br><strong>Response:</strong> Thank you for your voice query. Please maintain regular irrigation for better crop health.`;
  };

  recognition.onerror = function () {
    responseDiv.textContent = "There was an error recognizing your voice. Try again.";
  };
}

// ========== 5. Yield Calculator ==========
function calculateYield() {
  const area = parseFloat(document.getElementById('area').value);
  const yieldPerAcre = parseFloat(document.getElementById('yield-per-acre').value);
  const resultDiv = document.getElementById('yield-result');

  if (isNaN(area) || isNaN(yieldPerAcre)) {
    resultDiv.textContent = "Please enter valid numbers.";
    return;
  }

  const totalYield = area * yieldPerAcre;
  resultDiv.innerHTML = `<strong>Total Estimated Yield:</strong> ${totalYield.toFixed(2)} kg`;
}

// ========== 6. Revenue Calculator ==========
function calculateRevenue() {
  const totalYield = parseFloat(document.getElementById('total-yield').value);
  const marketPrice = parseFloat(document.getElementById('market-price').value);
  const resultDiv = document.getElementById('revenue-result');

  if (isNaN(totalYield) || isNaN(marketPrice)) {
    resultDiv.textContent = "Please enter valid values.";
    return;
  }

  const revenue = totalYield * marketPrice;
  resultDiv.innerHTML = `<strong>Total Estimated Revenue:</strong> ₹${revenue.toFixed(2)}`;
}
