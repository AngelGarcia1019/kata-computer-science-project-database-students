const db = new DB();

const optionsStudents = document.getElementById("students-options");
const optionsClassrooms = document.getElementById("students-classrooms");
const btnAdd = document.getElementById("btnAdd");

const form = document.getElementById("formRegister");

const students = db.readDataStudents() ?? [];
const classrooms = db.readDataClassRooms() ?? [];

if (students.length === 0) {
  optionsStudents.innerHTML = `
      <option selected value="0">No hay estudiantes registrados</option>
    `;
  btnAdd.style.display = "none";
} else {
  optionsStudents.innerHTML = students.map(
    (student) => `
        <option value="${student.id}">${student.name} ${student.lastname}</option>
        `
  );
  btnAdd.style.display = "";
}

if (classrooms.length == 0) {
  optionsClassrooms.innerHTML = `
        <option selected value="0">No hay grupos registrados</option>
        `;
  btnAdd.style.display = "none";
} else {
  optionsClassrooms.innerHTML = classrooms.map(
    (classroom) => `
      <option value="${classroom.id}">${classroom.name}</option>
    `
  );
  btnAdd.style.display = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {};

  data["student_id"] = optionsStudents.value;
  data["classroom_id"] = optionsClassrooms.value;

  console.log(data);

  db.registerStudentToClassroom(data);
});
