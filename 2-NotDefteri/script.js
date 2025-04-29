const noteList = document.getElementById('note-list');

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const saveButton = document.createElement('button');
        saveButton.className = 'btn btn-sm btn-success me-2';
        saveButton.textContent = 'Kaydet';
        saveButton.addEventListener('click', () => {
            const updatedNote = li.querySelector('.note-text').textContent;
            notes[index] = updatedNote;
            localStorage.setItem('notes', JSON.stringify(notes));
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm btn-danger';
        deleteButton.textContent = 'Sil';
        deleteButton.addEventListener('click', () => {
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
        });

        const btnContainer = document.createElement('div');
        btnContainer.appendChild(saveButton);
        btnContainer.appendChild(deleteButton);

        li.innerHTML = `
            <span contenteditable="true" class="note-text">${note}</span>
        `;
        li.appendChild(btnContainer);
        noteList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note');



    addNoteButton.addEventListener('click', () => {
        const note = noteInput.value;
        if (note) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            loadNotes();
        }
    });

    loadNotes();
});