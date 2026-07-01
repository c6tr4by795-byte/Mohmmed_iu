/* ==========================================
   IQ SCAN
   Scanner v1.0
========================================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");

        window.location.href = "index.html";

    });

}

function onScanSuccess(decodedText) {

    // إيقاف الكاميرا
    scanner.stop();

    // اهتزاز إذا مدعوم
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }

    // حفظ الكود
    localStorage.setItem("lastQR", decodedText);

    // الانتقال للنتيجة
    window.location.href = "result.html";

}

function onScanFailure(error) {
    // تجاهل أخطاء القراءة المستمرة
}

const scanner = new Html5Qrcode("reader");

Html5Qrcode.getCameras()

.then(devices => {

    if (devices && devices.length) {

        scanner.start(

            devices[0].id,

            {

                fps: 10,

                qrbox: {

                    width: 250,

                    height: 250

                }

            },

            onScanSuccess,

            onScanFailure

        );

    }

})

.catch(err => {

    alert("تعذر تشغيل الكاميرا");

    console.log(err);

});
