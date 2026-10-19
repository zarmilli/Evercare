const navbar = document.querySelector(".navbar");
function updateNavbar() {
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", updateNavbar);
updateNavbar();

const aboutPageImages = document.querySelectorAll("body.about-page img");
function updateAboutImageParallax() {
  aboutPageImages.forEach(image => {
    const rect = image.getBoundingClientRect();
    const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
    const scale = 1 + progress * 0.18;

    image.style.setProperty("--about-parallax-scale", scale.toFixed(3));
  });
}

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateAboutImageParallax);
}, { passive: true });
window.addEventListener("resize", updateAboutImageParallax);
window.addEventListener("load", updateAboutImageParallax);
updateAboutImageParallax();

const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");
const dropdowns = document.querySelectorAll(".mega-dropdown");
function closeAllDropdowns() {
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove("active");
  });
  dropdownTriggers.forEach(trigger => {
    trigger.classList.remove("active");
    trigger.setAttribute("aria-expanded", "false");
  });
}
function openDropdown(trigger) {
  const dropdownId = trigger.getAttribute("data-dropdown");
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
  const alreadyOpen = dropdown.classList.contains("active");
  closeAllDropdowns();
  if (!alreadyOpen) {
    dropdown.classList.add("active");
    trigger.classList.add("active");
    trigger.setAttribute("aria-expanded", "true");
  }
}
dropdownTriggers.forEach(trigger => {
  trigger.addEventListener("click", event => {
    event.stopPropagation();
    openDropdown(trigger);
  });
});
dropdownTriggers.forEach(trigger => {
  trigger.addEventListener("mouseenter", () => {
    if (window.innerWidth > 800) {
      openDropdown(trigger);
    }
  });
});
dropdowns.forEach(dropdown => {
  dropdown.addEventListener("mouseenter", () => {
    if (window.innerWidth > 800) {
      dropdown.classList.add("active");
    }
  });
});
const header = document.querySelector(".site-header");
header.addEventListener("mouseleave", () => {
  if (window.innerWidth > 800) {
    closeAllDropdowns();
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest(".site-header")) {
    closeAllDropdowns();
  }
});
const mobileMenuButton = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");
mobileMenuButton.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-open");
  const isOpen = navLinks.classList.contains("mobile-open");
  mobileMenuButton.setAttribute("aria-expanded", isOpen);
});

const heroImages = document.querySelectorAll(".hero-image, .hero-image-card img");

function updateHeroParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const heroRect = hero.getBoundingClientRect();
  const progress = Math.min(Math.max(-heroRect.top / heroRect.height, 0), 1);
  const offset = -progress * heroRect.height * 0.14;
  const scale = 1.08 + progress * 0.14;

  heroImages.forEach(image => {
    image.style.setProperty("--parallax-shift", `${offset}px`);
    image.style.setProperty("--parallax-scale", scale.toFixed(3));
  });
}

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateHeroParallax);
}, { passive: true });
window.addEventListener("load", updateHeroParallax);
window.addEventListener("resize", updateHeroParallax);

document.querySelectorAll(".mega-dropdown a").forEach(link => {
  link.addEventListener("click", () => {
    closeAllDropdowns();
  });
});

const aboutParallax = document.querySelector(".about-parallax");
const aboutImage = document.querySelector(".about-parallax-image");
const aboutContent = document.querySelector(".about-content");

if (aboutContent) {
  if ("IntersectionObserver" in window) {
    aboutContent.classList.add("about-content-reveal");

    const aboutContentObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    aboutContentObserver.observe(aboutContent);
  } else {
    aboutContent.classList.add("is-visible");
  }
}

const servicesRevealTargets = document.querySelectorAll(".services-header, .service-card, .services-footer");
servicesRevealTargets.forEach((element, index) => {
  element.style.transitionDelay = `${index * 90}ms`;

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealObserver.observe(element);
  } else {
    element.classList.add("is-visible");
  }
});

const serviceCards = document.querySelectorAll(".service-card");
function updateServiceParallax() {
  serviceCards.forEach(card => {
    const image = card.querySelector("img");
    if (!image) return;

    const rect = card.getBoundingClientRect();
    const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
    const offset = (progress - 0.5) * 90;
    const scale = 1.08 + progress * 0.12;

    image.style.setProperty("--parallax-shift", `${offset}px`);
    image.style.setProperty("--parallax-scale", scale.toFixed(3));
  });
}

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateServiceParallax);
}, { passive: true });
window.addEventListener("resize", updateServiceParallax);
window.addEventListener("load", updateServiceParallax);
updateServiceParallax();

