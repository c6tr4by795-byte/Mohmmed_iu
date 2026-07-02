document.addEventListener('DOMContentLoaded', () => {
    // 1. قراءة المعاملات (Parameters) من رابط الصفحة (URL)
    const urlParams = new URLSearchParams(window.location.search);
    const treeType = urlParams.get('type') || 'other';
    const coordinates = urlParams.get('coords') || '33.3128,44.3615'; // إحداثيات افتراضية لبغداد في حال عدم التحديد

    // 2. مصفوفة الترجمة لتحويل رموز الأشجار إلى مسميات عربية واضحة
    const treeNamesAr = {
        'sadr': 'سدر (نبق)',
        'albizie': 'ألبيزيا',
        'burhan': 'برهان',
        'palm': 'نخلة تمر',
        'olive': 'زيتون',
        'other': 'شجرة بيئية'
    };

    // تحديث نوع الشجرة في الكارت
    const badgeTreeTypeElem = document.getElementById('badgeTreeType');
    if (badgeTreeTypeElem) {
        badgeTreeTypeElem.textContent = treeNamesAr[treeType] || treeNamesAr['other'];
    }

    // تحديث الإحداثيات الجغرافية في الكارت
    const badgeCoordsElem = document.getElementById('badgeCoords');
    if (badgeCoordsElem) {
        // تنسيق مريح للقراءة مع استبدال الفاصلة بفاصلة منقوطة واضحة
        badgeCoordsElem.textContent = coordinates.replace(',', ' ; ');
    }

    // عرض تاريخ اليوم التلقائي على الهوية الرقمية للشجرة
    const badgeDateElem = document.getElementById('badgeDate');
    if (badgeDateElem) {
        const options = { year: 'numeric', month: 'long' };
        badgeDateElem.textContent = new Date().toLocaleDateString('ar-IQ', options);
    }

    // 3. توليد رقم تسلسلي (Serial Number) عشوائي وفريد يحاكي الأنظمة الحقيقية
    const treeSerialElem = document.getElementById('treeSerial');
    if (treeSerialElem) {
        const randomNum = Math.floor(10000 + Math.random() * 90000); // توليد 5 أرقام عشوائية
        const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // حرف إنجليزي عشوائي العراقي
        treeSerialElem.textContent = `ID: IG-${randomNum}${randomChar}`;
    }

    // 4. تفعيل زر الطباعة / الحفظ كـ PDF عبر نافذة النظام الرسمية
    const btnPrintBadge = document.getElementById('btnPrintBadge');
    if (btnPrintBadge) {
        btnPrintBadge.addEventListener('click', () => {
            window.print(); // استدعاء أمر الطباعة المباشر للمتصفح
        });
    }
});
