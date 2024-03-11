const db = new DB();

const options = document.getElementById("students-options");
const form = document.getElementById("formRegisterSubject");

const students = db.readDataStudents() ?? [];
let student = null;

options.innerHTML = students.map(
  (student) => `
  <option value="${student.id}">${student.name} ${student.lastname}</option>
`
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let data = {};
  for (let el of form.elements) {
    if (el.name.length > 0) {
      data[el.name] = el.value;
    }
  }

  data["id"] = options.value;

  db.registerSubjectAndGradeToStudent(data);
});
