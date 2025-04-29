const form = document.getElementById('transaction-form');
const balanceEl = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateUI() {
    transactionList.innerHTML = '';
    let balance = 0;

    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${transaction.description}</td>
                    <td>${transaction.amount} ₺</td>
                    <td style="color: ${transaction.type === 'income' ? 'green' : 'red'};">${transaction.type === 'income' ? 'Gelir' : 'Gider'}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Sil</button></td>
                `;
        transactionList.appendChild(row);

        balance += transaction.type === 'income' ? transaction.amount : -transaction.amount;
    });

    balanceEl.textContent = balance;
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;

        transactions.push({ description, amount, type });
        form.reset();
        updateUI();
    });

    updateUI();
});