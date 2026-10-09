/*
  Magalie Joly Allaitement 64 — paramètres faciles à modifier.
  Centraliser ici les liens et coordonnées évite les modifications répétées.
*/
const SITE = {
  phoneDisplay: "06 23 39 11 86", // EDIT PHONE NUMBER HERE
  phoneHref: "tel:+33623391186", // EDIT PHONE NUMBER HERE
  email: "magalie.joly.allaitement@gmail.com", // EDIT EMAIL HERE
  bookingUrl: "https://lacteo.app/rdv/magaliejolyallaitement", // EDIT BOOKING LINK HERE
  googleReviewsUrl: "https://www.google.com/search?sca_esv=3e5594fd685e5dfa&hl=fr-FR&gl=fr&sxsrf=APpeQns88M8iBp6uF4PqKZ_Wfv01GPkE5w:1790019766520&q=Magalie+Joly+Consultante+en+lactation&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_7T_hO0gVVzGWizuv4htNMM_5OPP8eFVEAX-cm6x6mQr3ZQ9t7jf3sMs1aoKuovCZrB5QYQ%3D&uds=AJ5uw19l6acODsYY7j4lvSX88Bw4Fa76VZ6KyTvVcGQP2vQmRvQaSYdKN4Xjj0TVGrQbCZpuquh844a4AURBM9i9gQgIGW-kcAde_Hqke-xcIl7cAFi_yE0IPTvthiFOlEght2jKGwcLkAzcTiQXaKnCOJT90KrHQA&sa=X&ved=2ahUKEwij0suit4CXAxVUV0EAHZEtIaUQ3PALegQIGxAE&biw=980&bih=1835&dpr=2.75&sec_src=gmail", // EDIT GOOGLE BUSINESS PROFILE URL HERE
  googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ-9f_x-QDKA4R_rcR38srxwI&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2",
  analyticsId: "G-YHJ133J6XB",
};

const ANALYTICS_CONSENT_KEY = "magalie_analytics_consent";

function setSiteLinks() {
  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    link.href = SITE.bookingUrl;
  });
  document.querySelectorAll("[data-google-reviews]").forEach((link) => {
    link.href = SITE.googleReviewsUrl;
  });
  document.querySelectorAll("[data-write-review]").forEach((link) => {
    link.href = SITE.googleWriteReviewUrl;
  });
  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    link.href = SITE.phoneHref;
    link.textContent = SITE.phoneDisplay;
  });
  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${SITE.email}`;
    link.textContent = SITE.email;
  });
}

function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
      document.body.classList.toggle("menu-open", !expanded);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
    }));
  }
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.className = "form-status";
    const data = new FormData(form);
    const name = String(data.get("nom") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const consent = data.get("consentement");
    if (!name || !email || !message || !consent) {
      status.textContent = "Merci de remplir les champs obligatoires et d’accepter la politique de confidentialité.";
      status.className = "form-status error";
      status.focus();
      return;
    }
    if (message.length > 600) {
      status.textContent = "Votre message est trop long. Merci de le limiter à 600 caractères.";
      status.className = "form-status error";
      status.focus();
      return;
    }
    const isPreview = window.location.hostname === "localhost" || window.location.hostname.includes("manus.computer");
    try {
      if (!isPreview) {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        });
      }
      status.textContent = "Merci, votre demande a bien été envoyée. Magalie vous répondra dès que possible.";
      status.className = "form-status success";
      form.reset();
    } catch {
      status.textContent = "Une difficulté est survenue lors de l’envoi. Vous pouvez appeler le 06 23 39 11 86 ou écrire à Magalie.";
      status.className = "form-status error";
    }
    status.focus();
  });
}

function sendAnalyticsEvent(name, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

function loadGoogleAnalytics() {
  if (window.__magalieAnalyticsLoaded) return;
  window.__magalieAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", SITE.analyticsId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(SITE.analyticsId)}`;
  document.head.appendChild(script);
}

function saveAnalyticsConsent(value) {
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
}

function hideAnalyticsBanner() {
  const banner = document.querySelector("[data-analytics-consent]");
  if (banner) banner.remove();
}

function acceptAnalytics() {
  saveAnalyticsConsent("accepted");
  hideAnalyticsBanner();
  loadGoogleAnalytics();
}

function refuseAnalytics() {
  saveAnalyticsConsent("refused");
  hideAnalyticsBanner();
}

function initAnalyticsConsent() {
  const choice = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  if (choice === "accepted") {
    loadGoogleAnalytics();
    return;
  }
  if (choice === "refused") return;

  const banner = document.createElement("section");
  banner.className = "analytics-consent";
  banner.dataset.analyticsConsent = "true";
  banner.setAttribute("aria-labelledby", "analytics-consent-title");
  banner.innerHTML = `
    <div class="analytics-consent-inner">
      <div>
        <h2 id="analytics-consent-title">Votre confidentialité compte</h2>
        <p>Avec votre accord, des statistiques anonymisées nous aident à comprendre les visites du site et l’origine des supports imprimés. Aucun outil de mesure n’est activé sans votre choix. <a href="/politique-confidentialite/">En savoir plus</a></p>
      </div>
      <div class="analytics-consent-actions">
        <button type="button" class="btn btn-outline btn-sm" data-analytics-refuse>Refuser</button>
        <button type="button" class="btn btn-primary btn-sm" data-analytics-accept>Accepter les statistiques</button>
      </div>
    </div>`;
  document.body.appendChild(banner);
  banner.querySelector("[data-analytics-accept]").addEventListener("click", acceptAnalytics);
  banner.querySelector("[data-analytics-refuse]").addEventListener("click", refuseAnalytics);
}

function initAnalyticsEvents() {
  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    link.addEventListener("click", () => sendAnalyticsEvent("booking_click", {
      booking_provider: "lacteo",
      link_text: link.textContent.trim().slice(0, 100),
      page_location: window.location.href,
    }));
  });
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => sendAnalyticsEvent("phone_click", { page_location: window.location.href }));
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", () => sendAnalyticsEvent("email_click", { page_location: window.location.href }));
  });
}

window.MagalieAnalytics = {
  accept: acceptAnalytics,
  refuse: refuseAnalytics,
  open: initAnalyticsConsent,
};

document.addEventListener("DOMContentLoaded", () => {
  setSiteLinks();
  initHeader();
  initContactForm();
  initAnalyticsEvents();
  initAnalyticsConsent();
});
