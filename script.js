// DEMO VERSION - Constant Purchase Prompts
let popupInterval;
let popupCount = 0;

function showPurchasePopup() {
  const popup = document.getElementById('purchasePopup');
  popup.style.display = 'flex';
  popupCount++;
}

function closePurchasePopup() {
  const popup = document.getElementById('purchasePopup');
  popup.style.display = 'none';
}

// Show popup every 30 seconds
setInterval(showPurchasePopup, 30000);

// Show first popup after 2 seconds
setTimeout(showPurchasePopup, 2000);

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
  "You're making the bunny cry! 😢 Please say yes?",
  "What about for a strawberry matcha? 🍓🍵",
  "No you can't say no. 💖",
];

// Keep Yes button centered visually and make it grow
yesButton.addEventListener("click", () => {
  // Make character super excited and happy
  character.className = "character excited kissing";
  messageElement.textContent =
    "YAY!! 💖 Now pick a mystery box to reveal your gift!";
  messageElement.style.fontSize = "1.3rem";
  messageElement.style.color = "#ff2f6d";

  // Hide both buttons after clicking Yes
  noButton.style.display = "none";
  yesButton.style.display = "none";

  // Show mystery boxes
  const mysteryBoxes = document.getElementById("mysteryBoxes");
  mysteryBoxes.style.display = "block";
  setTimeout(() => {
    mysteryBoxes.classList.add("show");
  }, 100);

  // Hide the bunny character
  character.style.opacity = "0";
  character.style.transform = "translateX(-50%) scale(0.5)";
  setTimeout(() => {
    character.style.display = "none";
  }, 500);

  // Reset the counter so clicking No again restarts the funny messages
  noClickCount = 0;
});

// Handle mystery box selection
const mysteryBoxesEl = document.querySelectorAll(".mystery-box");
mysteryBoxesEl.forEach((box) => {
  box.addEventListener("click", function () {
    const giftNum = this.dataset.gift;
    const selectedBox = this;

    // Prevent multiple clicks
    mysteryBoxesEl.forEach((b) => (b.style.pointerEvents = "none"));

    // Hide other boxes
    mysteryBoxesEl.forEach((otherBox) => {
      if (otherBox !== selectedBox) {
        otherBox.style.opacity = "0";
        otherBox.style.transform = "scale(0.5)";
      }
    });

    // Move selected box to center
    setTimeout(() => {
      const boxesContainer = document.querySelector(".boxes-container");
      const rect = selectedBox.getBoundingClientRect();
      const containerRect = boxesContainer.getBoundingClientRect();

      // Calculate center of viewport
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate box center
      const boxCenterX = rect.left + rect.width / 2;
      const boxCenterY = rect.top + rect.height / 2;

      // Calculate translation needed
      const translateX = centerX - boxCenterX;
      const translateY = centerY - boxCenterY;

      selectedBox.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.5)`;
      selectedBox.style.zIndex = "1000";
    }, 300);

    // Open the box with animation
    setTimeout(() => {
      this.classList.add("opening");
    }, 1000);

    // Messages for each box
    const messages = {
      1: {
        name: "My Beautiful Valentine",
        text: [
          "You are the sunshine that brightens my darkest days.",
          "Every smile you give me is a treasure I hold close to my heart.",
          "I am so grateful to have you in my life. You complete me.",
        ],
      },
      2: {
        name: "My Love",
        text: [
          "From the moment I met you, I knew you were special.",
          "Your love has transformed my world into something magical.",
          "Thank you for being my everything. I love you more each day.",
        ],
      },
      3: {
        name: "My One & Only",
        text: [
          "You make my heart skip a beat every single time I see you.",
          "Being with you feels like coming home to where I belong.",
          "You are my greatest adventure and my sweetest dream come true.",
        ],
      },
    };

    setTimeout(() => {
      // Hide mystery boxes
      document.getElementById("mysteryBoxes").style.opacity = "0";

      setTimeout(() => {
        document.getElementById("mysteryBoxes").style.display = "none";

        // Show personalized love note
        const loveNoteContainer = document.getElementById("loveNoteContainer");
        const personName = document.getElementById("personName");
        const noteMessage = document.getElementById("noteMessage");

        personName.textContent = messages[giftNum].name;
        noteMessage.innerHTML = messages[giftNum].text
          .map((line) => `<p>${line}</p>`)
          .join("");

        loveNoteContainer.style.display = "flex";
        setTimeout(() => {
          loveNoteContainer.classList.add("show");
        }, 50);
      }, 600);
    }, 1200);
  });
});

// Close love note button
document.getElementById("noteCloseBtn").addEventListener("click", () => {
  const loveNoteContainer = document.getElementById("loveNoteContainer");
  loveNoteContainer.classList.remove("show");

  setTimeout(() => {
    loveNoteContainer.style.display = "none";

    // Show the bunny character again
    character.style.display = "block";
    setTimeout(() => {
      character.style.opacity = "1";
      character.style.transform = "translateX(-50%) scale(1)";
    }, 50);

    // Show final message
    messageElement.textContent =
      "You opened your heart and found love! 💖 Happy Valentine's Day!";
    character.className = "character excited kissing";

    // Trigger confetti
    createConfetti();
  }, 600);
});

// Move the No button to a random position and update messages/character
noButton.addEventListener("click", () => {
  noClickCount++;

  // On the 4th click, hide the No button and show final message
  if (noClickCount === 4) {
    messageElement.textContent = noMessages[4];
    noButton.style.display = "none";
    character.className = "character excited";
    return;
  }

  // Update message
  messageElement.textContent = noMessages[noClickCount];

  // Make character sad, and crying on the 2nd click
  if (noClickCount === 2) {
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
