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

    if (displayName.value && displayName.value !== profileData.displayName) {
        changes.push(`Display Name: ${profileData.displayName} -> ${displayName.value}`);
        profileData.displayName = displayName.value;
    }

    if (email.value) {
        if (validateInput(email, 'email')) {
            if (email.value !== profileData.email) {
                changes.push(`Email: ${profileData.email} -> ${email.value}`);
                profileData.email = email.value;
            }
        } else {
            message.textContent = 'Invalid email format';
            isValid = false;
        }
    }

    if (phone.value) {
        if (validateInput(phone, 'phone')) {
            if (phone.value !== profileData.phone) {
                changes.push(`Phone: ${profileData.phone} -> ${phone.value}`);
                profileData.phone = phone.value;
            }
        } else {
            message.textContent = 'Invalid phone format (use XXX-XXX-XXXX)';
            isValid = false;
        }
    }

    if (zipcode.value) {
        if (validateInput(zipcode, 'zipcode')) {
            if (zipcode.value !== profileData.zipcode) {
                changes.push(`Zipcode: ${profileData.zipcode} -> ${zipcode.value}`);
                profileData.zipcode = zipcode.value;
            }
        } else {
            message.textContent = 'Invalid zipcode format (use 5 digits)';
            isValid = false;
        }
    }

    if (password.value) {
        if (password.value === confirmPassword.value) {
            changes.push(`Password: ${'*'.repeat(profileData.password.length)} -> ${'*'.repeat(password.value.length)}`);
            profileData.password = password.value;
        } else {
            message.textContent = 'Passwords do not match';
            isValid = false;
        }
    }

    if (isValid) {
        if (changes.length > 0) {
            message.textContent = 'Updated fields:\n' + changes.join('\n');
            initializeProfile();
        } else {
            message.textContent = 'No changes made';
        }
        
        // Clear input fields
        [displayName, email, phone, zipcode, password, confirmPassword].forEach(input => input.value = '');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    document.getElementById('update-button').addEventListener('click', updateProfile);
});