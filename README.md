<!DOCTYPE html>
<html>
<head>
  <title>OAuth Token Capture</title>
</head>
<body>
  <h1>OAuth Token Capturess</h1>
  <p id="status">Waiting for token...</p>
  <textarea id="log" rows="10" cols="100" readonly></textarea>

  <script>
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const id_token = params.get("id_token") || params.get("access_token") || params.get("token");

    const logBox = document.getElementById("log");
    const status = document.getElementById("status");

    if (id_token) {
      const time = new Date().toISOString();
      const entry = `--- ${time} ---\nFull Token:\n${id_token}\n\nURL: ${window.location.href.split("#")[0]}\n`;

      logBox.value = entry;
      status.textContent = "✅ Token captured and displayed.";
    } else {
      status.textContent = "⚠️ No token found in URL fragment.";
      logBox.value = "No token in URL hash (#). Please check if it was redirected correctly.";
    }
  </script>
</body>
</html>
