document.addEventListener('DOMContentLoaded', () => {
    const profileNameElem = document.getElementById('profileName');
    const userTreesCountElem = document.getElementById('userTreesCount');
    const userCo2ImpactElem = document.getElementById('userCo2Impact');

    // 1. جلب الاسم الحقيقي المخزن في المتصفح
    const realName = localStorage.getItem('iraqGreen_userName');
    
    // إذا لم يجد اسماً (يعني لم يسجل حساباً بعد)، يتم تحويله تلقائياً لصفحة إنشاء الحساب
    if (!realName) {
        window.location.href = 'index.html';
        return;
    }
    
    // عرض الاسم الحقيقي في واجهة الملف الشخصي
    if (profileNameElem) {
        profileNameElem.textContent = realName;
    }

    // 2. جلب عدد الأشجار الفعلي من الـ LocalStorage (وإذا كانت فارغة يبدأ من 0 للحساب الجديد)
    let totalPlantedTrees = parseInt(localStorage.getItem('iraqGreen_totalTrees'));
    if (isNaN(totalPlantedTrees)) {
        totalPlantedTrees = 0;
    }

    // معدل امتصاص الشجرة الواحدة للـ CO2 سنوياً (تقريباً 22 كغم)
    const CO2_ABSORPTION_PER_TREE = 22; 

    // 3. دالة تحريك العداد بشكل تصاعدي انسيابي متناسق مع الأرقام الحقيقية
    function animateImpactCounters(targetTrees) {
        if (targetTrees === 0) {
            if (userTreesCountElem) userTreesCountElem.textContent = "0";
            if (userCo2ImpactElem) userCo2ImpactElem.textContent = "0 كغم/عام";
            return;
        }

        let currentTrees = 0;
        const duration = 1000; // مدة الحركة بالملي ثانية
        const stepTime = Math.max(Math.floor(duration / targetTrees), 20);
        
        const timer = setInterval(() => {
            currentTrees++;
            
            if (userTreesCountElem) {
                userTreesCountElem.textContent = currentTrees;
            }
            
            if (userCo2ImpactElem) {
                const currentCo2 = currentTrees * CO2_ABSORPTION_PER_TREE;
                userCo2ImpactElem.textContent = `${currentCo2} كغم/عام`;
            }

            if (currentTrees >= targetTrees) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // تشغيل العداد فور فتح الصفحة
    animateImpactCounters(totalPlantedTrees);

    // 4. نظام التفاعل مع الأوسمة البيئية
    const earnedBadges = document.querySelectorAll('.badge-item-lock.success-earned');
    earnedBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            const title = badge.querySelector('.badge-title').textContent;
            showBadgeToast(`لقد قمت بإلغاء قفل وسام [ ${title} ] بجدارة!`);
        });
    });

    function showBadgeToast(message) {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '80px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'var(--bg-surface)';
        toast.style.border = '1px solid var(--color-primary)';
        toast.style.color = 'var(--text-primary)';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = 'var(--radius-full)';
        toast.style.fontSize = '0.85rem';
        toast.style.zIndex = '1000';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
        toast.style.transition = 'opacity 0.3s ease';
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
});
