const profileData = {
    accountname: 'cw206',
    dateofbirth: '08/15/2001',
    displayName: 'Eric Wang',
    email: 'cw206@rice.edu',
    phone: '123-456-7890',
    zipcode: '12345',
    password: 'password123'
};

function initializeProfile() {
    document.getElementById('current-accountname').textContent = profileData.accountname;
    document.getElementById('current-dateofbirth').textContent = profileData.dateofbirth;
    document.getElementById('current-display-name').textContent = profileData.displayName;
    document.getElementById('current-email').textContent = profileData.email;
    document.getElementById('current-phone').textContent = profileData.phone;
    document.getElementById('current-zipcode').textContent = profileData.zipcode;
    document.getElementById('current-password').textContent = '*'.repeat(profileData.password.length);
}

function validateInput(input, type) {
    const value = input.value.trim();
    switch (type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case 'phone':
            return /^\d{3}-\d{3}-\d{4}$/.test(value);
        case 'zipcode':
            return /^\d{5}$/.test(value);
        default:
            return value !== '';
    }
}

function updateProfile() {
    const accountname = document.getElementById('accountname');
    const dateofbirth = document.getElementById('dateofbirth');
    const displayName = document.getElementById('display-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const zipcode = document.getElementById('zipcode');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const message = document.getElementById('message');

    let changes = [];
    let isValid = true;
    let errorMessage = '';

    // 处理 Display Name
    if (displayName.value && displayName.value !== profileData.displayName) {
        changes.push(`Display Name: ${profileData.displayName} -> ${displayName.value}`);
        profileData.displayName = displayName.value;
    }

    // 处理 Email
    if (email.value) {
        if (validateInput(email, 'email')) {
            if (email.value !== profileData.email) {
                changes.push(`Email: ${profileData.email} -> ${email.value}`);
                profileData.email = email.value;
            }
        } else {
            errorMessage += 'Invalid email format. ';
            isValid = false;
        }
    }

    // 处理 Phone
    if (phone.value) {
        if (validateInput(phone, 'phone')) {
            if (phone.value !== profileData.phone) {
                changes.push(`Phone: ${profileData.phone} -> ${phone.value}`);
                profileData.phone = phone.value;
            }
        } else {
            errorMessage += 'Invalid phone format (use XXX-XXX-XXXX). ';
            isValid = false;
        }
    }

    // 处理 Zipcode
    if (zipcode.value) {
        if (validateInput(zipcode, 'zipcode')) {
            if (zipcode.value !== profileData.zipcode) {
                changes.push(`Zipcode: ${profileData.zipcode} -> ${zipcode.value}`);
                profileData.zipcode = zipcode.value;
            }
        } else {
            errorMessage += 'Invalid zipcode format (use 5 digits). ';
            isValid = false;
        }
    }

    // 处理 Password
    if (password.value) {
        if (password.value === confirmPassword.value) {
            changes.push(`Password: ${'*'.repeat(profileData.password.length)} -> ${'*'.repeat(password.value.length)}`);
            profileData.password = password.value;
        } else {
            errorMessage += 'Passwords do not match. ';
            isValid = false;
        }
    }

    // 判断是否有效并更新
    if (isValid) {
        if (changes.length > 0) {
            message.innerHTML = 'Updated fields:<br>' + changes.join('<br>'); // 用 innerHTML 保证换行显示
            initializeProfile();
        } else {
            message.textContent = 'No changes made';
        }

        // 清空输入字段
        [displayName, email, phone, zipcode, password, confirmPassword].forEach(input => input.value = '');
    } else {
        message.textContent = errorMessage.trim();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    document.getElementById('update-button').addEventListener('click', updateProfile);
});