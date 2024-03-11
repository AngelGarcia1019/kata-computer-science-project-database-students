const db = new DB();

const formRegister = document.getElementById("formRegister");

const tableStudents = document.getElementById("table-students-body");

const students = db.readDataStudents() ?? [];

const calculateAverage = (grades = {}) => {
  const gradesValues = Object.values(grades);
  if (gradesValues.length == 0) return 0;
  return (
    gradesValues.reduce((total, grade) => total + Number(grade), 0) /
    gradesValues.length
  );
};

const mapGrade = (grades) => {
  const keys = Object.keys(grades);
  let data = "";
  keys.forEach((key) => {
    data += `${key}: ${grades[key]}\n`;
  });
  return data;
};

const sortAscendingAverage = () => {
  const studentsToOrder = [...students];
  studentsToOrder.sort(
    (a, b) => calculateAverage(a.grades) - calculateAverage(b.grades)
  );
  resetDataTable();
  setDataTableStudents(studentsToOrder);
};

const sortDescendingAverage = () => {
  const studentsToOrder = [...students];
  studentsToOrder.sort(
    (a, b) => calculateAverage(b.grades) - calculateAverage(a.grades)
  );
  resetDataTable();
  setDataTableStudents(studentsToOrder);
};

function setDataTableStudents(elements = []) {
  tableStudents.innerHTML =
    elements.length == 0
      ? ""
      : elements.reduce((data, student) => {
          const average =
            student.subjects.length != 0
              ? calculateAverage(student.grades)
              : "NA";
          data += `<tr>
          <th class='text-center'>${student.id}</th>
          <td class='text-center'>${student.name}</td>
          <td class='text-center'>${student.lastname}</td>
          <td class='text-center'>${student.age}</td>
          <td class='text-center'>${
            student.subjects.length != 0
              ? mapGrade(student.grades)
              : "Sin calificaciones"
          }</td>
          <td class='text-center'>${average}</td>
      </tr>`;
          return data;
        }, tableStudents.innerHTML);
}

console.log(students);

setDataTableStudents(students);

formRegister?.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {};
  for (let el of formRegister.elements) {
    if (el.name.length > 0) {
      data[el.name] = el.value;
    }
  }

  const registeredStutend = new Student(data);
  db.registerStudent(registeredStutend);
  window.location = "students.html";
});

const searchByName = () => {
  const data = prompt("Introduce el nombre");
  console.log(data);
  if (!data || data.length === 0) {
    resetTableAll();
    return;
  }
  const results = db.searchStudentByName(data);

  console.log("Resultados", results);
  resetTableAll();
  setDataTableStudents(results);
};

const searchByLastname = () => {
  const data = prompt("Introduce el apellido");
  if (!data || data.length === 0) {
    resetTableAll();
    return;
  }
  const results = db.searchStudentByLastname(data);

  console.log(results);
  resetTableAll();
  setDataTableStudents(results);
};

const resetTableAll = () => {
  window.location = "students.html";
};

const resetDataTable = () => {
  tableStudents.innerHTML = "";
};
