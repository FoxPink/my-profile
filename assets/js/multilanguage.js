const savedLang = localStorage.getItem('i18nextLng') || 'en';

i18next.use(i18nextHttpBackend).init(
  {
    lng: savedLang,
    debug: false,
    backend: {
      loadPath: baseURL + "/locales/{{lng}}/translation.json",
    },
  },
  function (err, t) {
    updateContent();
  }
);

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    const attrData = element.getAttribute("data-i18n");

    if (attrData.startsWith("[")) {
      const closeBracketIndex = attrData.indexOf("]");
      if (closeBracketIndex !== -1) {
        const attributeName = attrData.substring(1, closeBracketIndex);
        const key = attrData.substring(closeBracketIndex + 1).trim();
        element.setAttribute(attributeName, i18next.t(key));
      }
    } else {
      element.innerHTML = i18next.t(attrData);
    }
  });
}

document
  .getElementById("languageSwitcher")
  .addEventListener("click", function () {
    const currentLang = i18next.language;
    const newLang = currentLang === "en" ? "vi" : "en";

    i18next.changeLanguage(newLang, function (err, t) {
      updateContent();

      localStorage.setItem('i18nextLng', newLang);

      const button = document.getElementById("languageSwitcher");
      if (newLang === "vi") {
        button.innerHTML = `<img id="flagIcon" src="${baseURL}locales/flag/united-states-of-america.png" alt="USA Flag" />`;
      } else {
        button.innerHTML = `<img id="flagIcon" src="${baseURL}locales/flag/vietnam.png" alt="Vietnam Flag" ">`;
      }
    });
  });
