// ========== NAVIGATION FUNCTIONALITY ==========

// Get DOM elements
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Handle scroll effect on navbar
window.addEventListener("scroll", () => {
	if (window.scrollY > 50) {
		navbar.classList.add("scrolled");
	} else {
		navbar.classList.remove("scrolled");
	}
});

// Mobile menu toggle
hamburger.addEventListener("click", () => {
	navMenu.classList.toggle("active");
	hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		navMenu.classList.remove("active");
		hamburger.classList.remove("active");
	});
});

// ========== SMOOTH SCROLLING ==========
navLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();

		const targetId = link.getAttribute("href");
		const targetSection = document.querySelector(targetId);

		if (targetSection) {
			const offsetTop = targetSection.offsetTop - 80;

			window.scrollTo({
				top: offsetTop,
				behavior: "smooth",
			});
		}
	});
});

// ========== ACTIVE SECTION HIGHLIGHTING ==========
const sections = document.querySelectorAll("section[id]");

function highlightNavigation() {
	const scrollY = window.pageYOffset;

	sections.forEach((section) => {
		const sectionHeight = section.offsetHeight;
		const sectionTop = section.offsetTop - 100;
		const sectionId = section.getAttribute("id");
		const correspondingLink = document.querySelector(
			`.nav-link[href="#${sectionId}"]`,
		);

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			correspondingLink?.classList.add("active");
		} else {
			correspondingLink?.classList.remove("active");
		}
	});
}

window.addEventListener("scroll", highlightNavigation);

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = "1";
			entry.target.style.transform = "translateY(0)";
		}
	});
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
	".work-card, .skill-card, .info-card",
);
animateElements.forEach((el) => {
	el.style.opacity = "0";
	el.style.transform = "translateY(30px)";
	el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
	observer.observe(el);
});

// ========== SCROLL INDICATOR ==========
const scrollIndicator = document.querySelector(".scroll-indicator");

if (scrollIndicator) {
	scrollIndicator.addEventListener("click", (e) => {
		e.preventDefault();
		const aboutSection = document.getElementById("about");
		aboutSection.scrollIntoView({ behavior: "smooth" });
	});

	// Hide scroll indicator when scrolling past hero
	window.addEventListener("scroll", () => {
		if (window.scrollY > window.innerHeight / 2) {
			scrollIndicator.style.opacity = "0";
		} else {
			scrollIndicator.style.opacity = "1";
		}
	});
}

// ========== HERO SECTION ANIMATIONS ==========
window.addEventListener("load", () => {
	const heroText = document.querySelector(".hero-text");
	const heroImage = document.querySelector(".hero-image");

	if (heroText) {
		heroText.style.animation = "fadeInUp 1s ease forwards";
	}

	if (heroImage) {
		heroImage.style.animation = "fadeInRight 1s ease 0.3s forwards";
		heroImage.style.opacity = "0";
	}
});

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .nav-link.active {
        color: var(--secondary) !important;
    }
