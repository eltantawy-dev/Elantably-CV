'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}





const TELEGRAM_BOT_TOKEN = '7893120970:AAECHEM-3pCnTLDKEQraqdbiyTMkbQgAJAE'; // استبدل بـ token بوتك
const TELEGRAM_CHAT_ID = '8224428617'; // استبدل بـ chat id الخاص بك

// عناصر الصفحة
const telegramForm = document.getElementById('telegramForm');
const formMessage = document.getElementById('formMessage');

// تأكد إن الفورم موجود
if (telegramForm) {
  telegramForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    // جمع البيانات
    const formData = new FormData(this);

    const fullName = formData.get('name');
    const phone = formData.get('phone');
    const courseType = formData.get('course_type') || 'غير محدد';
    const englishLevel = formData.get('english_level');
    const message = formData.get('message') || 'لا توجد رسالة';

    // نص الرسالة
    const telegramText = `
🎓 *New Course Inquiry*
━━━━━━━━━━━━━━━━
👤 *Name:* ${fullName}
📞 *Phone:* ${phone}
━━━━━━━━━━━━━━━━
🎯 *Course Type:* ${courseType}
📊 *English Level:* ${englishLevel}
━━━━━━━━━━━━━━━━
💬 *Message:*
    ${message}
    ━━━━━━━━━━━━━━━━
        `.trim();

        try {
          const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramText,
                parse_mode: 'Markdown'
              })
            }
          );

          const result = await response.json();

          if (!result.ok) {
            throw new Error(result.description || 'Telegram error');
          }

          // نجاح
          showMessage('✅ تم إرسال البيانات بنجاح، سيتم التواصل معك قريبًا', 'success');
          this.reset();

        } catch (error) {
          console.error('Telegram Error:', error);

          // فشل
          showMessage('❌ حدثت مشكلة أثناء الإرسال، حاول مرة أخرى', 'error');

        } finally {
          // رجوع الزر
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      });
    }

    // ===== دالة إظهار الرسائل =====
    function showMessage(text, type) {
      if (!formMessage) return;

      formMessage.textContent = text;
      formMessage.className = `form-message ${type}`;
      formMessage.style.display = 'block';

      // منع تداخل التايمرات
      clearTimeout(window._formMessageTimer);

      window._formMessageTimer = setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
