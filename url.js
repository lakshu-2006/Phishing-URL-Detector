const button = document.getElementById("checkButton");
const input = document.getElementById("urlInput");
const result = document.getElementById("result");

button.addEventListener("click", function () {
    const url = input.value.trim();

    // 🧹 Clear previous result
    result.textContent = "";
    result.style.color = "";
    result.style.backgroundColor = "";

    // ⚠️ Check empty input
    if (url === "") {
        result.textContent = "⚠️ Please enter a URL!";
        result.style.color = "red";
        result.style.backgroundColor = "#fee2e2";
        return;
    }

    // 🔍 Validate URL format
    let parsedURL;

    try {
        parsedURL = new URL(url);
    } catch {
        result.textContent = "❌ Please enter a valid URL!";
        result.style.color = "red";
        result.style.backgroundColor = "#fee2e2";
        return;
    }

    // 🔒 Allow only HTTP and HTTPS
    if (
        parsedURL.protocol !== "http:" &&
        parsedURL.protocol !== "https:"
    ) {
        result.textContent =
            "🔒 Only HTTP or HTTPS URLs are supported!";
        result.style.color = "red";
        result.style.backgroundColor = "#fee2e2";
        return;
    }

    // 🚩 Common suspicious URL patterns
    const suspiciousPatterns = [
        "login-verify",
        "secure-update",
        "account-verify",
        "free-gift"
    ];

    const isSuspicious = suspiciousPatterns.some(
        function (pattern) {
            return url.toLowerCase().includes(pattern);
        }
    );

    // 🌐 Check for an IPv4-like hostname
    const hostname = parsedURL.hostname;

    const hostIPAddress =
        /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);

    // 📊 Display result
    if (isSuspicious || hostIPAddress) {
        result.textContent =
            "🚨 Warning: Suspicious URL pattern detected!";
        result.style.color = "red";
        result.style.backgroundColor = "#fee2e2";
    } else {
        result.textContent =
            "✅ No common suspicious patterns detected. This does not guarantee the URL is safe.";
        result.style.color = "green";
        result.style.backgroundColor = "#dcfce7";
    }
});