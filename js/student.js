class Student {
  constructor({
    name = "",
    lastname = "",
    age = 0,
    subjects = [],
    grades = {},
  }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.subjects = subjects;
    this.grades = grades;
  }

  assignSubject(subject) {
    this.subjects.push(subject);
    this.grades[subject] = 0;
  }

  assignGradeToSubject(subject, grade) {
    this.grades[subject] = grade;
  }

  registerSubjectAndGrade(subject, grade) {
    this.assignSubject(subject);
    this.assignGradeToSubject(subject, grade);
  }
}
