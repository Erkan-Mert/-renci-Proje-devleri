const passwordForm = document.getElementById('passwordForm');
const passwordList = document.getElementById('passwordList');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

function displayPasswords() {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwordList.innerHTML = '';
    passwords.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
                    <div>
                        <strong>Site:</strong> ${entry.siteName} <br>
                        <strong>Kullanıcı Adı:</strong> ${entry.username} <br>
                        <strong>Şifre:</strong> <span class="masked-password" id="password-${index}">${'*'.repeat(entry.password.length)}</span>
                        <button class="btn btn-outline-secondary btn-sm ms-2" onclick="toggleSavedPassword(${index})">Göster</button>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="deletePassword(${index})">Sil</button>
                `;
        passwordList.appendChild(listItem);
    });
}

function toggleSavedPassword(index) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const passwordSpan = document.getElementById(`password-${index}`);
    const currentText = passwordSpan.textContent;

    if (currentText.startsWith('*')) {
        passwordSpan.textContent = passwords[index].password;
    } else {
        passwordSpan.textContent = '*'.repeat(passwords[index].password.length);
    }
}

function deletePassword(index) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.splice(index, 1);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    displayPasswords();
}

document.addEventListener('DOMContentLoaded', () => {
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = 'Gizle';
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = 'Göster';
        }
    });

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(passwordForm);
        const siteName = formData.get('siteName');
        const username = formData.get('username');
        const password = formData.get('password');

        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push({ siteName, username, password });
        localStorage.setItem('passwords', JSON.stringify(passwords));

        displayPasswords();
        passwordForm.reset();
    });
    displayPasswords();
});