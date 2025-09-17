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

  // ===== Initiera n8n Chat Widget =====
  import("https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js").then(
    ({ createChat }) => {
      createChat({
        webhookUrl:
          "https://scanmatchuf.app.n8n.cloud/webhook/d9224fd4-8134-4a1c-bdf9-b16a11a450a6/chat",
        target: "#n8n-chat",
        mode: "window",
        showWelcomeScreen: true,
        loadPreviousSession: true,
      });

      // Funktion för att öppna chatten
      function openN8nChat() {
        const clickToggleIfClosed = () => {
          const btn = document.querySelector(".n8n-chat-widget__toggle");
          if (!btn) return false;

          const expanded = btn.getAttribute("aria-expanded");
          if (expanded !== "true") btn.click();

          setTimeout(() => {
            const input = document.querySelector(
              "textarea, .n8n-chat-widget__textarea"
            );
            if (input) input.focus();
          }, 150);

          return true;
        };

        if (!clickToggleIfClosed()) {
          const obs = new MutationObserver(() => {
            if (clickToggleIfClosed()) obs.disconnect();
          });
          obs.observe(document.body, { childList: true, subtree: true });
        }
      }

      // Öppna automatiskt när sidan laddar
      setTimeout(openN8nChat, 300);

      // Klick på länken “ChatBOT AI” öppnar chatten
      const openLink = document.getElementById("openChatLink");
      if (openLink) {
        openLink.addEventListener("click", (e) => {
          e.preventDefault();
          openN8nChat();
        });
      }
    }
  );
});
