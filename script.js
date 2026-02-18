let currentUser = null;
let currentPage = 'home';

// Initialize loading screen and page transitions
window.addEventListener('load', function() {
  setTimeout(() => {
    document.getElementById('loading-screen').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('page-content').classList.add('loaded');
    }, 500);
  }, 1500);
});

// Page navigation system
function showPage(pageId){
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Hide all navigation bars
  document.getElementById('main-nav').style.display = 'none';
  document.getElementById('victim-nav').style.display = 'none';
  document.getElementById('rescue-nav').style.display = 'none';
  
  // Hide chatbot when switching pages
  document.getElementById('chatbot').style.display = 'none';
  
  currentPage = pageId;
  
  if (pageId === 'home') {
    document.getElementById('home-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
    currentUser = null;
  } else if (pageId === 'victim') {
    document.getElementById('victim-page').classList.add('active');
    document.getElementById('victim-nav').style.display = 'flex';
    currentUser = 'victim';
  } else if (pageId === 'rescue') {
    document.getElementById('rescue-page').classList.add('active');
    document.getElementById('rescue-nav').style.display = 'flex';
    currentUser = 'rescue';
    // Initialize map for rescue team and load all alerts
    setTimeout(initMap, 100);
  } else if (pageId === 'about'){
    document.getElementById('about-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'contact') {
    document.getElementById('contact-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'preparedness') {
    document.getElementById('preparedness-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'ayush-profile') {
    document.getElementById('ayush-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'soubhagya-profile') {
    document.getElementById('soubhagya-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'prateek-profile') {
    document.getElementById('prateek-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'prince-profile') {
    document.getElementById('prince-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'aditya-profile') {
    document.getElementById('aditya-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'aman-profile') {
    document.getElementById('aman-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'avinash-profile') {
    document.getElementById('avinash-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'vaibhav-profile') {
    document.getElementById('vaibhav-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'aman-nigam-profile') {
    document.getElementById('aman-nigam-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'akash-profile') {
    document.getElementById('akash-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'geologist-ayush-profile') {
    document.getElementById('geologist-ayush-profile-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  } else if (pageId === 'victim-registration') {
    document.getElementById('victim-registration-page').classList.add('active');
    document.getElementById('main-nav').style.display = 'flex';
  }
  
  // Update active nav link
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
}

// Chatbot functionality
let chatbotMinimized = false;

function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  
  if (chatbot.style.display === 'none') {
    chatbot.style.display = 'flex';
    clearChatbotNotification();
  } else {
    chatbot.style.display = 'none';
  }
}

function showChatbotNotification() {
  const chatbot = document.getElementById('chatbot');
  let badge = chatbot.querySelector('.notification-badge');
  
  if (!badge) {
    badge = document.createElement('div');
    badge.className = 'notification-badge';
    badge.textContent = '1';
    chatbot.appendChild(badge);
  } else {
    badge.textContent = parseInt(badge.textContent) + 1;
  }
}

function clearChatbotNotification() {
  const badge = document.querySelector('.notification-badge');
  if (badge) {
    badge.remove();
  }
}

function sendChatMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value.trim();
  if (!message) return;
  
  addChatMessage(message, 'user');
  input.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  setTimeout(() => {
    hideTypingIndicator();
    const response = getChatbotResponse(message);
    addChatMessage(response, 'bot');
  }, 1000 + Math.random() * 1000); // Random delay for realism
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('chatbot-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `
    <strong>🤖 Assistant is typing</strong>
    <div class="typing-dots">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function askQuestion(topic) {
  const questions = {
    'earthquake': 'What should I do during an earthquake?',
    'fire': 'How do I escape from a fire?',
    'flood': 'What are flood safety tips?',
    'first-aid': 'Basic first aid steps?'
  };
  
  const question = questions[topic];
  addChatMessage(question, 'user');
  
  // Show typing indicator
  showTypingIndicator();
  
  setTimeout(() => {
    hideTypingIndicator();
    const response = getChatbotResponse(question);
    addChatMessage(response, 'bot');
  }, 800);
}

function addChatMessage(message, sender) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = sender === 'bot' ? `<strong>🤖 Assistant:</strong><br>${message}` : message;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getChatbotResponse(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('earthquake')) {
    return `🏠 <strong>Earthquake Safety:</strong><br>
    • DROP to hands and knees<br>
    • COVER your head and neck under a desk<br>
    • HOLD ON until shaking stops<br>
    • Stay away from windows and heavy objects<br>
    • If outdoors, move away from buildings`;
  }
  
  if (msg.includes('fire')) {
    return `🔥 <strong>Fire Emergency:</strong><br>
    • Stay low to avoid smoke<br>
    • Feel doors before opening (hot = fire behind)<br>
    • Use stairs, never elevators<br>
    • Stop, Drop, and Roll if clothes catch fire<br>
    • Call 911 immediately`;
  }
  
  if (msg.includes('flood')) {
    return `🌊 <strong>Flood Safety:</strong><br>
    • Move to higher ground immediately<br>
    • Never walk/drive through flood water<br>
    • 6 inches of water can knock you down<br>
    • 12 inches can carry away a car<br>
    • Listen to emergency broadcasts`;
  }
  
  if (msg.includes('first aid') || msg.includes('bleeding')) {
    return `🩹 <strong>Basic First Aid:</strong><br>
    • Apply direct pressure to bleeding<br>
    • Elevate injured area above heart<br>
    • For choking: 5 back blows, 5 chest thrusts<br>
    • CPR: 30 compressions, 2 breaths<br>
    • Call emergency services immediately`;
  }
  
  if (msg.includes('tornado') || msg.includes('storm')) {
    return `🌪️ <strong>Tornado Safety:</strong><br>
    • Go to lowest floor, interior room<br>
    • Stay away from windows<br>
    • Cover yourself with blankets/mattress<br>
    • If in car, abandon it and lie flat in ditch<br>
    • Never try to outrun a tornado`;
  }
  
  if (msg.includes('help') || msg.includes('emergency')) {
    return `🚨 <strong>Emergency Actions:</strong><br>
    • Call 911 for immediate help<br>
    • Use the SOS button above for location alerts<br>
    • Stay calm and follow safety protocols<br>
    • Have emergency kit ready<br>
    • Know your evacuation routes`;
  }
  
  return `I can help with:<br>
  • Earthquake, Fire, Flood safety<br>
  • First Aid and Emergency procedures<br>
  • Tornado and Storm protection<br>
  • General disaster preparedness<br><br>
  Ask me about any emergency situation!`;
}

// User and disaster selection variables
let selectedDisasterType = null;
let userInfo = { name: '', phone: '' };

function selectEmergencyType(type) {
  selectedDisasterType = type;
  
  // Remove selected class from all cards
  document.querySelectorAll('.disaster-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  // Add selected class to clicked card
  document.querySelector(`[data-type="${type}"]`).classList.add('selected');
  
  // Enable proceed button
  document.getElementById('proceed-btn').disabled = false;
}

function proceedToUserForm() {
  if (!selectedDisasterType) {
    alert('Please select an emergency type first.');
    return;
  }
  
  // Hide disaster selection and show user form
  document.getElementById('disaster-selection').style.display = 'none';
  document.getElementById('user-form-section').style.display = 'block';
}

function proceedToSOS() {
  // Validate user information
  const userName = document.getElementById('user-name').value.trim();
  const userPhone = document.getElementById('user-phone').value.trim();
  
  if (!userName || !userPhone) {
    alert('Please fill in all required fields.');
    return;
  }
  
  if (!/^[0-9]{10}$/.test(userPhone)) {
    alert('Phone number must be exactly 10 digits.');
    return;
  }
  
  // Store user information
  userInfo.name = userName;
  userInfo.phone = userPhone;
  
  // Hide user form and show SOS section
  document.getElementById('user-form-section').style.display = 'none';
  document.getElementById('sos-section').style.display = 'block';
  
  // Update title with selected disaster type
  document.getElementById('selected-disaster-title').textContent = selectedDisasterType.charAt(0).toUpperCase() + selectedDisasterType.slice(1);
}

function goBackToSelection() {
  document.getElementById('disaster-selection').style.display = 'block';
  document.getElementById('user-form-section').style.display = 'none';
  document.getElementById('sos-section').style.display = 'none';
}

// SOS Button logic
function sendSOS() {
  if (currentPage !== 'victim') {
    alert('Access denied. Only victims can send SOS alerts.');
    return;
  }
  
  if (!selectedDisasterType) {
    alert('Please select an emergency type first.');
    return;
  }
  
  const sosBtn = document.querySelector('.sos-btn');
  const statusEl = document.getElementById("sos-status");
  
  console.log('Elements found:', sosBtn, statusEl);
  
  // Add sending animation
  sosBtn.classList.add('sending');
  
  statusEl.style.display = 'block';
  statusEl.className = 'status show';
  statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating and sending alert...';
  
  console.log('Checking geolocation support...');
  
  if (!navigator.geolocation) {
    console.log('Geolocation not supported');
    sosBtn.classList.remove('sending');
    statusEl.className = 'status error show';
    statusEl.innerHTML = '<i class="fas fa-times"></i> Geolocation not supported by your browser.';
    return;
  }

  console.log('Getting current position...');
  
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log('Position received:', pos);
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const currentTime = new Date().toLocaleTimeString();
      
      sosBtn.classList.remove('sending');
      statusEl.className = 'status success show';
      statusEl.innerHTML = `<i class="fas fa-check"></i> ${selectedDisasterType.toUpperCase()} Alert Sent Successfully!<br>Name: ${userInfo.name}<br>Phone: ${userInfo.phone}<br>Location: ${lat.toFixed(4)}, ${lon.toFixed(4)}<br>Emergency services notified.`;

      // Add alert to map/fallback
      console.log('Adding to map/fallback, mapInitialized:', mapInitialized);
      if (mapInitialized) {
        addMapMarker(lat, lon, currentTime, selectedDisasterType);
      } else {
        pendingAlerts.push({ lat: lat, lng: lon, time: currentTime, type: selectedDisasterType });
        addAlertToFallback(lat, lon, currentTime, selectedDisasterType);
      }
      
      // Show notification badge on chatbot
      showChatbotNotification();
    },
    (err) => {
      console.log('Geolocation error:', err);
      sosBtn.classList.remove('sending');
      statusEl.className = 'status error show';
      
      let errorMsg = `Error ${err.code}: `;
      switch(err.code) {
        case 1: // PERMISSION_DENIED
          errorMsg += 'Location access denied. Please allow location access and try again.';
          break;
        case 2: // POSITION_UNAVAILABLE
          errorMsg += 'Location information unavailable.';
          break;
        case 3: // TIMEOUT
          errorMsg += 'Location request timed out.';
          break;
        default:
          errorMsg += err.message;
      }
      
      statusEl.innerHTML = `<i class="fas fa-times"></i> ${errorMsg}`;
    },
    {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 300000
    }
  );
}

// OpenStreetMap initialization with Leaflet
let map;
let mapInitialized = false;
let pendingAlerts = [];

function initMap() {
  if (currentPage !== 'rescue') return;
  
  try {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    // Initialize Leaflet map centered on India
    map = L.map('map').setView([20.5937, 78.9629], 5);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
    
    mapInitialized = true;
    document.getElementById('map-fallback').style.display = 'none';
    
    // Add any pending alerts
    pendingAlerts.forEach(alert => addMapMarker(alert.lat, alert.lng, alert.time, alert.type));
    pendingAlerts = [];
    
  } catch (error) {
    console.error('Map initialization failed:', error);
    showMapFallback();
  }
}

function showMapFallback() {
  document.getElementById('map').style.display = 'none';
  document.getElementById('map-fallback').style.display = 'block';
}

function addMapMarker(lat, lng, time, disasterType = 'emergency') {
  if (mapInitialized && window.L && map) {
    const disasterIcons = {
      flood: 'fas fa-water',
      earthquake: 'fas fa-house-damage',
      fire: 'fas fa-fire',
      medical: 'fas fa-ambulance',
      accident: 'fas fa-car-crash',
      storm: 'fas fa-bolt'
    };
    
    const iconClass = disasterIcons[disasterType] || 'fas fa-exclamation-triangle';
    
    // Create custom emergency icon
    const emergencyIcon = L.divIcon({
      className: 'emergency-marker',
      html: `<i class="${iconClass}" style="color: #ff4757; font-size: 20px;"></i>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
    
    // Add marker to map
    const marker = L.marker([lat, lng], { icon: emergencyIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center;">
          <strong>🚨 ${disasterType.toUpperCase()} Alert</strong><br>
          <small><strong>Name:</strong> ${userInfo.name || 'Unknown'}</small><br>
          <small><strong>Phone:</strong> ${userInfo.phone || 'Unknown'}</small><br>
          <small><strong>Time:</strong> ${time}</small><br>
          <small><strong>Location:</strong> ${lat.toFixed(4)}, ${lng.toFixed(4)}</small>
        </div>
      `);
    
    // Center map on new alert
    map.setView([lat, lng], 15);
    marker.openPopup();
  } else {
    // Add to fallback display
    addAlertToFallback(lat, lng, time, disasterType);
  }
}

function addAlertToFallback(lat, lng, time, disasterType = 'emergency') {
  const alertList = document.getElementById('alert-list');
  const alertItem = document.createElement('div');
  alertItem.className = 'alert-item';
  
  const disasterIcons = {
    flood: 'fas fa-water',
    earthquake: 'fas fa-house-damage',
    fire: 'fas fa-fire',
    medical: 'fas fa-ambulance',
    accident: 'fas fa-car-crash',
    storm: 'fas fa-bolt'
  };
  
  const iconClass = disasterIcons[disasterType] || 'fas fa-exclamation-triangle';
  
  alertItem.innerHTML = `
    <div><i class="${iconClass}"></i> ${disasterType.toUpperCase()} Alert</div>
    <div><strong>Name:</strong> ${userInfo.name || 'Unknown'}</div>
    <div><strong>Phone:</strong> ${userInfo.phone || 'Unknown'}</div>
    <div>Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}</div>
    <div class="alert-time">${time}</div>
  `;
  alertList.appendChild(alertItem);
}

// Timeout for map loading
setTimeout(() => {
  if (!mapInitialized && currentUser === 'rescue') {
    console.warn('Map loading timeout - showing fallback');
    showMapFallback();
  }
}, 5000);

// Emergency Preparedness Functions
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(tabName + '-tab').classList.add('active');
  event.target.classList.add('active');
}

function updateProgress() {
  const checkboxes = document.querySelectorAll('#emergency-kit input[type="checkbox"]');
  const checked = document.querySelectorAll('#emergency-kit input[type="checkbox"]:checked');
  const progress = (checked.length / checkboxes.length) * 100;
  
  // Animate progress bar
  const progressBar = document.getElementById('kit-progress');
  progressBar.style.width = progress + '%';
  
  // Update status with animation
  const statusEl = document.getElementById('kit-status');
  statusEl.style.transform = 'scale(1.05)';
  statusEl.textContent = 
    `${Math.round(progress)}% Complete - ${checked.length} of ${checkboxes.length} items ready`;
  
  setTimeout(() => {
    statusEl.style.transform = 'scale(1)';
  }, 200);
  
  // Update checklist item styles with animation
  checkboxes.forEach(checkbox => {
    const item = checkbox.parentElement;
    if (checkbox.checked) {
      item.classList.add('completed');
      item.style.transform = 'scale(1.02)';
      setTimeout(() => {
        item.style.transform = 'scale(1)';
      }, 200);
    } else {
      item.classList.remove('completed');
    }
  });
  
  // Show celebration for 100% completion
  if (progress === 100) {
    setTimeout(() => {
      alert('🎉 Congratulations! Your emergency kit is complete!');
    }, 300);
  }
}

function addContact() {
  const name = prompt('Enter contact name:');
  const phone = prompt('Enter phone number:');
  
  if (name && phone) {
    const contactList = document.getElementById('contact-list');
    const contactItem = document.createElement('div');
    contactItem.className = 'checklist-item';
    contactItem.style.transform = 'translateX(-100%)';
    contactItem.style.opacity = '0';
    contactItem.innerHTML = `
      <span><strong>${name}:</strong> ${phone}</span>
      <button onclick="removeContact(this)" style="background: #ff4757; color: white; border: none; padding: 0.3rem; border-radius: 5px; cursor: pointer; transition: all 0.3s ease;">
        <i class="fas fa-trash"></i>
      </button>
    `;
    contactList.appendChild(contactItem);
    
    // Animate in
    setTimeout(() => {
      contactItem.style.transform = 'translateX(0)';
      contactItem.style.opacity = '1';
    }, 100);
  }
}

function removeContact(button) {
  const item = button.parentElement;
  item.style.transform = 'translateX(100%)';
  item.style.opacity = '0';
  setTimeout(() => {
    item.remove();
  }, 300);
}

// Enhanced mobile responsiveness (excluding chatbot)
function adjustForMobile() {
  if (window.innerWidth <= 768) {
    const style = document.createElement('style');
    style.textContent = `
      .sos-btn {
        width: 120px;
        height: 120px;
        font-size: 1.2rem;
      }
      .role-btn {
        padding: 1rem 2rem;
        font-size: 1rem;
      }
    `;
    document.head.appendChild(style);
  }
}

// Call on load and resize
adjustForMobile();
window.addEventListener('resize', adjustForMobile);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update all theme toggle buttons
  const icons = ['theme-icon', 'theme-icon-victim', 'theme-icon-rescue'];
  const texts = ['theme-text', 'theme-text-victim', 'theme-text-rescue'];
  
  icons.forEach(id => {
    const icon = document.getElementById(id);
    if (icon) {
      icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  });
  
  texts.forEach(id => {
    const text = document.getElementById(id);
    if (text) {
      text.textContent = newTheme === 'dark' ? 'Light' : 'Dark';
    }
  });
}

// Load saved theme on page load
window.addEventListener('load', function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  if (savedTheme === 'dark') {
    const icons = ['theme-icon', 'theme-icon-victim', 'theme-icon-rescue'];
    const texts = ['theme-text', 'theme-text-victim', 'theme-text-rescue'];
    
    icons.forEach(id => {
      const icon = document.getElementById(id);
      if (icon) icon.className = 'fas fa-sun';
    });
    
    texts.forEach(id => {
      const text = document.getElementById(id);
      if (text) text.textContent = 'Light';
    });
  }
});

// Add page visibility change handler for better performance
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = 'paused';
  } else {
    // Resume animations when page becomes visible
    document.body.style.animationPlayState = 'running';
  }
});

// Disaster Dashboard functionality
let dashboardOpen = false;
let predictionDashboardOpen = false;

function toggleDashboard() {
  const content = document.getElementById('dashboard-content');
  dashboardOpen = !dashboardOpen;
  
  if (dashboardOpen) {
    content.classList.add('show');
    loadDisasterData();
  } else {
    content.classList.remove('show');
  }
}

function togglePredictionDashboard() {
  const content = document.getElementById('prediction-content');
  predictionDashboardOpen = !predictionDashboardOpen;
  
  if (predictionDashboardOpen) {
    content.classList.add('show');
    loadPredictionData();
  } else {
    content.classList.remove('show');
  }
}

// Working disaster data for UP cities
function loadDisasterData() {
  const dashboardContent = document.getElementById('dashboard-content');
  
  // UP cities disaster monitoring data
  const disasters = [
    {
      type: 'flood',
      severity: 'warning',
      location: 'Gorakhpur, UP',
      icon: 'fas fa-water',
      description: 'Monsoon flood alert'
    },
    {
      type: 'normal',
      severity: 'safe',
      location: 'Lucknow, UP',
      icon: 'fas fa-check-circle',
      description: 'Weather conditions normal'
    },
    {
      type: 'heatwave',
      severity: 'warning',
      location: 'Allahabad, UP',
      icon: 'fas fa-thermometer-full',
      description: 'High temperature alert'
    },
    {
      type: 'normal',
      severity: 'safe',
      location: 'Varanasi, UP',
      icon: 'fas fa-check-circle',
      description: 'All systems normal'
    },
    {
      type: 'storm',
      severity: 'critical',
      location: 'Ayodhya, UP',
      icon: 'fas fa-wind',
      description: 'Severe weather warning'
    }
  ];
  
  dashboardContent.innerHTML = disasters.map(disaster => `
    <div class="alert-item ${disaster.severity}">
      <div class="alert-icon">
        <i class="${disaster.icon}" style="color: ${getSeverityColor(disaster.severity)}"></i>
      </div>
      <div class="alert-details">
        <div class="alert-title">${disaster.description}</div>
        <div class="alert-location">${disaster.location}</div>
      </div>
    </div>
  `).join('');
}

function getSeverityColor(severity) {
  switch(severity) {
    case 'critical': return '#ef4444';
    case 'warning': return '#f59e0b';
    case 'safe': return '#10b981';
    default: return '#6b7280';
  }
}

// Close dashboard when clicking outside
document.addEventListener('click', function(event) {
  const dashboard = document.querySelector('.disaster-dashboard');
  const predictionDashboard = document.querySelector('.prediction-dashboard');
  
  if (dashboard && !dashboard.contains(event.target) && dashboardOpen) {
    toggleDashboard();
  }
  
  if (predictionDashboard && !predictionDashboard.contains(event.target) && predictionDashboardOpen) {
    togglePredictionDashboard();
  }
});

// Auto-refresh disaster data every 30 seconds
setInterval(() => {
  if (dashboardOpen) {
    loadDisasterData();
  }
  if (predictionDashboardOpen) {
    loadPredictionData();
  }
}, 30000);

// Disaster Prediction System
function loadPredictionData() {
  const predictionContent = document.getElementById('prediction-content');
  
  // Prediction data based on weather patterns, historical data, and risk factors
  const predictions = [
    {
      type: 'flood',
      severity: 'warning',
      location: 'Gorakhpur, UP',
      icon: 'fas fa-water',
      description: 'Flood risk in 48-72 hours',
      probability: '75%',
      timeframe: '2-3 days'
    },
    {
      type: 'heatwave',
      severity: 'critical',
      location: 'Allahabad, UP',
      icon: 'fas fa-thermometer-full',
      description: 'Extreme heat expected',
      probability: '90%',
      timeframe: '24-48 hours'
    },
    {
      type: 'storm',
      severity: 'warning',
      location: 'Lucknow, UP',
      icon: 'fas fa-wind',
      description: 'Thunderstorm likely',
      probability: '65%',
      timeframe: '12-24 hours'
    },
    {
      type: 'normal',
      severity: 'safe',
      location: 'Varanasi, UP',
      icon: 'fas fa-check-circle',
      description: 'Low disaster risk',
      probability: '10%',
      timeframe: 'Next 7 days'
    },
    {
      type: 'earthquake',
      severity: 'warning',
      location: 'Ayodhya, UP',
      icon: 'fas fa-house-damage',
      description: 'Seismic activity detected',
      probability: '35%',
      timeframe: '1-2 weeks'
    }
  ];
  
  predictionContent.innerHTML = predictions.map(prediction => `
    <div class="alert-item ${prediction.severity} prediction-item">
      <div class="alert-icon">
        <i class="${prediction.icon}" style="color: ${getSeverityColor(prediction.severity)}"></i>
      </div>
      <div class="alert-details">
        <div class="alert-title">${prediction.description}</div>
        <div class="alert-location">${prediction.location}</div>
        <div class="prediction-meta">
          <span class="probability">Risk: ${prediction.probability}</span>
          <span class="timeframe">ETA: ${prediction.timeframe}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Emergency news data
const emergencyNews = [
  "🚨 Flood warning issued for Gorakhpur district - Evacuation in progress",
  "⚡ Power restored in earthquake-affected areas of Lucknow",
  "🔥 Fire department successfully contained industrial blaze in Kanpur",
  "🌊 Water levels receding in Varanasi - Relief operations continue",
  "🚑 Medical teams deployed to cyclone-hit coastal regions",
  "📡 Emergency communication towers restored in Ayodhya",
  "🛡️ Rescue operations completed - 150 people evacuated safely",
  "⛑️ Emergency shelters operational in 12 districts across UP",
  "🚁 Helicopter rescue missions ongoing in flood-affected areas",
  "📞 Emergency helplines receiving 500+ calls per hour"
];

let currentNewsIndex = 0;

// Initialize news feed
function initializeNewsFeed() {
  const newsElement = document.getElementById('news-ticker');
  
  function updateNews() {
    const newsText = emergencyNews[currentNewsIndex];
    if (newsElement) {
      newsElement.innerHTML = `<div class="news-item">${newsText}</div>`;
    }
    currentNewsIndex = (currentNewsIndex + 1) % emergencyNews.length;
  }
  
  // Initial update
  updateNews();
  
  // Update every 20 seconds to match animation duration
  setInterval(updateNews, 20000);
}

// Initialize news feed when page loads
window.addEventListener('load', function() {
  setTimeout(initializeNewsFeed, 2000);
});

// Voice SOS Activation
let voiceRecognition = null;
let isVoiceActive = false;

function initializeVoiceRecognition() {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    voiceRecognition = new SpeechRecognition();
    
    voiceRecognition.continuous = true;
    voiceRecognition.interimResults = false;
    voiceRecognition.lang = 'en-US';
    
    voiceRecognition.onresult = function(event) {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      
      if (transcript.includes('crisis emergency') || 
          transcript.includes('help me') || 
          transcript.includes('emergency') ||
          transcript.includes('sos')) {
        
        // Trigger SOS automatically
        if (currentPage === 'victim' && selectedDisasterType) {
          sendSOS();
          updateVoiceStatus('Voice SOS activated! Emergency alert sent.', 'success');
        } else {
          updateVoiceStatus('Please select emergency type first.', 'error');
        }
      }
    };
    
    voiceRecognition.onerror = function(event) {
      updateVoiceStatus('Voice recognition error. Please try again.', 'error');
    };
    
    return true;
  }
  return false;
}

function toggleVoiceActivation() {
  const voiceBtn = document.getElementById('voice-toggle');
  const voiceIcon = document.getElementById('voice-icon');
  const voiceText = document.getElementById('voice-text');
  const voiceStatus = document.getElementById('voice-status');
  
  if (!isVoiceActive) {
    if (!voiceRecognition && !initializeVoiceRecognition()) {
      updateVoiceStatus('Voice recognition not supported in this browser.', 'error');
      return;
    }
    
    // Start voice recognition
    voiceRecognition.start();
    isVoiceActive = true;
    
    voiceBtn.classList.add('listening');
    voiceIcon.className = 'fas fa-microphone-slash';
    voiceText.textContent = 'Stop Voice SOS';
    
    updateVoiceStatus('Listening for emergency commands...', 'listening');
    
  } else {
    // Stop voice recognition
    voiceRecognition.stop();
    isVoiceActive = false;
    
    voiceBtn.classList.remove('listening');
    voiceIcon.className = 'fas fa-microphone';
    voiceText.textContent = 'Enable Voice SOS';
    
    updateVoiceStatus('Voice SOS deactivated.', 'normal');
  }
}

function updateVoiceStatus(message, type) {
  const voiceStatus = document.getElementById('voice-status');
  
  voiceStatus.textContent = message;
  voiceStatus.className = 'voice-status show';
  
  if (type === 'listening') {
    voiceStatus.classList.add('listening');
  } else if (type === 'success') {
    voiceStatus.style.background = 'rgba(16, 185, 129, 0.1)';
    voiceStatus.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    voiceStatus.style.color = '#10b981';
  } else if (type === 'error') {
    voiceStatus.style.background = 'rgba(239, 68, 68, 0.1)';
    voiceStatus.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    voiceStatus.style.color = '#ef4444';
  }
  
  // Auto-hide after 5 seconds for success/error messages
  if (type === 'success' || type === 'error') {
    setTimeout(() => {
      voiceStatus.classList.remove('show');
    }, 5000);
  }
}

// Login Slider Functions
function toggleLoginSlider() {
  const slider = document.getElementById('login-slider');
  const overlay = document.getElementById('slider-overlay');
  
  if (slider.classList.contains('active')) {
    slider.classList.remove('active');
    overlay.classList.remove('active');
  } else {
    slider.classList.add('active');
    overlay.classList.add('active');
  }
}

function showLoginTab(type) {
  document.querySelectorAll('.login-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.login-section').forEach(section => section.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById(type + '-login').classList.add('active');
}

function handleVictimLogin(event) {
  event.preventDefault();
  const phone = document.getElementById('victim-phone').value;
  const pin = document.getElementById('victim-pin').value;
  
  if (pin === '1234') {
    currentLoggedUser = { name: 'Demo User', phone: phone };
    alert('Victim login successful! Redirecting to emergency portal...');
    toggleLoginSlider();
    showPage('victim');
    updateVictimNavigation();
  } else {
    alert('Invalid PIN. Use "1234" for demo access.');
  }
}

function handleRescueLogin(event) {
  event.preventDefault();
  const teamId = document.getElementById('rescue-id').value;
  const password = document.getElementById('rescue-password').value;
  
  if (teamId === 'rescue123' && password === 'admin') {
    currentLoggedUser = { name: 'Rescue Team Admin', id: teamId };
    alert('Rescue team login successful! Accessing command center...');
    toggleLoginSlider();
    showPage('rescue');
    updateRescueNavigation();
  } else {
    alert('Invalid credentials. Use ID "rescue123" and password "admin" for demo.');
  }
}

// Additional login slider functionality
function closeLoginSlider() {
  const slider = document.getElementById('login-slider');
  const overlay = document.getElementById('slider-overlay');
  
  if (slider) slider.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

// Close slider when clicking overlay
document.addEventListener('click', function(event) {
  if (event.target.id === 'slider-overlay') {
    closeLoginSlider();
  }
});

// Registration functionality
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

function showRegistrationPage() {
  closeLoginSlider();
  showPage('victim-registration');
}

function handleVictimRegistration(event) {
  event.preventDefault();
  
  const name = document.getElementById('reg-name').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const address = document.getElementById('reg-address').value.trim();
  const pin = document.getElementById('reg-pin').value;
  const confirmPin = document.getElementById('reg-confirm-pin').value;
  
  // Validation
  if (!name || !phone || !address || !pin || !confirmPin) {
    alert('Please fill in all required fields.');
    return;
  }
  
  if (!/^[0-9]{10}$/.test(phone)) {
    alert('Phone number must be exactly 10 digits.');
    return;
  }
  
  if (pin !== confirmPin) {
    alert('PINs do not match. Please try again.');
    return;
  }
  
  if (pin.length !== 4 || !/^[0-9]{4}$/.test(pin)) {
    alert('PIN must be exactly 4 digits.');
    return;
  }
  
  // Check if phone already exists
  if (registeredUsers.find(user => user.phone === phone)) {
    alert('Phone number already registered. Please use a different number or login.');
    return;
  }
  
  // Register user
  const newUser = {
    name: name,
    phone: phone,
    email: email,
    address: address,
    pin: pin,
    registeredAt: new Date().toISOString()
  };
  
  registeredUsers.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  
  alert(`Registration successful! Welcome ${name}. You can now login with your phone number and PIN.`);
  
  // Clear form
  document.getElementById('registration-form').reset();
  
  // Redirect to login
  toggleLoginSlider();
  showPage('home');
}

// Update victim login to check registered users

// Replace the original handleVictimLogin function
function handleVictimLogin(event) {
  event.preventDefault();
  const phone = document.getElementById('victim-phone').value;
  const pin = document.getElementById('victim-pin').value;
  
  if (!/^[0-9]{10}$/.test(phone)) {
    alert('Phone number must be exactly 10 digits.');
    return;
  }
  
  // Check registered users first
  const user = registeredUsers.find(u => u.phone === phone && u.pin === pin);
  
  if (user) {
    currentLoggedUser = user;
    alert(`Welcome back, ${user.name}! Redirecting to emergency portal...`);
    toggleLoginSlider();
    showPage('victim');
    updateVictimNavigation();
    return;
  }
  
  // Demo authentication fallback
  if (pin === '1234') {
    currentLoggedUser = { name: 'Demo User', phone: phone };
    alert(`Welcome! Victim access granted for ${phone}`);
    toggleLoginSlider();
    showPage('victim');
    updateVictimNavigation();
  } else {
    alert('Invalid credentials. Please check your phone number and PIN.');
  }
}

// Current logged in user
let currentLoggedUser = null;

// Logout functionality
function logoutVictim() {
  if (confirm('Are you sure you want to logout?')) {
    currentLoggedUser = null;
    updateVictimNavigation();
    showPage('home');
    alert('Logged out successfully!');
  }
}

function logoutRescue() {
  if (confirm('Are you sure you want to logout?')) {
    currentLoggedUser = null;
    updateRescueNavigation();
    showPage('home');
    alert('Logged out successfully!');
  }
}

// Update navigation based on login status
function updateVictimNavigation() {
  const userInfo = document.getElementById('victim-user-info');
  const logoutBtn = document.getElementById('victim-logout-btn');
  
  if (currentLoggedUser && userInfo && logoutBtn) {
    userInfo.innerHTML = `<i class="fas fa-user"></i> ${currentLoggedUser.name || 'User'}`;
    userInfo.style.display = 'flex';
    logoutBtn.style.display = 'block';
  } else if (userInfo && logoutBtn) {
    userInfo.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
}

function updateRescueNavigation() {
  const userInfo = document.getElementById('rescue-user-info');
  const logoutBtn = document.getElementById('rescue-logout-btn');
  
  if (currentLoggedUser && userInfo && logoutBtn) {
    userInfo.innerHTML = `<i class="fas fa-shield-alt"></i> ${currentLoggedUser.name || 'Rescue Team'}`;
    userInfo.style.display = 'flex';
    logoutBtn.style.display = 'block';
  } else if (userInfo && logoutBtn) {
    userInfo.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
}

