document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Menü schliessen" : "Menü öffnen");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("quoteForm");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    const config = window.MT_TRANSPORT_CONFIG || {};
    const email = (config.email || "").trim();
    const message = document.getElementById("formMessage");
    if (!email || email.includes("IHRE-E-MAIL") || email.includes("BEISPIEL")) {
      message.textContent = "Bitte zuerst in config.js Ihre echte geschäftliche E-Mail-Adresse eintragen. Danach funktioniert die Anfrage-Schaltfläche.";
      message.style.color = "#a24b2a";
      return;
    }
    const data = new FormData(form);
    const subject = `Offertenanfrage MT Transport – ${data.get("service")}`;
    const body = [
      "Neue Offertenanfrage über die Website MT Transport",
      "",
      `Name: ${data.get("name")}`,
      `E-Mail: ${data.get("email")}`,
      `Telefon: ${data.get("phone") || "Nicht angegeben"}`,
      `Dienstleistung: ${data.get("service")}`,
      `Ort / PLZ: ${data.get("location") || "Nicht angegeben"}`,
      `Wunschtermin: ${data.get("date") || "Noch offen"}`,
      "",
      "Weitere Angaben:",
      data.get("details") || "Keine weiteren Angaben",
      "",
      "Hinweis: Bitte antworten Sie direkt an die E-Mail-Adresse des Kunden."
    ].join("\n");
    message.textContent = "Ihr E-Mail-Programm sollte sich jetzt öffnen. Bitte prüfen Sie die Anfrage und senden Sie die E-Mail ab.";
    message.style.color = "#2f6e4c";
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
