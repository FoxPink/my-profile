let baseURL = "";
if (
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
) {
  baseURL = "";
} else {
  baseURL = window.location.origin + window.location.pathname;
  baseURL = baseURL.replace("index.html", "");
}

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  // serviceID - templateID - #form - publicKey
  emailjs
    .sendForm(
      "service_qqqvl0d",
      "template_fmvq4tq",
      "#contact-form",
      "1LZe2-ZCFJRPgnHIR"
    )
    .then(
      () => {
        // Show sent message
        contactMessage.textContent = "Message sent successfully ✅";
        // Remove message after five seconds
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        // Clear input fields
        contactForm.reset();
      },
      () => {
        // Show error message
        contactMessage.textContent = "Message not sent (service error) ❌";
      }
    );
};

contactForm.addEventListener("submit", sendEmail);

/*=============== SHOW SCROLL UP ===============*/

const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};

window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        ".nav__list a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active-link");
    } else {
      sectionClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true // Animations repeat
});

sr.reveal(".perfil, .contact__form");
sr.reveal(".info", { origin: "left", delay: 800 });
sr.reveal(".skills", { origin: "left", delay: 1000 });
sr.reveal(".about", { origin: "right", delay: 1200 });
sr.reveal(".projects__card, .services__card, .experience__card", {
  interval: 100,
});

// Dark mode
const icons = {
  light: baseURL + "assets/img/dark-mode.png",
  dark: baseURL + "assets/img/sun-mode.png",
};
const themeSwitcher = document.getElementById("themeSwitcher");
const themeIcon = document.getElementById("themeIcon");

const currentTheme = localStorage.getItem("theme") || "light";
setTheme(currentTheme);

themeSwitcher.addEventListener("click", function () {
  const newTheme = document.body.classList.contains("dark-mode")
    ? "light"
    : "dark";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.src = icons.dark;
  } else {
    document.body.classList.remove("dark-mode");
    themeIcon.src = icons.light;
  }
}
