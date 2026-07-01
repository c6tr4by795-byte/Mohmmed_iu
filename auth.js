/* ==========================================
   IQ SCAN
   Authentication
========================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = this.querySelector('input[type="text"]').value.trim();
        const password = this.querySelector('input[type="password"]').value.trim();

        // حساب تجريبي
        if (username === "admin" && password === "123456") {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", username);

            window.location.href = "scanner.html";

        } else {

            alert("اسم المستخدم أو كلمة المرور غير صحيحة");

        }

    });

}

// إذا المستخدم مسجل دخول بالفعل
if (
    localStorage.getItem("loggedIn") === "true" &&
    window.location.pathname.includes("index.html")
) {

    window.location.href = "scanner.html";

}
