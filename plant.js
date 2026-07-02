document.addEventListener('DOMContentLoaded', () => {
    const plantTreeForm = document.getElementById('plantTreeForm');
    const treeTypeSelect = document.getElementById('treeType');
    const provinceSelect = document.getElementById('province');
    const coordinatesInput = document.getElementById('coordinates');
    
    const treeTypeError = document.getElementById('treeTypeError');
    const provinceError = document.getElementById('provinceError');
    const locationError = document.getElementById('locationError');
    const plantFeedback = document.getElementById('plantFeedback');
    
    const btnGetLocation = document.getElementById('btnGetLocation');
    const locationStatus = document.getElementById('locationStatus');
    const btnSubmitPlant = document.getElementById('btnSubmitPlant');

    // 1. نظام التقاط الموقع الجغرافي (GPS Geolocation API)
    btnGetLocation.addEventListener('click', () => {
        if (!navigator.geolocation) {
            locationStatus.textContent = 'متصفحك لا يدعم خاصية تحديد الموقع GPS.';
            locationStatus.style.color = 'var(--color-error)';
            return;
        }

        locationStatus.textContent = 'جاري الاتصال بالأقمار الصناعية لتحديد موقع الغرسة...';
        locationStatus.style.color = 'var(--text-secondary)';
        btnGetLocation.disabled = true;

        const geoOptions = {
            enableHighAccuracy: true, // طلب دقة عالية جداً للحصول على إحداثيات الشجرة بدقة
            timeout: 10000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(6);
                const lng = position.coords.longitude.toFixed(6);
                
                // حفظ الإحداثيات في الحقل المخفي
                coordinatesInput.value = `${lat},${lng}`;
                
                // تحديث واجهة المستخدم بالحالة الناجحة
                locationStatus.textContent = `تم التقاط الموقع بنجاح! الإحداثيات: (${lat} , ${lng})`;
                locationStatus.style.color = 'var(--color-primary)';
                btnGetLocation.classList.add('success-location');
                btnGetLocation.disabled = false;
                locationError.textContent = '';
            },
            (error) => {
                btnGetLocation.disabled = false;
                locationStatus.style.color = 'var(--color-error)';
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        locationStatus.textContent = 'تم رفض إذن الوصول للموقع. يرجى تفعيل الـ GPS في متصفحك.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationStatus.textContent = 'معلومات الموقع غير متوفرة حالياً.';
                        break;
                    case error.TIMEOUT:
                        locationStatus.textContent = 'انتهت مهلة طلب الموقع. حاول مجدداً في مساحة مفتوحة.';
                        break;
                    default:
                        locationStatus.textContent = 'حدث خطأ غير معروف أثناء تحديد الموقع.';
                }
            },
            geoOptions
        );
    });

    // 2. تنظيف رسائل الخطأ عند التفاعل
    treeTypeSelect.addEventListener('change', () => {
        treeTypeError.textContent = '';
        treeTypeSelect.style.borderColor = '';
    });

    provinceSelect.addEventListener('change', () => {
        provinceError.textContent = '';
        provinceSelect.style.borderColor = '';
    });

    // 3. معالجة إرسال الاستمارة وتوثيق الشجرة
    plantTreeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;
        treeTypeError.textContent = '';
        provinceError.textContent = '';
        locationError.textContent = '';
        plantFeedback.className = 'form-feedback';
        plantFeedback.textContent = '';

        // التحقق من نوع الشجرة
        if (!treeTypeSelect.value) {
            treeTypeError.textContent = 'يرجى اختيار نوع الشجرة.';
            treeTypeSelect.style.borderColor = 'var(--color-error)';
            isValid = false;
        }

        // التحقق من المحافظة
        if (!provinceSelect.value) {
            provinceError.textContent = 'يرجى تحديد المحافظة التي تم الغرس فيها.';
            provinceSelect.style.borderColor = 'var(--color-error)';
            isValid = false;
        }

        // التحقق من وجود الموقع الجغرافي
        if (!coordinatesInput.value) {
            locationError.textContent = 'يجب تحديد الموقع الجغرافي الدقيق لتوثيق الشجرة.';
            isValid = false;
        }

        if (!isValid) return;

        // تفعيل حالة التحميل (Loading State)
        btnSubmitPlant.classList.add('loading');
        btnSubmitPlant.disabled = true;
        treeTypeSelect.disabled = true;
        provinceSelect.disabled = true;
        btnGetLocation.disabled = true;

        try {
            // محاكاة إرسال البيانات إلى قاعدة البيانات السحابية (Firebase / API)
            await new Promise(resolve => setTimeout(resolve, 2000));

            plantFeedback.textContent = 'تم توثيق الشجرة بنجاح في النظام وتوليد الهوية الرقمية! جاري توجيهك لرمز الـ QR...';
            plantFeedback.classList.add('success');

            // التوجيه إلى صفحة عرض الـ QR الخاص بالشجرة بعد التوثيق
            setTimeout(() => {
                // نمرر نوع الشجرة والموقع عبر الرابط بشكل مؤقت للتوضيح والتجربة المباشرة
                window.location.href = `qr-generated.html?type=${treeTypeSelect.value}&coords=${coordinatesInput.value}`;
            }, 1500);

        } catch (error) {
            plantFeedback.textContent = 'حدث خطأ أثناء معالجة البيانات، يرجى التحقق من اتصالك بالإنترنت.';
            plantFeedback.classList.add('error');

            btnSubmitPlant.classList.remove('loading');
            btnSubmitPlant.disabled = false;
            treeTypeSelect.disabled = false;
            provinceSelect.disabled = false;
            btnGetLocation.disabled = false;
        }
    });
});
