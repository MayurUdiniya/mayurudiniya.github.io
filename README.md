<!DOCTYPE html>
<html>
<head>
  <title>OAuth Token Capture</title>
</head>
<body>
  <h1>OAuth Token Capture (Static GitHub Page)</h1>
  <p id="status">Waiting for token...</p>

  <textarea id="log" rows="20" cols="100" readonly></textarea>

  <script>
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const id_token = params.get("id_token");

    const logBox = document.getElementById("log");
    const status = document.getElementById("status");

    if (id_token) {
      const time = new Date().toISOString();
      const entry = `--- ${time} ---\nToken: ${id_token}\nURL: ${window.location.href}\n\n`;

      // Save in browser localStorage (not shared)
      const existing = localStorage.getItem("token_logs") || "";
      const updated = existing + entry;
      localStorage.setItem("token_logs", updated);

      logBox.value = updated;
      status.textContent = "✅ Token captured and saved in your browser (localStorage).";
    } else {
      status.textContent = "⚠️ No id_token found in URL fragment.";
      logBox.value = localStorage.getItem("token_logs") || "";
    }
  </script>
</body>
</html>
