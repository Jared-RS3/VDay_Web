// Grab references to the buttons and elements for interactivity
const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const messageElement = document.getElementById("message");
const character = document.getElementById("character");

// Track how many times the user clicks "No"
let noClickCount = 0;

// Array of progressively funnier and cuter messages when clicking "No"
const noMessages = [
  "You make my heart skip a beat. Will you be my Valentine?",
  "Babyyyy noooo 🥺 Are you sure?",
  "What if I kiss you more? 💋 Please?",
  "What about for a strawberry matcha? 🍓🍵",
  "I'll give you unlimited cuddles! 🤗",
  "The bunny is crying now... look what you did 😢",
  "Okay but... what if I throw in some boba too? 🧋",
  "I'll even let you pick the movie tonight 🎬",
  "Come onnnnn, you know you want to 🥹",
  "I'll do the dishes for a whole week! 🧼",
  "PLEASE PLEASE PLEASE PLEASE??? 🙏",
  "I'm running out of ideas here... 😅",
  "You're really gonna make me beg? Fine... PLEASE! 💝",
  "The bunny might actually pass out from sadness 😵",
  "Okay I'll buy you TWO strawberry matchas 🍓🍓",
];

// Keep Yes button centered visually and make it grow
yesButton.addEventListener("click", () => {
  // Make character super excited and happy
  character.className = "character excited kissing";
  messageElement.textContent =
    "YAY!! 💖 I knew you loved me! Best Valentine EVER!";
  messageElement.style.fontSize = "1.3rem";
  messageElement.style.color = "#ff2f6d";

  // Hide both buttons after clicking Yes
  noButton.style.display = "none";
  yesButton.style.display = "none";

  // Reset the counter so clicking No again restarts the funny messages
  noClickCount = 0;

  // Add confetti effect
  createConfetti();
});

// Move the No button to a random position and update messages/character
noButton.addEventListener("click", () => {
  noClickCount++;

  // Loop through messages - cycle back to start after reaching the end
  const messageIndex = noClickCount % noMessages.length;
  messageElement.textContent = noMessages[messageIndex];

  // Make character sad, and crying from the 6th click onwards (when bunny starts crying)
  if (noClickCount >= 5) {
    character.className = "character sad crying";
  } else {
    character.className = "character sad";
  }

  // Make Yes button grow bigger each time (classic meme style)
  const newSize = 1.15 + noClickCount * 0.15;
  const newPadding = 16 + noClickCount * 4;
  yesButton.style.fontSize = `${newSize}rem`;
  
  // Check if on mobile
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // On mobile: only increase height (vertical padding), lock width
    yesButton.style.padding = `${newPadding}px 20px`;
    yesButton.style.width = "100%";
    yesButton.style.maxWidth = "100%";
  } else {
    // On desktop: normal growth
    yesButton.style.padding = `${newPadding}px ${newPadding * 2}px`;
  }

  // Calculate the usable viewport area for the button
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const padding = 15;
  const minX = padding;
  const maxX = window.innerWidth - buttonWidth - padding;
  const minY = padding;
  const maxY = window.innerHeight - buttonHeight - padding;

  // Pick random coordinates within safe viewport boundaries
  const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

  // Apply the random position with high z-index to stay visible
  noButton.style.position = "fixed";
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
  noButton.style.zIndex = "10001";

  // Shrink the No button slightly each time
  if (noClickCount > 3) {
    const shrinkSize = Math.max(0.6, 1 - noClickCount * 0.08);
    noButton.style.transform = `scale(${shrinkSize})`;
  }
});

// Confetti function for celebration
function createConfetti() {
  const colors = [
    "#ff2f6d",
    "#ff5c8a",
    "#ffb3d1",
    "#ffd4e5",
    "#ffea00",
    "#ff6b35",
  ];
  const confettiCount = 50;

  // Regular falling confetti
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-10px";
      confetti.style.borderRadius = "50%";
      confetti.style.zIndex = "1000";
      confetti.style.pointerEvents = "none";
      confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }

  // Fireworks bursts
  const fireworksCount = 8;
  for (let i = 0; i < fireworksCount; i++) {
    setTimeout(() => {
      createFirework();
    }, i * 400);
  }

  // Add the falling animation
  if (!document.getElementById("confetti-style")) {
    const style = document.createElement("style");
    style.id = "confetti-style";
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
      @keyframes firework {
        0% {
          transform: translate(0, 0);
          opacity: 1;
        }
        100% {
          transform: translate(var(--tx), var(--ty));
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Create a single firework burst
function createFirework() {
  const colors = [
    "#ff2f6d",
    "#ff5c8a",
    "#ffb3d1",
    "#ffd4e5",
    "#ffea00",
    "#ff6b35",
  ];
  const particleCount = 30;
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * (window.innerHeight * 0.6) + 100;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.position = "fixed";
    particle.style.left = startX + "px";
    particle.style.top = startY + "px";
    particle.style.width = "8px";
    particle.style.height = "8px";
    particle.style.borderRadius = "50%";
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.zIndex = "1000";
    particle.style.pointerEvents = "none";
    particle.style.setProperty("--tx", tx + "px");
    particle.style.setProperty("--ty", ty + "px");
    particle.style.animation = `firework ${0.8 + Math.random() * 0.4}s ease-out forwards`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1500);
  }
}
