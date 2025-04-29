const addItemButton = document.getElementById('addItem');
const shoppingList = document.getElementById('shoppingList');

const loadItems = () => {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.forEach(item => addItem(item.text, item.completed));
};

const saveItems = () => {
    const items = [];
    shoppingList.querySelectorAll('li').forEach(li => {
        items.push({
            text: li.querySelector('.item-text').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('shoppingList', JSON.stringify(items));
};

const addItem = (text, completed = false) => {
    const li = document.createElement('li');
    li.className = `list-group-item d-flex justify-content-between align-items-center ${completed ? 'completed' : ''}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'me-2';
    checkbox.checked = completed;
    checkbox.addEventListener('click', () => {
        li.classList.toggle('completed');
        itemText.classList.toggle('text-decoration-line-through');
        saveItems();
    });

    const itemText = document.createElement('span');
    itemText.className = completed ? 'text-decoration-line-through item-text' : 'item-text';
    itemText.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Sil';
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveItems();
    });

    const contentDiv = document.createElement('div');
    contentDiv.className = 'd-flex align-items-center';
    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(itemText);

    li.appendChild(contentDiv);
    li.appendChild(deleteButton);

    shoppingList.appendChild(li);
};

document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById('itemInput');
    addItemButton.addEventListener('click', () => {
        const text = itemInput.value;
        if (text) {
            addItem(text);
            saveItems();
            itemInput.value = "";
        }
    });

    loadItems();
});
