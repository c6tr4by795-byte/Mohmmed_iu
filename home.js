document.addEventListener('DOMContentLoaded', () => {
    // التحقق من حالة تسجيل الدخول (لحماية الصفحة تجريبيًا)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail') || 'demo.volunteer@iraqgreen.com';

    // تحديث شارة البريد الإلكتروني للمستخدم
    const userEmailBadge = document.getElementById('userEmailBadge');
    if (userEmailBadge) {
        userEmailBadge.textContent = userEmail;
    }

    // عرض التاريخ الحالي بتنسيق عراقي رسمي جميل
    const currentDateElem = document.getElementById('currentDate');
    if (currentDateElem) {
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        currentDateElem.textContent = new Date().toLocaleDateString('ar-IQ', dateOptions);
    }

    // تغيير الترحيب ديناميكيًا حسب وقت اليوم
    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting) {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            userGreeting.textContent = 'صباح الخير، أيها المتطوع';
        } else if (currentHour >= 12 && currentHour < 17) {
            userGreeting.textContent = 'أهلاً بك، أيها المتطوع';
        } else {
            userGreeting.textContent = 'مساء الخير، أيها المتطوع';
        }
    }

    // تفعيل زر تسجيل الخروج
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // تنظيف بيانات الجلسة المحلية
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            
            // التوجيه إلى الصفحة الرئيسية للمشروع
            window.location.href = 'index.html';
        });
    }

    // إضافة تأثير تفاعلي بسيط عند الضغط على كروت الإحصائيات
    const statCards = document.querySelectorAll('.user-stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        });
    });
});
