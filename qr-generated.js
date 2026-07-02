document.addEventListener('DOMContentLoaded', () => {
    // 1. استخراج البيانات من رابط الصفحة (URL Query Parameters)
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const coords = urlParams.get('coords');

    // العناصر في الصفحة
    const treeTypeDisplay = document.getElementById('treeTypeDisplay');
    const treeCoordsDisplay = document.getElementById('treeCoordsDisplay');

    // 2. ترجمة نوع الشجرة إلى اسم مفهوم للعرض
    const treeNames = {
        'palm': 'نخلة تمر عراقية 🌴',
        'sedr': 'شجرة سدر (نبق) 🌳',
        'olive': 'شجرة زيتون 🫒',
        'albizia': 'شجرة ألبيزيا بيئية 🌱'
    };

    // 3. عرض البيانات في الواجهة
    if (treeTypeDisplay) {
        treeTypeDisplay.textContent = treeNames[type] || 'شجرة بيئية';
    }
    
    if (treeCoordsDisplay) {
        treeCoordsDisplay.textContent = `الإحداثيات: ${coords || 'غير متوفرة'}`;
    }

    // 4. أمان النظام: إذا دخل المستخدم لهذه الصفحة بدون المرور بعملية غرس، نعيده للرئيسية
    if (!type || !coords) {
        // نتحقق من الـ LocalStorage كخيار بديل
        const lastType = localStorage.getItem('iraqGreen_lastTreeType');
        const lastCoords = localStorage.getItem('iraqGreen_lastTreeCoords');
        
        if (lastType && lastCoords) {
            treeTypeDisplay.textContent = treeNames[lastType];
            treeCoordsDisplay.textContent = `الإحداثيات: ${lastCoords}`;
        } else {
            // إذا لا يوجد غرس سابق، نمنعه من البقاء
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 3000);
        }
    }
});
