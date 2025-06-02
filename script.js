// Pages
const loaderPage = document.getElementById("loaderPage");
const quotesPage = document.getElementById("quotesPage");
const wishPage = document.getElementById("wishPage");
const galleryPage = document.getElementById("galleryPage");

// Buttons
const goToQuotesBtn = document.getElementById("goToQuotesBtn");
const toWishBtn = document.getElementById("toWishBtn");
const toGalleryBtn = document.getElementById("toGalleryBtn");
const backToWishBtn = document.getElementById("backToWishBtn");

// Timer Loader Variables
const progress = document.getElementById("progress");
const timerText = document.getElementById("timerText");
const totalDuration = 10; // seconds
let currentTime = totalDuration;
let timerInterval;

// Quotes
const quotes = [
  "Your smile? It's my favorite addiction — and the reason my heart races like crazy. 💓🔥",
  "Like the candles on this cake, you light up my life. 🎂✨",
  "With every year, you somehow become even sexier — how do you do that? 😘🌹",
  "I cherish every moment we share together. To many more! 🥰",
  "Loving you is the most beautiful adventure — and I want to get lost in it forever. 🌍💗",
  "Each birthday with you feels like unwrapping love all over again. You're the best gift, besti. 🎁🎀",
  "You make my world brighter than any star. ⭐🌟",
  "Forever yours? Always. Because my heart signed that deal the day I met you. 💘🔥",
  "You're not just my dream girl… you're the one I never want to wake up from. Happy Birthday, gorgeous. 💕💋"
];

const quotesContainer = document.getElementById("quotesContainer");

// Birthday Cake animation control
const birthdayCake = document.getElementById("birthdayCake");

// Gallery Images & Compliments
const galleryGrid = document.getElementById("galleryGrid");

const galleryImages = [
  { src: "./img 0.jpg", compliment: "That smile of yours? It’s my favorite view and my daily dose of happiness! 😘🌸❤️" },
  { src: "./img 1.jpg", compliment: "Every moment with you is pure magic. ✨💖" },
  { src: "./img 2.jpg", compliment: "It's not just your looks — your heart is just as stunning. 💕🌟" },
  { src: "./img 3.jpg", compliment: "Life gave me many things, but you… you’re my forever favorite. 🌈💗" },
  { src: "./img 4.jpg", compliment: "With you, even silence feels like the sweetest melody. 🎶❤️‍🔥 " },
  { src: "./img 5.jpg", compliment: "💌 My Heart Smiles Because of You, Besti 💕" },
  { src: "./img 6.jpg", compliment: "💖 My Heart Found a Home in You" },
  { src: "./img 7.jpg", compliment: "You're My Favorite Forever 🌈" }
];

// Background Music
const bgMusic = document.getElementById("bgMusic");

// Confetti Setup
const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Confetti piece class
class ConfettiPiece {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = (Math.random() * 7) + 7;
    this.speed = (Math.random() * 2) + 1;
    this.angle = Math.random() * 2 * Math.PI;
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    this.spin = (Math.random() * 0.1) - 0.05;
  }
  update() {
    this.y += this.speed;
    this.angle += this.spin;
    if (this.y > confettiCanvas.height) {
      this.y = -this.size;
      this.x = Math.random() * confettiCanvas.width;
    }
  }
  draw() {
    confettiCtx.save();
    confettiCtx.translate(this.x, this.y);
    confettiCtx.rotate(this.angle);
    confettiCtx.fillStyle = this.color;
    confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    confettiCtx.restore();
  }
}

function createConfetti(num) {
  confettiPieces = [];
  for(let i=0; i<num; i++) {
    confettiPieces.push(new ConfettiPiece());
  }
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(piece => {
    piece.update();
    piece.draw();
  });
  requestAnimationFrame(animateConfetti);
}

