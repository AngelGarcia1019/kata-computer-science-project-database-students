class DB {
  constructor() {
    this.keyStudents = "students";
    this.keyClassrooms = "classrooms";
    this.keyClassroomSelected = "classroomsSelected";
    this.students = this.readDataStudents();
    this.classrooms = this.readDataClassRooms();
  }

  registerStudent(student) {
    this.students.push(student);
    this.saveDataStudents();
  }

  registerClassRoom(classRoom) {
    this.classrooms.push(classRoom);
    this.saveDataClassRooms();
  }

  saveDataStudents() {
    localStorage.setItem(this.keyStudents, JSON.stringify(this.students));
  }

  saveDataClassRooms() {
    localStorage.setItem(this.keyClassrooms, JSON.stringify(this.classrooms));
  }

  readDataStudents = () =>
    JSON.parse(localStorage.getItem(this.keyStudents) ?? "[]");

  readDataStudentsByClassroom = (classRoom_id) =>
    this.searchClassroomById(classRoom_id).students;

  saveClassroomSelected = (classRoom_id) =>
    localStorage.setItem(this.keyClassroomSelected, classRoom_id);

  getClassroomSelected = () =>
    this.searchClassroomById(localStorage.getItem(this.keyClassroomSelected));

  readDataStudentsByClassroomSelected = () =>
    this.searchClassroomById(localStorage.getItem(this.keyClassroomSelected))
      .students;

  readDataClassRooms = () =>
    JSON.parse(localStorage.getItem(this.keyClassrooms) ?? "[]");

  registerSubjectAndGradeToStudent({ id, subject, grade }) {
    const student = this.searchStudentById(id);
    student.subjects.push(subject);
    student.grades[subject] = grade;
    this.saveDataStudents();

    const classroomsStudent = this.classrooms.filter((classroom) =>
      classroom.students.filter((student) => student.id == id)
    );

    classroomsStudent.forEach((classRoomOfStudent) => {
      const studentsUpdated = classRoomOfStudent.students.map(
        (studentClass) => {
          if (studentClass.id == id) {
            studentClass.subjects = [...student.subjects];
            studentClass.grades = { ...student.grades };
          }
          return studentClass;
        }
      );
      classRoomOfStudent.students = studentsUpdated;
    });

    console.log(classroomsStudent);
    this.classrooms = classroomsStudent;
    this.saveDataClassRooms();
    window.location = "index.html";
  }

  registerStudentToClassroom({ classroom_id, student_id }) {
    const classroom = this.searchClassroomById(classroom_id);
    const studentFilter = classroom.students.filter(
      (student) => student.id == student_id
    );
    if (studentFilter.length > 0) {
      alert("Alumno ya registrado en el grupo");
      return;
    }
    classroom.students.push(this.searchStudentById(student_id));
    this.saveDataClassRooms();
    window.location = "index.html";
  }

  searchStudentById = (id) =>
    this.students.filter((student) => student.id == id)[0] ?? null;

  searchClassroomById = (id) =>
    this.classrooms.filter((classroom) => classroom.id == id)[0] ?? null;

  // Extras for
  searchStudentByName = (name) =>
    this.students.filter(
      (student) => student.name.toLowerCase() == name.toLowerCase()
    );

  searchStudentByLastname = (lastname) =>
    this.students.filter(
      (student) => student.lastname.toLowerCase() == lastname.toLowerCase()
    );
}
