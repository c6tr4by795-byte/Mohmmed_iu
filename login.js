document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formFeedback = document.getElementById('formFeedback');
    
    const btnSubmit = document.getElementById('btnSubmit');

    // دالة التحقق من صحة البريد الإلكتروني
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    // تنظيف رسائل الأخطاء عند الكتابة
    emailInput.addEventListener('input', () => {
        emailError.textContent = '';
        emailInput.style.borderColor = '';
    });

    passwordInput.addEventListener('input', () => {
        passwordError.textContent = '';
        passwordInput.style.borderColor = '';
    });

    // معالجة إرسال النموذج
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // إعادة تعيين الحالات السابقة
        let isValid = true;
        emailError.textContent = '';
        passwordError.textContent = '';
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = '';

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value;

        // التحقق من حقل البريد الإلكتروني
        if (!emailValue) {
            emailError.textContent = 'يرجى إدخال البريد الإلكتروني.';
            emailInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else if (!validateEmail(emailValue)) {
            emailError.textContent = 'صيغة البريد الإلكتروني غير صحيحة.';
            emailInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        }

        // التحقق من حقل كلمة المرور
        if (!passwordValue) {
            passwordError.textContent = 'يرجى إدخال كلمة المرور.';
            passwordInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else if (passwordValue.length < 6) {
            passwordError.textContent = 'يجب أن تتكون كلمة المرور من 6 رموز على الأقل.';
            passwordInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        }

        // إذا كانت المدخلات غير صالحة، توقف هنا
        if (!isValid) return;

        // تفعيل حالة التحميل (Loading State)
        btnSubmit.classList.add('loading');
        btnSubmit.disabled = true;
        emailInput.disabled = true;
        passwordInput.disabled = true;

        try {
            // محاكاة طلب خادم (API Call) يستغرق ثانية ونصف
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // محاكاة التحقق الناجح (يمكن استبداله بربط حقيقي لاحقاً)
            if (emailValue === 'test@iraqgreen.com' && passwordValue === '123456') {
                formFeedback.textContent = 'تم تسجيل الدخول بنجاح! جاري التوجيه...';
                formFeedback.classList.add('success');
                
                // حفظ جلسة عمل تجريبية في المتصفح
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', emailValue);

                // التوجيه إلى الصفحة الرئيسية للمنصة بعد ثانية واحدة
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            } else {
                // في حال كانت البيانات غير مطابقة للمحاكاة التجريبية
                // سنمرر الحساب كحساب جديد مسجل تلقائياً لتسهيل التجربة والتطوير المباشر
                formFeedback.textContent = 'تم التعرف على الحساب التجريبي. جاري التوجيه...';
                formFeedback.classList.add('success');
                
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', emailValue);

                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            }

        } catch (error) {
            formFeedback.textContent = 'حدث خطأ في الاتصال، يرجى المحاولة مرة أخرى.';
            formFeedback.classList.add('error');
            
            // إلغاء حالة التحميل في حال حدوث خطأ
            btnSubmit.classList.remove('loading');
            btnSubmit.disabled = false;
            emailInput.disabled = false;
            passwordInput.disabled = false;
        }
    });
});
