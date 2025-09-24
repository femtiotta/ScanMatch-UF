// ===== Gmail-knappen =====
document.addEventListener("DOMContentLoaded", () => {
  const mailBtn = document.getElementById("mailBtn");
  if (mailBtn) {
    mailBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Gmail URL
      const gmailUrl =
        "https://mail.google.com/mail/?view=cm&fs=1&to=scanmatchuf@gmail.com&su=Förfrågan%20från%20webben&body=Hej%20ScanMatch%20UF,";

      const win = window.open(gmailUrl, "_blank");

      // Fallback till mailto om popup-blocker slår till
      setTimeout(() => {
        if (!win || win.closed || typeof win.closed === "undefined") {
          window.location.href = "mailto:scanmatchuf@gmail.com";
        }
      }, 500);
    });
  }