function updateAboutParallax() {
  if (!aboutParallax || !aboutImage) return;

  const rect = aboutParallax.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
  const movement = (progress - 0.5) * 60;

  aboutImage.style.transform = `translateY(${movement}%)`;
}

window.addEventListener("scroll", updateAboutParallax, { passive: true });
window.addEventListener("resize", updateAboutParallax);
updateAboutParallax();

const useCaseImages = document.querySelectorAll(".use-case-image");
function updateUseCaseParallax() {
  useCaseImages.forEach(image => {
    const card = image.closest(".use-case-card");
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const movement = (progress - 0.5) * 70;

    image.style.transform = `translateY(${movement}px)`;
  });
}

const faqParallaxImage = document.querySelector(".faq-parallax-image");
function updateFAQParallax() {
  if (!faqParallaxImage) return;

  const card = faqParallaxImage.closest(".faq-intro-card");
  const rect = card.getBoundingClientRect();
  const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
  const movement = (progress - 0.5) * 70;

  faqParallaxImage.style.transform = `translateY(${movement}px)`;
}

const finalCtaImage = document.querySelector(".final-cta-image");
function updateFinalCtaParallax() {
  if (!finalCtaImage) return;

  const section = finalCtaImage.closest(".final-cta-section");
  if (!section) return;

  const rect = section.getBoundingClientRect();
  const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
  const movement = (progress - 0.5) * 80;

  finalCtaImage.style.transform = `translateY(${movement}px)`;
}

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateFAQParallax);
  window.requestAnimationFrame(updateFinalCtaParallax);
}, { passive: true });
window.addEventListener("resize", () => {
  updateFAQParallax();
  updateFinalCtaParallax();
});
window.addEventListener("load", () => {
  updateFAQParallax();
  updateFinalCtaParallax();
});
updateFAQParallax();
updateFinalCtaParallax();

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateUseCaseParallax);
}, { passive: true });
window.addEventListener("resize", updateUseCaseParallax);
window.addEventListener("load", updateUseCaseParallax);
updateUseCaseParallax();

const useCases = [
  {
    eyebrow:"BUSINESSES",
    title:"Your team is only as productive as your workspace allows.",
    image:"assets/useBusiness.jpg"
  },
  {
    eyebrow:"HOMES",
    title:"A cleaner home creates more room for what matters.",
    image:"assets/useHome.jpg"
  },
  {
    eyebrow:"EVENTS",
    title:"Make every occasion memorable. We'll take care of the aftermath.",
    image:"assets/useEvents.jpg"
  }
];

const useCaseContent = document.querySelector(".use-case-content");
const useCaseEyebrow = document.querySelector(".use-case-eyebrow");
const useCaseTitle = document.querySelector(".use-case-content h3");
const useCaseImage = document.querySelector(".use-case-image");
const useCaseDots = document.querySelectorAll(".use-case-dot");

if (useCaseContent && useCaseEyebrow && useCaseTitle && useCaseImage && useCaseDots.length) {
  let currentUseCase = 0;
  let useCaseTimer;

  function updateUseCase(index) {
    if (index === currentUseCase && useCaseContent.dataset.loaded) return;

    const nextUseCase = useCases[index];

    useCaseContent.classList.remove("is-entering");
    useCaseImage.classList.remove("is-entering");
    useCaseContent.classList.add("is-exiting");
    useCaseImage.classList.add("is-exiting");

    setTimeout(() => {
      useCaseEyebrow.textContent = nextUseCase.eyebrow;
      useCaseTitle.textContent = nextUseCase.title;
      useCaseImage.style.backgroundImage = `url("${nextUseCase.image}")`;

      useCaseContent.classList.remove("is-exiting");
      useCaseImage.classList.remove("is-exiting");

      void useCaseContent.offsetWidth;

      useCaseContent.classList.add("is-entering");
      useCaseImage.classList.add("is-entering");

      useCaseDots.forEach((dot,i) => {
        dot.classList.toggle("active",i === index);
      });

      currentUseCase = index;
      useCaseContent.dataset.loaded = "true";
    },350);
  }

  function nextUseCase() {
    updateUseCase((currentUseCase + 1) % useCases.length);
  }

  function startUseCaseTimer() {
    clearInterval(useCaseTimer);
    useCaseTimer = setInterval(nextUseCase,3000);
  }

  useCaseDots.forEach(dot => {
    dot.addEventListener("click",() => {
      const index = Number(dot.dataset.slide);
      if (index === currentUseCase) return;
      updateUseCase(index);
      startUseCaseTimer();
    });
  });

  updateUseCase(0);
  startUseCaseTimer();

  const useCasesRevealTargets = document.querySelectorAll(".use-cases-header, .use-cases-slider, .use-cases-controls");
  function updateUseCasesRevealState() {
    useCasesRevealTargets.forEach(target => {
      const rect = target.getBoundingClientRect();
      const shouldReveal = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      target.classList.toggle("is-visible", shouldReveal);
    });
  }

  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateUseCasesRevealState);
  }, { passive: true });
  window.addEventListener("resize", updateUseCasesRevealState);
  updateUseCasesRevealState();
  setTimeout(updateUseCasesRevealState, 80);
}