// Animate quotes one by one
function showQuotesSequentially() {
  quotesContainer.innerHTML = "";
  let i = 0;
  function showNext() {
    if(i < quotes.length) {
      const q = document.createElement("p");
      q.classList.add("quote");
      q.style.animationDelay = "0.3s";
      q.textContent = quotes[i];
      quotesContainer.appendChild(q);
      i++;
      setTimeout(showNext, 3000); // 3 seconds per quote
    } else {
      toWishBtn.style.display = "inline-block";
      startConfetti();
    }
  }
  showNext();
}

// Loader timer and progress
function startLoader() {
  currentTime = totalDuration;
  timerText.textContent = currentTime;
  progress.style.strokeDashoffset = 339.292;
  goToQuotesBtn.style.display = "none";

  timerInterval = setInterval(() => {
    currentTime--;
    timerText.textContent = currentTime > 0 ? currentTime : 0;
    // Calculate stroke offset
    let offset = 339.292 * (currentTime / totalDuration);
    progress.style.strokeDashoffset = offset;

    if(currentTime <= 0) {
      clearInterval(timerInterval);
      goToQuotesBtn.style.display = "inline-block";
      bgMusic.play();
    }
  }, 1000);
}

// Page Transitions
function showPage(page) {
  // Hide all pages
  [loaderPage, quotesPage, wishPage, galleryPage].forEach(p => p.classList.remove("active"));
  // Show selected
  page.classList.add("active");
}

// Birthday Cake Animation: fade in
function showCakeAndQuotes() {
  birthdayCake.style.opacity = 0;
  birthdayCake.style.transform = "translateY(30px)";
  birthdayCake.style.transition = "opacity 1.2s ease, transform 1.2s ease";
  setTimeout(() => {
    birthdayCake.style.opacity = 1;
    birthdayCake.style.transform = "translateY(0)";
  }, 100);
  showQuotesSequentially();
}

// Gallery with compliments
function setupGallery() {
  galleryGrid.innerHTML = "";
  galleryImages.forEach(({src, compliment}, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Memory ${i+1}`;
    img.dataset.compliment = compliment;
    galleryGrid.appendChild(img);
  });
}

function createTooltip() {
  let tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  document.body.appendChild(tooltip);
  return tooltip;
}

const tooltip = createTooltip();

// Combined touch and click event for gallery
galleryGrid.addEventListener("click", (e) => {
  if(e.target.tagName === "IMG") {
    const img = e.target;
    const rect = img.getBoundingClientRect();
    tooltip.textContent = img.dataset.compliment;
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top}px`;
    tooltip.classList.add("show");
    setTimeout(() => {
      tooltip.classList.remove("show");
    }, 3000);
  }
});

// Confetti control
function startConfetti() {
  createConfetti(100);
  animateConfetti();
}

// Button events
goToQuotesBtn.addEventListener("click", () => {
  showPage(quotesPage);
  showCakeAndQuotes();
});

toWishBtn.addEventListener("click", () => {
  showPage(wishPage);
});

toGalleryBtn.addEventListener("click", () => {
  showPage(galleryPage);
});

backToWishBtn.addEventListener("click", () => {
  showPage(wishPage);
});

// Viewport setup for mobile devices
function setupViewport() {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      viewportMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    }
  }
  
  // Prevent zooming on double-tap
  document.addEventListener('dblclick', function(e) {
    e.preventDefault();
  }, { passive: false });
}

// Initialize everything
function init() {
  setupViewport();
  setupGallery();
  startLoader();
}

// Start the application
init();

// Replace all bgMusic.play() calls with this:
function playBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Show play button if autoplay fails
            const playButton = document.createElement('button');
            playButton.className = 'music-play-button';
            playButton.innerHTML = '🔊 Play Music';
            playButton.onclick = () => {
                bgMusic.play();
                playButton.remove();
            };
            document.body.appendChild(playButton);
        });
    }
}

// Call this after user interaction (like clicking the heart)
playBackgroundMusic();