/* ==========================================
   مشروع العراق الأخضر V2 - ملف التحكم بصفحة تسجيل الدخول (JavaScript)
   إدارة التحقق، الجلسات، والمصادقة | إصدار 2025–2026
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.init();
});

/**
 * الكائن المسؤول عن إدارة عمليات المصادقة والتحقق من المستخدم
 */
const AuthManager = {
    // عناصر الواجهة الأساسية
    form: null,
    feedbackEl: null,
    submitBtn: null,

    /**
     * دالة التهيئة وتفعيل الأحداث والتحقق من حالة الجلسة السابقة
     */
    init() {
        this.form = document.getElementById('authForm');
        this.feedbackEl = document.getElementById('authFeedback');
        this.submitBtn = document.getElementById('btnLogin');

        // إذا لم تكن عناصر الصفحة موجودة (تجنب توقف التطبيق)
        if (!this.form) return;

        // 1. التحقق التلقائي إذا كان المستخدم مسجلاً مسبقاً
        this.checkAuthStatus();

        // 2. تفعيل حدث إرسال الاستمارة
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // 3. تفعيل حدث زر إنشاء الحساب (اختياري للتوسيع)
        const btnCreateAccount = document.getElementById('btnCreateAccount');
        if (btnCreateAccount) {
            btnCreateAccount.addEventListener('click', () => {
                this.showMessage('ميزة إنشاء الحساب ستتوفر قريباً في التحديث القادم!', 'success');
            });
        }
    },

    /**
     * التحقق من وجود جلسة نشطة وتوجيه المستخدم تلقائياً
     */
    checkAuthStatus() {
        const activeUser = this.loadUser();
        if (activeUser) {
            // التوجيه المباشر إلى الصفحة الرئيسية في حال تسجيل الدخول المسبق
            this.goToPage('home.html');
        }
    },

    /**
     * معالجة حدث إرسال الاستمارة والتحكم في تأثير التحميل
     */
    async handleSubmit(e) {
        e.preventDefault();

        // جلب القيم من حقول الإدخال وتنظيف الفراغات
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const password = document.getElementById('userPassword').value;

        // إخفاء أي رسائل سابقة
        this.hideMessage();

        // التحقق من صحة البيانات مدخلاً مدخلاً
        const validation = this.validateForm(fullName, email, password);
        if (!validation.isValid) {
            this.showMessage(validation.message, 'error');
            return;
        }

        // تفعيل تأثير التحميل (Loading State)
        this.setLoading(true);

        try {
            // محاكاة الاتصال بالخادم أو قاعدة البيانات أو الـ API الخاص بـ Telegram Mini App
            // تستغرق المحاكاة 1.5 ثانية لإظهار التأثير البصري المتطور لعام 2026
            await new Promise(resolve => setTimeout(resolve, 1500));

            // بناء كائن المستخدم لحفظ البيانات
            const userData = {
                name: fullName,
                email: email,
                loginTime: new Date().getTime(),
                version: 'V2'
            };

            // حفظ البيانات محلياً والتوجه للصفحة الرئيسية
            this.saveUser(userData);
            this.showMessage('تم تسجيل الدخول بنجاح! جاري التوجيه...', 'success');

            setTimeout(() => {
                this.goToPage('home.html');
            }, 1000);

        } catch (error) {
            this.showMessage('حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة لاحقاً.', 'error');
            console.error("Auth Error:", error);
        } finally {
            // إيقاف تأثير التحميل في كل الأحوال
            this.setLoading(false);
        }
    },

    /**
     * دالة التحقق الشامل من صحة حقول الإدخال بالاعتماد على التعبيرات النمطية (Regex)
     */
    validateForm(fullName, email, password) {
        // التحقق من حقل الاسم الكامل (ثلاثي على الأقل أو يحتوي على مسافة)
        if (fullName.length < 6 || !fullName.includes(' ')) {
            return { isValid: false, message: 'يرجى إدخال الاسم الكامل (الاسم الثنائي أو الثلاثي).' };
        }

        // تعبير نمطي متطور للتحقق من هيكلية البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, message: 'صيغة البريد الإلكتروني غير صحيحة.' };
        }

        // التحقق من قوة كلمة المرور (على الأقل 6 خانات)
        if (password.length < 6) {
            return { isValid: false, message: 'يجب أن لا تقل كلمة المرور عن 6 رموز أو أرقام.' };
        }

        return { isValid: true, message: '' };
    },

    /**
     * إظهار رسائل الخطأ أو النجاح ديناميكياً داخل العنصر المخصص المدمج في الواجهة
     */
    showMessage(message, type) {
        if (!this.feedbackEl) return;

        this.feedbackEl.textContent = message;
        
        // تنظيف الكلاسات السابقة وإضافة الكلاس المناسب
        this.feedbackEl.className = 'feedback-message';
        this.feedbackEl.classList.add(type); 
        
        // إظهار العنصر بالتنسيق التلقائي
        this.feedbackEl.style.display = 'block';
    },

    /**
     * إخفاء رسالة التغذية الراجعة
     */
    hideMessage() {
        if (this.feedbackEl) {
            this.feedbackEl.style.display = 'none';
            this.feedbackEl.textContent = '';
        }
    },

    /**
     * التحكم بحالة زر تسجيل الدخول وإظهار مؤشر التحميل العصري
     */
    setLoading(isLoading) {
        if (!this.submitBtn) return;

        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.dataset.originalText = this.submitBtn.textContent;
            this.submitBtn.innerHTML = '<span class="button-spinner"></span> جاري التحقق...';
            this.submitBtn.style.opacity = '0.75';
            this.submitBtn.style.cursor = 'not-allowed';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = this.submitBtn.dataset.originalText || 'تسجيل الدخول';
            this.submitBtn.style.opacity = '1';
            this.submitBtn.style.cursor = 'pointer';
        }
    },

    /**
     * تخزين بيانات المستخدم مؤقتاً في ذاكرة المتصفح المحلية
     */
    saveUser(user) {
        try {
            localStorage.setItem('iraq_green_user', JSON.stringify(user));
        } catch (storageError) {
            console.warn("فشل التخزين في localStorage بسبب إعدادات الخصوصية:", storageError);
        }
    },

    /**
     * استدعاء وقراءة بيانات المستخدم المخزنة
     */
    loadUser() {
        try {
            const data = localStorage.getItem('iraq_green_user');
            return data ? JSON.parse(data) : null;
        } catch (storageError) {
            console.warn("تعذر الوصول إلى ذاكرة التخزين المحلية localStorage:", storageError);
            return null;
        }
    },

    /**
     * تسجيل الخروج التام، مسح البيانات المقترنة وتصفير الجلسة
     */
    logout() {
        try {
            localStorage.removeItem('iraq_green_user');
            this.goToPage('login.html');
        } catch (error) {
            console.error("فشل إتمام عملية تسجيل الخروج:", error);
        }
    },

    /**
     * دالة التوجيه والانتقال الآمن بين الصفحات
     */
    goToPage(url) {
        window.location.href = url;
    }
};
