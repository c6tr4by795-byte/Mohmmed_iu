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
    const homeWelcomeTitle = document.getElementById('homeWelcomeTitle');
    const homeTreesCountElem = document.getElementById('homeTreesCount');
    const homeCo2CountElem = document.getElementById('homeCo2Count');

    // 1. التحقق من وجود الاسم الحقيقي في الـ LocalStorage
    const realName = localStorage.getItem('iraqGreen_userName');
    
    // إذا لم يجد حساباً مسجلاً، يتم توجيهه تلقائياً لصفحة إنشاء الحساب
    if (!realName) {
        window.location.href = 'index.html';
        return;
    }

    // 2. صياغة ترحيب ذكي متناسق مع وقت المستخدم الحالي
    const currentHour = new Date().getHours();
    let greetingText = 'أهلاً بك، ';
    
    if (currentHour >= 5 && currentHour < 12) {
        greetingText = 'صباح الخير، ';
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingText = 'مساء الخير، ';
    } else {
        greetingText = 'أهلاً بك في المساء، ';
    }

    // عرض الترحيب والاسم الحقيقي
    if (homeWelcomeTitle) {
        homeWelcomeTitle.textContent = `${greetingText} ${realName} 👋`;
    }

    // 3. جلب عدد الأشجار الفعلي المخزن بالمتصفح
    let totalPlantedTrees = parseInt(localStorage.getItem('iraqGreen_totalTrees'));
    if (isNaN(totalPlantedTrees)) {
        totalPlantedTrees = 0;
    }

    // الثابت البيئي لامتصاص غاز ثاني أكسيد الكربون لكل شجرة (22 كغم/عام)
    const CO2_ABSORPTION_PER_TREE = 22;

    // 4. دالة العداد التصاعدي لتحديث واجهة الـ Dashboard الرئيسية بشكل احترافي
    function animateDashboardCounters(targetTrees) {
        if (targetTrees === 0) {
            if (homeTreesCountElem) homeTreesCountElem.textContent = "0";
            if (homeCo2CountElem) homeCo2CountElem.textContent = "0 كغم";
            return;
        }

        let currentTrees = 0;
        const duration = 1000; // وقت العداد بالملي ثانية
        const stepTime = Math.max(Math.floor(duration / targetTrees), 20);

        const timer = setInterval(() => {
            currentTrees++;

            if (homeTreesCountElem) {
                homeTreesCountElem.textContent = currentTrees;
            }

            if (homeCo2CountElem) {
                const currentCo2 = currentTrees * CO2_ABSORPTION_PER_TREE;
                homeCo2CountElem.textContent = `${currentCo2} كغم`;
            }

            if (currentTrees >= targetTrees) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // تشغيل العداد عند تحميل لوحة التحكم
    animateDashboardCounters(totalPlantedTrees);
});
