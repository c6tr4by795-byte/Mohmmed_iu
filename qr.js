document.addEventListener('DOMContentLoaded', () => {
    const btnToggleCamera = document.getElementById('btnToggleCamera');
    const cameraViewport = document.getElementById('cameraViewport');
    const cameraBtnText = document.getElementById('cameraBtnText');
    const scannerStatus = document.getElementById('scannerStatus');

    let isScanning = false;
    let scanTimeout = null;

    if (btnToggleCamera && cameraViewport) {
        btnToggleCamera.addEventListener('click', () => {
            if (!isScanning) {
                // 1. تفعيل وضع المسح (الكاميرا تعمل)
                isScanning = true;
                cameraViewport.classList.add('active');
                btnToggleCamera.classList.add('active-mode');
                cameraBtnText.textContent = 'إلغاء فحص الكاميرا';
                scannerStatus.textContent = 'جاري البحث عن رمز QR... وجه العدسة بثبات نحو الملصق';
                scannerStatus.style.color = 'var(--text-secondary)';

                // 2. محاكاة التقاط الرمز بنجاح بعد 3.5 ثانية من التركيز
                scanTimeout = setTimeout(() => {
                    // تحديث الحالة عند النجاح
                    scannerStatus.textContent = 'تم العثور على شجرة مستهدفة! جاري قراءة الهوية الرقمية...';
                    scannerStatus.style.color = 'var(--color-primary)';
                    cameraViewport.classList.remove('active'); // إيقاف خط الليزر المتحرك
                    
                    // التوجيه التلقائي بعد قراءة البيانات لمحاكاة فتح ملف تتبع الشجرة
                    setTimeout(() => {
                        // الانتقال لصفحة الهوية الرقمية المستخرجة مع تمرير بيانات محاكاة لشجرة مرصودة مسبقاً
                        window.location.href = 'qr-generated.html?type=palm&coords=32.0254,44.4012';
                    }, 1200);

                }, 3500);

            } else {
                // 3. إلغاء وضع المسح يدويًا قبل الاكتمال
                stopScanner();
            }
        });
    }

    // دالة إيقاف الماسح وإعادة التعيين للحالة الافتراضية
    function stopScanner() {
        isScanning = false;
        if (scanTimeout) clearTimeout(scanTimeout);
        
        cameraViewport.classList.remove('active');
        btnToggleCamera.classList.remove('active-mode');
        cameraBtnText.textContent = 'تشغيل كاميرا الفحص';
        scannerStatus.textContent = 'الكاميرا في وضع الاستعداد...';
        scannerStatus.style.color = 'var(--text-muted)';
    }
});
