const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

const loadStudents = () => {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.studentNumber}</td>
                    <td>${student.class}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Sil</button>
                    </td>
                `;
        studentList.appendChild(row);
    });
};

const deleteStudent = (index) => {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
};

document.addEventListener('DOMContentLoaded', () => {
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(studentForm);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const studentNumber = formData.get('studentNumber');
        const className = formData.get('class');

        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ firstName, lastName, studentNumber, class: className });
        localStorage.setItem('students', JSON.stringify(students));

        studentForm.reset();
        loadStudents();
    });
    loadStudents();
});