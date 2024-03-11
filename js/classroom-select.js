const db = new DB();

const tableStudents = document.getElementById("table-students-body");
const title = document.getElementById("title");

const classroom = db.getClassroomSelected();
const students = db.readDataStudentsByClassroomSelected() ?? [];

title.innerText = classroom.name;

const searchStudentByName = (name) =>
  students.filter(
    (student) => student.name.toLowerCase() == name.toLowerCase()
  );

const searchStudentByLastname = (lastname) =>
  students.filter(
    (student) => student.lastname.toLowerCase() == lastname.toLowerCase()
  );

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

const sortAscendingAge = () => {
  const studentsToOrder = [...students];
  studentsToOrder.sort((a, b) => a.age - b.age);

  resetDataTable();
  setDataTableStudents(studentsToOrder);
};

const calculateAverage = (grades = {}) => {
  const gradesValues = Object.values(grades);
  if (gradesValues.length == 0) return 0;
  return (
    gradesValues.reduce((total, grade) => total + Number(grade), 0) /
    gradesValues.length
  );
};

const calculateAverageClassroom = () => {
  const averageStudents = students.reduce(
    (acc, student) => acc + calculateAverage(student.grades),
    0
  );
  const average = averageStudents / students.length;
  alert(`El promedio del grupo es ${average}`);
};

const mapGrade = (grades) => {
  const keys = Object.keys(grades);
  let data = "";
  keys.forEach((key) => {
    data += `${key}: ${grades[key]}\n`;
  });
  return data;
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

setDataTableStudents(students);

const searchByName = () => {
  const data = prompt("Introduce el nombre");
  console.log(data);
  if (!data || data.length === 0) {
    resetTableAll();
    return;
  }
  const results = searchStudentByName(data);

  console.log("Resultados", results);
  resetDataTable();
  setDataTableStudents(results);
};

const searchByLastname = () => {
  const data = prompt("Introduce el apellido");
  if (!data || data.length === 0) {
    resetTableAll();
    return;
  }
  const results = searchStudentByLastname(data);

  console.log(results);
  resetDataTable();
  setDataTableStudents(results);
};

const resetDataTable = () => {
  tableStudents.innerHTML = "";
};

const resetTableAll = () => {
  window.location = "classroom-selected.html";
};
