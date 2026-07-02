/* ==========================================
   مشروع العراق الأخضر V2 - ملف التحكم البرمجي (JavaScript)
   إدارة شاشة البداية والتكامل مع الأنظمة المتقدمة | إصدار 2025–2026
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // تشغيل نظام التهيئة بمجرد جاهزية مستند الـ HTML
    AppInitializer.init();
});

/**
 * الكائن الرئيسي لإدارة تهيئة التطبيق والدوال المساعدة
 */
const AppInitializer = {
    
    // الدالة الأساسية لتشغيل شاشة البداية والتحقق من البيئة المحيطة
    init() {
        try {
            this.initTelegramMiniApp();
            this.handleSplashScreen();
        } catch (error) {
            console.error("عذرًا، حدث خطأ غير متوقع أثناء تهيئة التطبيق:", error);
        }
    },

    /**
     * التحقق والتكامل البرمجي مع Telegram Mini App لقراءة الخصائص والمظهر
     */
    initTelegramMiniApp() {
        if (window.Telegram && window.Telegram.WebApp) {
            try {
                const tgWebApp = window.Telegram.WebApp;

                // إعلام تليجرام بأن المصغر جاهز تمامًا للعرض
                tgWebApp.ready();

                // تمديد الشاشة لأقصى ارتفاع متاح داخل التطبيق لتجربة غامرة
                tgWebApp.expand();

                // جلب ومواءمة ألوان ثيم تليجرام إن وجدت لتعزيز التناسق البصري
                if (tgWebApp.themeParams) {
                    this.syncTelegramTheme(tgWebApp.themeParams);
                }

                this.showToast("تم الاتصال بـ Telegram WebApp بنجاح");
            } catch (tgError) {
                console.warn("فشل في دمج خصائص Telegram الإضافية، تم تشغيل الوضع الافتراضي:", tgError);
            }
        }
    },

    /**
     * دالة لتحديث متغيرات الـ CSS بناءً على ألوان ثيم تليجرام
     */
    syncTelegramTheme(themeParams) {
        const rootElement = document.documentElement;
        if (themeParams.bg_color) {
            rootElement.style.setProperty('--bg-gradient', themeParams.bg_color);
        }
        if (themeParams.text_color) {
            rootElement.style.setProperty('--text-primary', themeParams.text_color);
        }
    },

    /**
     * محاكاة ذكية وإدارة حركة شاشة البداية وشريط التحميل والانتقال التلقائي
     */
    handleSplashScreen() {
        const splashScreen = document.getElementById('splashScreen');
        const loaderFill = document.getElementById('mainLoaderFill');

        if (!splashScreen) return;

        let progressValue = 0;
        
        // محاكاة تعبئة شريط التحميل لتصل إلى 100% خلال ثانيتين (2000ms)
        const progressInterval = setInterval(() => {
            progressValue += 5; 
            
            if (progressValue >= 100) {
                progressValue = 100;
                clearInterval(progressInterval);

                // الانتظار لمدة ثانية إضافية بعد اكتمال الـ 100% ليصبح المجموع الكلي حوالي 3 ثوانٍ
                setTimeout(() => {
                    this.fadeOut(splashScreen, () => {
                        this.goToPage('login.html');
                    });
                }, 1000);
            }

            // تحديث عرض شريط التحميل ديناميكيًا
            if (loaderFill) {
                loaderFill.style.width = `${progressValue}%`;
            }
        }, 100);
    },

    /**
     * دالة مساعدة لتلاشي العناصر تدريجيًا (Fade Out) ثم تنفيذ أمر لاحق (Callback)
     */
    fadeOut(element, callback) {
        if (!element) return;

        // إدراج تأثير التلاشي المتوافق مع حركات التطبيق العصري
        element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '0';

        // إخفاء العنصر تمامًا من واجهة العرض وتدشين الدالة التالية بعد انتهاء تأثير الـ CSS
        setTimeout(() => {
            element.style.display = 'none';
            if (typeof callback === 'function') {
                callback();
            }
        }, 600);
    },

    /**
     * دالة مساعدة للانتقال الآمن والمرن بين الصفحات دون توقف التطبيق
     */
    goToPage(url) {
        try {
            window.location.href = url;
        } catch (locationError) {
            console.error(`عجز النظام عن التوجيه تلقائيًا إلى الصفحة: ${url}`, locationError);
        }
    },

    /**
     * دالة مساعدة لإنشاء وإظهار رسائل تنبيهية مؤقتة (Toast) بأسلوب زجاجي أنيق
     */
    showToast(message) {
        try {
            // إزالة أي إشعار نشط حاليًا لمنع تضخم الواجهة
            const existingToast = document.querySelector('.custom-toast');
            if (existingToast) existingToast.remove();

            // بناء عنصر الإشعار برميًا ومينيماليًا لتأمين الاستقلالية الكلية
            const toast = document.createElement('div');
            toast.className = 'custom-toast';
            
            Object.assign(toast.style, {
                position: 'fixed',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%) translateY(20px)',
                background: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(16px)',
                webkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '16px',
                fontSize: '0.9rem',
                fontFamily: "'Cairo', sans-serif",
                zIndex: '10000',
                opacity: '0',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                textAlign: 'center',
                whiteSpace: 'nowrap'
            });

            toast.textContent = message;
            document.body.appendChild(toast);

            // تفعيل حركة الظهور الصاعد (Fade In & Slide Up)
            requestAnimationFrame(() => {
                toast.style.transform = 'translateX(-50%) translateY(0)';
                toast.style.opacity = '1';
            });

            // تدمير الإشعار وإزالته تلقائيًا بعد انقضاء 2.5 ثانية
            setTimeout(() => {
                toast.style.transform = 'translateX(-50%) translateY(-10px)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 400);
            }, 2500);

        } catch (toastError) {
            console.warn("لم نتمكن من عرض إشعار الـ Toast المساعد:", toastError);
        }
    }
};
