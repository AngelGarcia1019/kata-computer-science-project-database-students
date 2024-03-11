class ClassRoom {
  constructor({ name }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.students = [];
  }

  add(student) {
    this.students.push(student);
    this.saveData();
  }

  searchStudentByName = (name) => [];
  searchStudentByLastName = (lastname) => [];
  getAverageByStudent = (numControl) => 0;
  getAverageByClassRoom = () => 0;
  getStudentsOrderAscending = () => [];
  getStudentsOrderDescendingByGrades = () => [];
  getStudentsByAverage = (average) => [];
}