`;
document.head.appendChild(style);

// ========== CONTACT FORM HANDLERS ==========
const contactMethods = document.querySelectorAll(".contact-method a");

contactMethods.forEach((method) => {
	method.addEventListener("click", (e) => {
		console.log("Contact method clicked:", e.target.textContent);
	});
});

// ========== SOCIAL LINKS TRACKING ==========
const socialLinks = document.querySelectorAll(
	".social-icon, .contact-social-icon",
);

socialLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		if (link.getAttribute("href") === "#") {
			e.preventDefault();
			console.log("Social link clicked - Add your social media URL here");
			alert("Please add your social media URL to this link!");
		}
	});
});

// ========== PERFORMANCE OPTIMIZATION ==========
function debounce(func, wait = 10) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

const debouncedHighlight = debounce(highlightNavigation, 10);
window.addEventListener("scroll", debouncedHighlight);

// ========== ACCESSIBILITY ENHANCEMENTS ==========
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && navMenu.classList.contains("active")) {
		navMenu.classList.remove("active");
		hamburger.classList.remove("active");
	}
});

// ========== LOADING STATE ==========
window.addEventListener("load", () => {
	document.body.classList.add("loaded");
	console.log("Portfolio loaded successfully!");
});

// ========== CONSOLE WELCOME MESSAGE ==========
console.log(
	"%c👋 Welcome to Ugochi's Portfolio!",
	"color: #BEA57D; font-size: 20px; font-weight: bold;",
);
console.log(
	"%cBuilt with HTML, CSS, and JavaScript",
	"color: #3B2516; font-size: 14px;",
);
console.log(
	"%cInterested in working together? Get in touch!",
	"color: #BEA57D; font-size: 14px;",
);

// ========== VIDEO SECTION ==========
const VDURATION = 5000;
const vcards = document.querySelectorAll(".vcard");
let vActive = null;

// Detect Safari/iOS — hover autoplay blocked without a user gesture
const isSafari =
	/^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
	/iPad|iPhone|iPod/.test(navigator.userAgent);

// Staggered scroll reveal
const vObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const card = entry.target;
				const delay = parseInt(card.dataset.vdelay || 0) * 160;
				setTimeout(() => card.classList.add("v-visible"), delay);
				vObserver.unobserve(card);
			}
		});
	},
	{ threshold: 0.12 },
);

vcards.forEach((c) => vObserver.observe(c));

// Mark video as ready (swap out placeholder)
function markVideoReady(v) {
	v.classList.add("v-loaded");
	v.closest(".vcard__media").classList.add("v-ready");
}

document.querySelectorAll(".vcard video").forEach((v) => {
	// Listen on multiple events — whichever fires first wins
	["loadedmetadata", "loadeddata", "canplay", "canplaythrough"].forEach((evt) => {
		v.addEventListener(evt, () => markVideoReady(v), { once: true });
	});
	// Already buffered before JS ran
	if (v.readyState >= 1) markVideoReady(v);
	// Force metadata fetch (in case preload was ignored by browser)
	v.load();
});

function vPlay(card) {
	const video = card.querySelector("video");
	if (!video || !video.src || video.src.endsWith("/")) return;

	const bar = card.querySelector(".vcard__bar");
	if (vActive && vActive !== card) vStop(vActive);
	vActive = card;
	card.classList.add("v-playing");
	video.currentTime = 0;

	// Wait for canplay if not buffered (common on Safari + remote CDN URLs)
	const doPlay = () => {
		video.play().catch(() => {
			// Autoplay blocked (Safari policy) — clean reset
			card.classList.remove("v-playing");
			if (vActive === card) vActive = null;
		});
	};

	if (video.readyState >= 3) {
		doPlay();
	} else {
		video.addEventListener("canplay", doPlay, { once: true });
	}

	let start = null;
	function step(ts) {
		if (!start) start = ts;
		const pct = Math.min(((ts - start) / VDURATION) * 100, 100);
		bar.style.width = pct + "%";
		if (ts - start < VDURATION) card._vRaf = requestAnimationFrame(step);
		else vStop(card);
	}
	card._vRaf = requestAnimationFrame(step);
}

function vStop(card) {
	const video = card.querySelector("video");
	const bar = card.querySelector(".vcard__bar");
	video.pause();
	card.classList.remove("v-playing");
	if (card._vRaf) cancelAnimationFrame(card._vRaf);
	bar.style.transition = "width 0.5s ease";
	bar.style.width = "0%";
	setTimeout(() => {
		bar.style.transition = "width 0.1s linear";
	}, 550);
	if (vActive === card) vActive = null;
}

vcards.forEach((card) => {
	// Click/tap always works on all browsers including Safari
	card.addEventListener("click", () => {
		card.classList.contains("v-playing") ? vStop(card) : vPlay(card);
	});

	// Hover-to-preview only on non-Safari desktop
	// Safari blocks muted autoplay on hover without a prior user gesture
	if (!isSafari) {
		let vHoverT;
		card.addEventListener("mouseenter", () => {
			vHoverT = setTimeout(() => {
				if (!card.classList.contains("v-playing")) vPlay(card);
			}, 700);
		});
		card.addEventListener("mouseleave", () => clearTimeout(vHoverT));
	}
});
