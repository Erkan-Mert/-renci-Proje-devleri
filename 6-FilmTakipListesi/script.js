const filmList = document.getElementById('filmList');
let editIndex = null;

const loadFilms = () => {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    filmList.innerHTML = '';
    films.forEach((film, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
                    <div>
                        <strong>${film.name}</strong> - ${film.genre} (${film.date})
                        ${film.watched ? '<span class="badge bg-success ms-2">İzlendi</span>' : ''}
                    </div>
                    <div>
                        <button class="btn btn-sm btn-success me-2" onclick="markAsWatched(${index})">İzlendi</button>
                        <button class="btn btn-sm btn-warning me-2" onclick="editFilm(${index})">Düzenle</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteFilm(${index})">Sil</button>
                    </div>
                `;
        filmList.appendChild(li);
    });
};

const markAsWatched = (index) => {
    const films = JSON.parse(localStorage.getItem('films'));
    films[index].watched = !films[index].watched;
    localStorage.setItem('films', JSON.stringify(films));
    loadFilms();
};

const editFilm = (index) => {
    const films = JSON.parse(localStorage.getItem('films'));
    const film = films[index];
    document.getElementById('filmName').value = film.name;
    document.getElementById('filmGenre').value = film.genre;
    document.getElementById('filmDate').value = film.date;
    editIndex = index;
    document.querySelector('button[type="submit"]').textContent = 'Düzenle';
};

const deleteFilm = (index) => {
    const films = JSON.parse(localStorage.getItem('films'));
    films.splice(index, 1);
    localStorage.setItem('films', JSON.stringify(films));
    loadFilms();
};

document.addEventListener('DOMContentLoaded', () => {
    const filmForm = document.getElementById('filmForm');
    filmForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(filmForm);
        const name = formData.get('filmName');
        const genre = formData.get('filmGenre');
        const date = formData.get('filmDate');

        const films = JSON.parse(localStorage.getItem('films')) || [];
        if (editIndex !== null) {
            films[editIndex] = { name, genre, date, watched: films[editIndex].watched };
            editIndex = null;
        } else {
            films.push({ name, genre, date, watched: false });
        }
        localStorage.setItem('films', JSON.stringify(films));

        filmForm.reset();
        loadFilms();
    });

    filmForm.addEventListener('reset', () => {
        document.querySelector('#submit').textContent = 'Ekle';
    });

    loadFilms();
});