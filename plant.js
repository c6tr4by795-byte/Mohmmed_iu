// ضعه في بداية ملف الـ JS في كل الصفحات
const checkUser = () => {
    const realName = localStorage.getItem('iraqGreen_userName');
    // إذا كنت في صفحة غير الـ index ولا يوجد اسم مستخدم، فقط هنا يرجعك
    if (!realName && window.location.pathname.indexOf('index.html') === -1) {
        window.location.href = 'index.html';
    }
};
checkUser();

document.addEventListener('DOMContentLoaded', () => {
    const plantForm = document.getElementById('plantForm');
    const btnGetLocation = document.getElementById('btnGetLocation');
    const locationInput = document.getElementById('locationCoords');

    // 1. التحقق من وجود حساب مسجل أولاً لمنع الثغرات
    const realName = localStorage.getItem('iraqGreen_userName');
    if (!realName) {
        window.location.href = 'index.html';
        return;
    }

    // 2. ميزة جلب إحداثيات الـ GPS الحقيقية للمستخدم
    if (btnGetLocation && locationInput) {
        btnGetLocation.addEventListener('click', () => {
            btnGetLocation.textContent = 'جاري تحديد موقعك الجغرافي...';
            btnGetLocation.style.borderColor = 'var(--text-muted)';
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude.toFixed(4);
                        const lng = position.coords.longitude.toFixed(4);
                        locationInput.value = `${lat}, ${lng}`;
                        btnGetLocation.textContent = 'تم التقاط الموقع بنجاح ✓';
                        btnGetLocation.style.borderColor = 'var(--color-primary)';
                        btnGetLocation.style.color = 'var(--color-primary)';
                    },
                    () => {
                        // في حال رفض الصلاحية أو فشل الحساس، يتم توفير موقع افتراضي ذكي
                        locationInput.value = '32.0254, 44.4012';
                        btnGetLocation.textContent = 'تم تعيين موقع تقديري';
                        btnGetLocation.style.borderColor = 'var(--color-info)';
                    }
                );
            } else {
                locationInput.value = '32.0254, 44.4012';
                btnGetLocation.textContent = 'مستشعر الـ GPS غير مدعوم';
            }
        });
    }

    // 3. معالجة إرسال النموذج وحفظ شجرة جديدة في الـ LocalStorage للحساب
    if (plantForm) {
        plantForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const treeType = document.getElementById('treeType').value;
            const treeLocation = locationInput.value || '32.0254, 44.4012';

            // قراءة العداد الحالي المخزن، وإذا لم يكن موجوداً يبدأ من 0
            let currentTreesCount = parseInt(localStorage.getItem('iraqGreen_totalTrees'));
            if (isNaN(currentTreesCount)) {
                currentTreesCount = 0;
            }
            
            // زيادة العداد بمقدار 1 للحساب الحقيقي الحالي
            currentTreesCount += 1;
            
            // حفظ العداد الجديد في ذاكرة المتصفح
            localStorage.setItem('iraqGreen_totalTrees', currentTreesCount);

            // تخزين بيانات آخر شجرة لغرض المعاينة المباشرة
            localStorage.setItem('iraqGreen_lastTreeType', treeType);
            localStorage.setItem('iraqGreen_lastTreeCoords', treeLocation);

            // 4. التوجيه الفوري لصفحة الهوية الرقمية لإصدار الـ QR الحقيقي
            window.location.href = `qr-generated.html?type=${treeType}&coords=${treeLocation}`;
        });
    }
});
