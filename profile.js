document.addEventListener('DOMContentLoaded', () => {
    // 1. تعريف العناصر الأساسية في الواجهة
    const userTreesCountElem = document.getElementById('userTreesCount');
    const userCo2ImpactElem = document.getElementById('userCo2Impact');

    // معدل امتصاص شجرة السدر والنخيل والأشجار البيئية الافتراضي للـ CO2 (تقريباً 22 كغم في العام لكل شجرة)
    const CO2_ABSORPTION_PER_TREE = 22; 

    // 2. قراءة البيانات الحية من الذاكرة المحلية (localStorage) المربوطة بصفحة الغرس
    // وإذا لم يغرس المستخدم أي شجرة جديدة بعد، نعتمد الرقم الافتراضي المكتوب في حساب المتطوع (14 شجرة)
    let totalPlantedTrees = parseInt(localStorage.getItem('iraqGreen_totalTrees')) || 14;

    // 3. دالة تحديث الأرقام بـ تأثير عدّاد تصاعدي انسيابي (Animate Counter) يعكس جودة الـ UI
    function animateImpactCounters(targetTrees) {
        let currentTrees = 0;
        const duration = 1200; // مدة الحركة بالملي ثانية
        const stepTime = Math.max(Math.floor(duration / targetTrees), 15);
        
        const timer = setInterval(() => {
            currentTrees++;
            
            // تحديث نص عدد الأشجار
            if (userTreesCountElem) {
                userTreesCountElem.textContent = currentTrees;
            }
            
            // احتساب وتحديث نص امتصاص غاز الكربون التقديري متزامناً مع العداد
            if (userCo2ImpactElem) {
                const currentCo2 = currentTrees * CO2_ABSORPTION_PER_TREE;
                userCo2ImpactElem.textContent = `${currentCo2} كغم/عام`;
            }

            if (currentTrees >= targetTrees) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // تشغيل تأثير العداد الذكي عند تحميل الصفحة مباشرة
    animateImpactCounters(totalPlantedTrees);

    // 4. ميزة تفاعلية: محاكاة الضغط على الأوسمة البيئية لعرض تفاصيلها (Toast Hint)
    const earnedBadges = document.querySelectorAll('.badge-item-lock.success-earned');
    earnedBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            const title = badge.querySelector('.badge-title').textContent;
            showBadgeToast(`لقد قمت بإلغاء قفل وسام [ ${title} ] بجدارة!`);
        });
    });

    // دالة بناء إشعار منبثق ناعم وسريع (Lightweight Toast)
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