const bookingForm = document.querySelector("#evercare-booking-form");

if (bookingForm) {
  const bookingService = document.querySelector("#booking-service");
  const bookingBudget = document.querySelector("#booking-budget");
  const bookingDate = document.querySelector("#booking-date");
  const bookingError = document.querySelector("#booking-error");
  const bookingNumber = "27685213715";

  const today = new Date();
  const localToday = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  bookingDate.min = localToday;

  document.querySelectorAll(".booking-pills").forEach(group => {
    const field = group.dataset.choiceGroup === "service" ? bookingService : bookingBudget;

    group.querySelectorAll(".booking-pill").forEach(pill => {
      pill.addEventListener("click",() => {
        group.querySelectorAll(".booking-pill").forEach(option => {
          option.classList.remove("active");
          option.setAttribute("aria-pressed","false");
        });

        pill.classList.add("active");
        pill.setAttribute("aria-pressed","true");
        field.value = pill.dataset.value;
        bookingError.classList.remove("visible");
        bookingError.textContent = "";
      });
    });
  });

  bookingForm.addEventListener("submit",event => {
    event.preventDefault();
    bookingError.classList.remove("visible");
    bookingError.textContent = "";

    if (!bookingForm.reportValidity()) return;

    if (!bookingService.value || !bookingBudget.value) {
      bookingError.textContent = "Please select a service and budget range before continuing.";
      bookingError.classList.add("visible");
      return;
    }

    const dateValue = bookingDate.value;
    if (dateValue < localToday) {
      bookingError.textContent = "Please choose today or a future date.";
      bookingError.classList.add("visible");
      bookingDate.focus();
      return;
    }

    const firstName = document.querySelector("#booking-name").value.trim();
    const surname = document.querySelector("#booking-surname").value.trim();
    const property = document.querySelector("#booking-property").value;
    const rooms = document.querySelector("#booking-rooms").value;
    const timeValue = document.querySelector("#booking-time").value;
    const notes = document.querySelector("#booking-notes").value.trim();

    const [year,month,day] = dateValue.split("-").map(Number);
    const formattedDate = new Date(year,month-1,day).toLocaleDateString("en-ZA",{
      day:"numeric",
      month:"long",
      year:"numeric"
    });

    const [hours,minutes] = timeValue.split(":").map(Number);
    const formattedTime = new Date(2000,0,1,hours,minutes).toLocaleTimeString("en-ZA",{
      hour:"numeric",
      minute:"2-digit",
      hour12:true
    });

    const message = [
      "Hi! I was browsing through your website and found interest in booking a service. My details are:",
      "",
      `Name: ${firstName} ${surname}`,
      `Service required: ${bookingService.value}`,
      `Property type: ${property}`,
      `Number of rooms: ${rooms}`,
      `Budget range: ${bookingBudget.value}`,
      `Preferred date: ${formattedDate}`,
      `Preferred time: ${formattedTime}`,
      ...(notes ? [`Additional notes: ${notes}`] : [])
    ].join("\n");

    const whatsappURL = `https://wa.me/${bookingNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL,"_blank","noopener,noreferrer");
  });
}

const contactEnquiryForm = document.querySelector("#contact-enquiry-form");

if (contactEnquiryForm) {
  const preferredDate = contactEnquiryForm.querySelector("#enquiry-date");
  const today = new Date();
  preferredDate.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  contactEnquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactEnquiryForm.reportValidity()) return;

    const formValues = new FormData(contactEnquiryForm);
    const message = [
      "Hi EverCare, I'd like to send an enquiry:",
      "",
      `Name: ${formValues.get("name")}`,
      `Phone: ${formValues.get("phone")}`,
      `Email: ${formValues.get("email")}`,
      `Service: ${formValues.get("service")}`,
      `Location: ${formValues.get("location")}`,
      `Preferred date: ${formValues.get("date")}`,
      `Message: ${formValues.get("message")}`
    ].join("\n");

    const whatsappURL = `https://wa.me/27685213715?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}

document.querySelectorAll(".faq-question").forEach(button => {
  const answer = document.getElementById(button.getAttribute("aria-controls"));

  if (answer && button.getAttribute("aria-expanded") === "true") {
    answer.hidden = false;
    requestAnimationFrame(() => {
      answer.classList.add("is-open");
    });
  }

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const currentAnswer = document.getElementById(button.getAttribute("aria-controls"));

    document.querySelectorAll(".faq-question").forEach(otherButton => {
      otherButton.setAttribute("aria-expanded","false");
      const otherAnswer = document.getElementById(otherButton.getAttribute("aria-controls"));
      if (!otherAnswer) return;

      otherAnswer.classList.remove("is-open");
      otherAnswer.setAttribute("aria-hidden", "true");

      window.setTimeout(() => {
        if (!otherAnswer.classList.contains("is-open")) {
          otherAnswer.hidden = true;
        }
      }, 260);
    });

    if (!isExpanded && currentAnswer) {
      button.setAttribute("aria-expanded", "true");
      currentAnswer.hidden = false;
      currentAnswer.setAttribute("aria-hidden", "false");
      requestAnimationFrame(() => {
        currentAnswer.classList.add("is-open");
      });
      return;
    }

    button.setAttribute("aria-expanded", "false");
    if (currentAnswer) {
      currentAnswer.classList.remove("is-open");
      currentAnswer.setAttribute("aria-hidden", "true");
      window.setTimeout(() => {
        if (!currentAnswer.classList.contains("is-open")) {
          currentAnswer.hidden = true;
        }
      }, 260);
    }
  });
});

(() => {
  const wrapper = document.getElementById('evercare-fab-wrapper');
  const fab = document.getElementById('evercare-fab');
  const card = document.getElementById('evercare-fab-card');

  if (!wrapper || !fab || !card) return;

  const setOpen = (open) => {
    wrapper.classList.toggle('is-open', open);
    fab.setAttribute('aria-expanded', String(open));
    fab.setAttribute('aria-label', open ? 'Close contact options' : 'Open contact options');
    card.setAttribute('aria-hidden', String(!open));
  };

  fab.addEventListener('click', () => {
    setOpen(!wrapper.classList.contains('is-open'));
  });

  document.addEventListener('click', (event) => {
    if (!wrapper.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('load', () => {
    window.setTimeout(() => {
      wrapper.classList.add('is-visible');
    }, 5000);
  });

  // Close the card after selecting an on-page link.
  card.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
})();

(() => {
  const elements = document.querySelectorAll('.services-reveal');

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(element => element.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -35px 0px'
  });

  elements.forEach(element => observer.observe(element));
})();


(() => {
  const modal = document.getElementById('service-modal');
  const selector = document.getElementById('service-select');
  const selectedLabel = document.getElementById('selected-service');
  const estimatePrice = document.getElementById('estimate-price');
  const estimateUnit = document.getElementById('estimate-unit');
  const closeButtons = modal.querySelectorAll('[data-close-modal]');
  const options = modal.querySelectorAll('[data-service]');
  let previousFocus = null;

  if (!modal || !selector || !selectedLabel || !estimatePrice || !estimateUnit) return;

  function openModal() {
    previousFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    selector.setAttribute('aria-expanded', 'true');
    document.body.classList.add('service-modal-open');
    modal.querySelector('.service-modal-panel').focus();
  }

  function closeModal(restoreFocus = true) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    selector.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('service-modal-open');
    if (restoreFocus) (previousFocus || selector).focus();
  }

  selector.setAttribute('aria-expanded', 'false');
  selector.addEventListener('click', openModal);

  closeButtons.forEach(button => {
    button.addEventListener('click', () => closeModal());
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(item => item.classList.remove('is-selected'));
      option.classList.add('is-selected');

      selectedLabel.textContent = option.dataset.service;
      estimatePrice.textContent = option.dataset.price;
      estimateUnit.textContent = option.dataset.unit || 'Price estimate';

      closeModal();
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
