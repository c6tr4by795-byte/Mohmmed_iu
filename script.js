document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const screens = document.querySelectorAll('.app-screen');
    const fabPlantTree = document.getElementById('fab-plant-tree');

    // نظام التنقل بين الشاشات (SPA Routing)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetScreenId = item.getAttribute('data-target');

            // إزالة الحالة النشطة من الأزرار والشاشات السابقة
            navItems.forEach(nav => nav.classList.remove('active'));
            screens.forEach(screen => screen.classList.remove('active'));

            // تفعيل الزر والشاشة المختارة
            item.classList.add('active');
            document.getElementById(targetScreenId).classList.add('active');
        });
    });

    // تفاعل زر "ازرع شجرة" العائم
    fabPlantTree.addEventListener('click', () => {
        alert('سيتم فتح استمارة زرع شجرة الجديدة (إدخال النوع، الموقع، الصورة) وربطها بالـ QR كود قريباً!');
        // لاحقاً سنقوم بربط هذا الزر لفتح شاشة رقم 7 "Plant Tree" مباشرة
    });
});
