document.addEventListener('DOMContentLoaded', () => {
    const profileNameElem = document.getElementById('profileName');
    const userTreesCountElem = document.getElementById('userTreesCount');
    const userCo2ImpactElem = document.getElementById('userCo2Impact');

    // 1. التحقق من وجود اسم المستخدم
    const realName = localStorage.getItem('iraqGreen_userName');
    
    // إذا ماكو حساب، نحوله للـ index.html
    if (!realName) {
        window.location.href = 'index.html';
        return;
    }
    
    // إذا موجود، نعرضه
    if (profileNameElem) {
        profileNameElem.textContent = realName;
    }

    // 2. قراءة عدد الأشجار مع معالجة الخطأ إذا كانت القيمة فارغة
    let totalPlantedTrees = parseInt(localStorage.getItem('iraqGreen_totalTrees'));
    if (isNaN(totalPlantedTrees) || totalPlantedTrees === null) {
        totalPlantedTrees = 0;
    }

    const CO2_ABSORPTION_PER_TREE = 22; 

    // 3. العداد الانسيابي
    function animateImpactCounters(targetTrees) {
        let currentTrees = 0;
        const duration = 800;
        const stepTime = targetTrees > 0 ? Math.max(Math.floor(duration / targetTrees), 20) : 0;
        
        const timer = setInterval(() => {
            currentTrees++;
            if (userTreesCountElem) userTreesCountElem.textContent = currentTrees;
            if (userCo2ImpactElem) userCo2ImpactElem.textContent = `${currentTrees * CO2_ABSORPTION_PER_TREE} كغم/عام`;

            if (currentTrees >= targetTrees) {
                clearInterval(timer);
            }
        }, stepTime);

        // إذا كان صفر، نحدث الواجهة فوراً
        if (targetTrees === 0) {
            if (userTreesCountElem) userTreesCountElem.textContent = "0";
            if (userCo2ImpactElem) userCo2ImpactElem.textContent = "0 كغم/عام";
        }
    }

    animateImpactCounters(totalPlantedTrees);
});
