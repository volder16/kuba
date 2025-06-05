// ��������� �������� DOM
const briefModal = document.getElementById('briefModal');
const openBriefFormBtn = document.getElementById('openBriefFormBtn');
const closeModalBtn = document.getElementById('closeModalBtn'); // ������ ��������� ������ ��������
const contactForm = document.getElementById('contactForm'); // ��������� �����
const successMessage = document.getElementById('successMessage'); // ��������� �������� �����������
const currentYearSpan = document.getElementById('currentYear'); // ������� ��� ����

// ������� ��� �������� ���������� ����
function openModal() {
    if (briefModal) {
        briefModal.style.display = 'flex'; // �������� �������� ���� �� flex-���������
        // �������� ����� �� ������������ ����������� ��� ���� ��� ������� �������
        if (contactForm) contactForm.reset();
        if (successMessage) successMessage.classList.add('hidden');
    }
}

// ������� ��� �������� ���������� ����
function closeModal() {
    if (briefModal) {
        briefModal.style.display = 'none'; // ��������� �������� ����
    }
}

// ������������ ��������� ����, ���� �������� �������
if (openBriefFormBtn) {
    openBriefFormBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// ������� �������� ����, ���� ��� ���� ���� ������
window.addEventListener('click', (event) => {
    if (event.target === briefModal) {
        closeModal();
    }
});

// ������� �������� �����
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // �������� ���������� �������� �����

        // ��� ����� ������ ����� ��� �������� ����� �� ������ (���������, ����� fetch API)
        console.log('����� ����������!');

        // �������� ��� �����
        const formData = new FormData(this);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        console.log('��� �����:', data);

        // �������� ����������� ��� ����
        if (successMessage) {
            successMessage.classList.remove('hidden');
        }

        // �������� ����� ���� �������� ��������, ��� ���������� ����� �������� �����������
        // ��� ����� ��������� �������� ���� � ������� ����� ���� ����, �� ���������� ����� �����������
        // ��� ��������, ���� �� ������ �������� � �������.
        // closeModal(); // ����� ��������� ������ ��� ���� �����������
        // this.reset(); // �������� �����

        // ����� ������� ���, ��� ����������� ������� ����� ������ ���, � ���� ����������� �������� ����
        setTimeout(() => {
            if (successMessage) {
                successMessage.classList.add('hidden');
            }
            closeModal();
            this.reset();
        }, 3000); // ������� ����� 3 �������
    });
}

// ������������ ��������� ���� � �����
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// ������� ����� ��� ������ �������� (���� �� ��������������� scroll-smooth � Tailwind CSS)
// ���� scroll-smooth ������, ��� ��� �� ����'�������.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hrefAttribute = this.getAttribute('href');
        // ����������, �� ��������� �� � ������ "#" (����� ��������������� ��� ��������)
        if (hrefAttribute && hrefAttribute.length > 1) {
            const targetElement = document.querySelector(hrefAttribute);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

