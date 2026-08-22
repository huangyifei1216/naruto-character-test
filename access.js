(() => {
  const accessStorageKey = "naruto-archetype-access-v3";

  try {
    document.documentElement.classList.add(
      sessionStorage.getItem(accessStorageKey) === "granted" ? "access-granted" : "access-locked"
    );
  } catch {
    document.documentElement.classList.add("access-locked");
  }

  const initAccessForm = () => {
    const form = document.querySelector("#accessForm");
    const input = document.querySelector("#accessCode");
    const message = document.querySelector("#accessMessage");
    if (!form || !input || !message) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (input.value.trim().toLowerCase() !== "ylb123") {
        message.textContent = "体验码不正确，请再试一次。";
        input.select();
        return;
      }
      try { sessionStorage.setItem(accessStorageKey, "granted"); } catch { /* 当前页面仍可继续使用 */ }
      document.documentElement.classList.remove("access-locked");
      document.documentElement.classList.add("access-granted");
      message.textContent = "";
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAccessForm, { once: true });
  } else {
    initAccessForm();
  }
})();
