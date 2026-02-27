console.log("AI Web Solutions - Main Script Loaded");

const BACKEND_URL = "http://localhost:5000/api";

/* ==========================================
   FORM SUBMIT HELPER
========================================== */
function showSuccess(form) {
  const oldMessage = form.querySelector(".success-message, .error-banner");
  if (oldMessage) oldMessage.remove();

  const successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.innerText =
    "✅ Submitted successfully! Our team will contact you soon.";
  form.appendChild(successMessage);
  form.reset();

  setTimeout(() => successMessage.remove(), 4000);
}

function showFormError(form, message) {
  const oldMessage = form.querySelector(".success-message, .error-banner");
  if (oldMessage) oldMessage.remove();

  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-banner");
  errorMessage.style.color = "#f87171";
  errorMessage.style.marginTop = "10px";
  errorMessage.style.fontWeight = "bold";
  errorMessage.innerText = message;
  form.appendChild(errorMessage);

  setTimeout(() => errorMessage.remove(), 4000);
}

function showError(field, message) {
  field.style.border = "2px solid #f87171";

  const error = document.createElement("small");
  error.classList.add("error-message");
  error.style.color = "#f87171";
  error.style.display = "block";
  error.style.marginTop = "5px";
  error.innerText = message;

  field.parentNode.appendChild(error);
}

function getFormData(form) {
  const id = form.id;

  // home.html form
  if (id === "homeForm") {
    return {
      endpoint: `${BACKEND_URL}/create`,
      data: {
        name: form.querySelector("input[name='name']")?.value.trim(),
        email: form.querySelector("input[name='email']")?.value.trim(),
        description: form.querySelector("textarea[name='message']")?.value.trim(),
      },
    };
  }

  // contactus.html form
  if (id === "contactForm") {
    return {
      endpoint: `${BACKEND_URL}/create_contact`,
      data: {
        name: form.querySelector("input[name='name']")?.value.trim(),
        email: form.querySelector("input[name='email']")?.value.trim(),
        subject: form.querySelector("input[name='subject']")?.value.trim(),
        message: form.querySelector("textarea[name='message']")?.value.trim(),
      },
    };
  }

  // projectonboard.html form
  if (id === "projectForm") {
    return {
      endpoint: `${BACKEND_URL}/create_project`,
      data: {
        name: form.querySelector("input[name='name']")?.value.trim(),
        email: form.querySelector("input[name='email']")?.value.trim(),
        companyName: form.querySelector("input[name='company']")?.value.trim(),
        projectType: form.querySelector("select[name='projectType']")?.value,
        estimatedBudget: form.querySelector("select[name='Estimated Budjet (₹)']")?.value,
        others: form.querySelector("textarea[name='requirements']")?.value.trim(),
      },
    };
  }

  return null;
}

/* ==========================================
   DOM READY
========================================== */
document.addEventListener("DOMContentLoaded", function () {
  /* ==========================================
       FORM VALIDATION (All Forms)
    ========================================== */

  const forms = document.querySelectorAll(".contact-form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      const requiredFields = form.querySelectorAll(
        "input[required], textarea[required], select[required]",
      );

      // Remove old error messages
      form.querySelectorAll(".error-message").forEach((el) => el.remove());

      requiredFields.forEach((field) => {
        field.style.border = "";

        const value = field.value.trim();

        // 1️⃣ Required check first
        if (value === "") {
          showError(field, "This field is required");
          isValid = false;
          return;
        }

        // 2️⃣ Name validation
        if (field.name === "name") {
          const namePattern = /^[A-Za-z\s]{3,}$/;
          if (!namePattern.test(value)) {
            showError(field, "Name should contain only letters and at least 3 characters");
            isValid = false;
          }
        }

        // 3️⃣ Email validation
        if (field.type === "email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            showError(field, "Enter a valid email address");
            isValid = false;
          }
        }
      });

      // Password match validation
      const passwordFields = form.querySelectorAll("input[type='password']");
      if (passwordFields.length === 2) {
        if (passwordFields[0].value !== passwordFields[1].value) {
          showError(passwordFields[1], "Passwords do not match");
          isValid = false;
        }
      }

      if (!isValid) return;

      // Get form data and endpoint
      const formInfo = getFormData(form);

      if (!formInfo) {
        console.error("Form type not recognized");
        return;
      }

      // Submit button disable — double submit avoid
      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";
      }

      // API Call — success message only after 200
      fetch(formInfo.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInfo.data),
      })
        .then((res) => {
          if (res.ok) {
            showSuccess(form);
          } else {
            showFormError(form, "❌ Something went wrong. Please try again.");
          }
        })
        .catch(() => showFormError(form, "❌ Something went wrong. Please try again."))
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = submitBtn.getAttribute("data-label") || "Submit";
          }
        });
    });
  });

  /* ==========================================
       SMOOTH SCROLL (Anchor Links)
    ========================================== */

  const anchorLinks = document.querySelectorAll("a[href^='#']");

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  /* ==========================================
       ACTIVE NAVIGATION HIGHLIGHT
    ========================================== */

  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".main-nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active-link");
    }
  });

  // Magnetic effect for nav & CTA buttons
  const magneticElements = document.querySelectorAll(
    ".main-nav a, .primary-cta, .secondary-cta",
  );

  magneticElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = `translate(0, 0)`;
    });
  });

  const hero = document.querySelector(".hero-section");

  if (hero) {
    hero.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 40;
      const y = (window.innerHeight / 2 - e.pageY) / 40;
      hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    });
  }

  // Subtle body background parallax
  function updateBackground(x = 0, y = 0) {
    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  }

  updateBackground(0, 0);

  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 100;
    const y = (window.innerHeight / 2 - e.clientY) / 100;
    updateBackground(x, y);
  });

  // Soft spotlight follow
  const spotlight = document.querySelector(".cursor-spotlight");

  document.addEventListener("mousemove", (e) => {
    if (spotlight) {
      spotlight.style.left = e.clientX + "px";
      spotlight.style.top = e.clientY + "px";
    }
  });

  /* ===============================
   COUNTER ANIMATION
================================= */

  const counters = document.querySelectorAll(".counter");

  function runCounters() {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      let count = 0;

      const speed = 200;
      const increment = target / speed;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + "+";
        }
      };

      updateCount();
    });
  }

  const statsSection = document.querySelector(".stats-section");

  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(statsSection);
  }

  /* ===============================
   SCROLL REVEAL
================================= */

  const revealElements = document.querySelectorAll("section");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add("active");
      }
    });
  };

  revealElements.forEach((el) => el.classList.add("reveal"));
  window.addEventListener("scroll", revealOnScroll);

  /* ===============================
   PARTICLE BACKGROUND
================================= */

  const canvas = document.getElementById("particles-bg");

  if (canvas) {
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(139, 92, 246, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < 80; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });
  }

  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");
  const overlay = document.getElementById("navOverlay");

  if (hamburger && mainNav && overlay) {
    hamburger.addEventListener("click", () => {
      mainNav.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    overlay.addEventListener("click", () => {
      mainNav.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  }

  const scrollBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Preloader Hide
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 2000);
});