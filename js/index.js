// Create floating particles
function createParticles() {
  const particlesContainer =
    document.getElementById("particles") || document.querySelector(".particles");

  // Skip silently when this script runs on pages without a particle container.
  if (!particlesContainer) {
    return;
  }

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = "-10px";
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;

    particlesContainer.appendChild(particle);
  }
}

// Track wrong attempts
let wrongAttempts = 0;

// Custom messages for each wrong attempt
const popupMessages = [
  {
    icon: "🦋",
    title: "Not Quite!",
    message: "That's not the magic word... but you're getting warmer!",
    hint: "💡 Hint: Think of something delicate, beautiful, and graceful that flies...",
  },
  {
    icon: "💭",
    title: "Try Again!",
    message: "Hmm, still not right. But I believe in you!",
    hint: '🌸 Hint: It starts with "B" and represents transformation and beauty...',
  },
  {
    icon: "💕",
    title: "Almost There!",
    message: "You're so close! Don't give up now!",
    hint: '✨ Hint: Remember the title? "Whispers of a ____"?',
  },
  {
    icon: "🌺",
    title: "Keep Going!",
    message: "The answer is closer than you think...",
    hint: '🦋 Final Hint: It\'s literally in the project name! Capital "B"...',
  },
  {
    icon: "🎀",
    title: "One More Try!",
    message: "You can do this! The password is right there!",
    hint: "💖 Last Hint: B-u-t-t-e-r-f-l-y (yes, with capital B!)",
  },
];

// Show custom popup
function showCustomPopup() {
  wrongAttempts++;
  const messageIndex = Math.min(wrongAttempts - 1, popupMessages.length - 1);
  const popup = popupMessages[messageIndex];

  const popupIcon = document.getElementById("popupIcon");
  const popupTitle = document.getElementById("popupTitle");
  const popupMessage = document.getElementById("popupMessage");
  const popupHint = document.getElementById("popupHint");
  const attemptCounter = document.getElementById("attemptCounter");
  const popupOverlay = document.getElementById("popupOverlay");

  if (
    !popupIcon ||
    !popupTitle ||
    !popupMessage ||
    !popupHint ||
    !attemptCounter ||
    !popupOverlay
  ) {
    return;
  }

  popupIcon.textContent = popup.icon;
  popupTitle.textContent = popup.title;
  popupMessage.textContent = popup.message;
  popupHint.textContent = popup.hint;
  attemptCounter.textContent = `Attempt ${wrongAttempts}`;

  popupOverlay.classList.add("show");
}

// Close popup
function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  const passwordInput = document.getElementById("passwordInput");

  if (popupOverlay) {
    popupOverlay.classList.remove("show");
  }

  if (passwordInput) {
    passwordInput.focus();
  }
}

// Update time and date
function updateTime() {
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");

  // Skip silently when this script is loaded outside the lock screen page.
  if (!timeElement || !dateElement) {
    return;
  }

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  timeElement.textContent = `${hours}:${minutes}`;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString("en-US", options);
  dateElement.textContent = dateString;
}

// Unlock screen animation
function unlockScreen() {
  const passwordInput = document.getElementById("passwordInput");
  const errorMessage = document.getElementById("errorMessage");
  const password = passwordInput.value;

  // Check if password is correct
  if (password === "Butterfly") {
    const lockScreen = document.getElementById("lockScreen");
    lockScreen.classList.add("unlocking");

    setTimeout(() => {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "home.html";
      }, 800);
    }, 400);
  } else {
    // Show custom popup
    showCustomPopup();
    passwordInput.classList.add("shake");
    passwordInput.value = "";

    // Remove shake animation after it completes
    setTimeout(() => {
      passwordInput.classList.remove("shake");
    }, 500);
  }
}

// Handle Enter key press in password input
function handleKeyPress(event) {
  if (event.key === "Enter") {
    unlockScreen();
  }
}

// Toggle password visibility
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("passwordInput");
  const toggleButton = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");

  // Safety check
  if (!passwordInput || !toggleButton || !eyeIcon) {
    console.error("Password toggle elements not found");
    return;
  }

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.textContent = "👁️";
    toggleButton.classList.add("active");
  } else {
    passwordInput.type = "password";
    eyeIcon.textContent = "👁️";
    toggleButton.classList.remove("active");
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  createParticles();

  const hasTimeDisplay =
    document.getElementById("time") && document.getElementById("date");
  if (hasTimeDisplay) {
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Focus on password input (with safety check)
  const passwordInput = document.getElementById("passwordInput");
  if (passwordInput) {
    passwordInput.focus();
  }
});
