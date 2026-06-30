// ===============================
// العراق الأخضر V2
// app.js
// ===============================

// انتظار تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {

    console.log("العراق الأخضر V2 جاهز ✅");

    // تفعيل Telegram Mini App
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();

        document.body.style.background =
            Telegram.WebApp.themeParams.bg_color || "#F4F8F3";
    }

    // البحث
    const searchInput = document.querySelector(".search input");

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            document.querySelectorAll(".card").forEach(card => {

                const text = card.innerText.toLowerCase();

                if (text.includes(value)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });
    }

    // حركة البطاقات
    document.querySelectorAll(".card").forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {
            card.style.transition = ".5s";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);

    });

    // تأثير الأزرار
    document.querySelectorAll(".btn").forEach(btn => {

        btn.addEventListener("click", () => {

            btn.style.transform = "scale(.95)";

            setTimeout(() => {
                btn.style.transform = "scale(1)";
            }, 150);

        });

    });

    // تفعيل شريط التنقل
    document.querySelectorAll(".nav-item").forEach(item => {

        item.addEventListener("click", function () {

            document.querySelectorAll(".nav-item")
                .forEach(i => i.classList.remove("active"));

            this.classList.add("active");

        });

    });

});

// إشعار بسيط
function showMessage(message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "25px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#1B8F3F";
    toast.style.color = "#fff";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "12px";
    toast.style.zIndex = "9999";
    toast.style.boxShadow = "0 8px 20px rgba(0,0,0,.2)";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);

}
