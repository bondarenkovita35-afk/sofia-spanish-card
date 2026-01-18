(() => {
  const toast = document.getElementById("toast");
  const copyBtn = document.getElementById("copyInsta");
  const langButtons = document.querySelectorAll(".lang button");

  const INSTAGRAM_URL = "https://instagram.com/sofiia_osipovich";

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 1600);
  }

  function currentLang() {
    return document.documentElement.lang === "es" ? "es" : "uk";
  }

  function setLang(lang) {
    document.documentElement.lang = lang;

    langButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    document.querySelectorAll("[data-uk][data-es]").forEach(node => {
      node.textContent = node.dataset[lang];
    });

    showToast(lang === "uk" ? "Мову змінено" : "Idioma cambiado");
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const lang = currentLang();
      try {
        await navigator.clipboard.writeText(INSTAGRAM_URL);
        showToast(lang === "uk" ? "Instagram скопійовано ✅" : "Instagram copiado ✅");
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = INSTAGRAM_URL;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast(lang === "uk" ? "Скопійовано ✅" : "Copiado ✅");
      }
    });
  }

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  setLang("uk");
})();
