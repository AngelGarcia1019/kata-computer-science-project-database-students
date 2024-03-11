const db = new DB();

const formRegisterClassRoom = document.getElementById("formRegister");

const tableClassRooms = document.getElementById("table-classrooms-body");

const classrooms = db.readDataClassRooms() ?? [];

console.log(classrooms);

function selectClassroom(id) {
  console.log(id);
  db.saveClassroomSelected(id);
  window.location = "classroom-selected.html";
}

tableClassRooms.innerHTML =
  classrooms.length == 0
    ? ""
    : classrooms.reduce((data, classRoom) => {
        data += `<tr>
        <th class="text-center">${classRoom.id}</th>
        <td class='text-center'>${classRoom.name}</td>
        <td class='text-center'>${classRoom.students.length}</td>
        <td class='text-center'>
          <button class='btn btn-primary' onclick="selectClassroom('${classRoom.id}')"> Ver estudiantes </button>
        </td>
    </tr>`;
        return data;
      }, tableClassRooms.innerHTML);

formRegisterClassRoom?.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {};
  for (let el of formRegister.elements) {
    if (el.name.length > 0) {
      data[el.name] = el.value;
    }
  }

  const classRoom = new ClassRoom(data);
  db.registerClassRoom(classRoom);
  window.location = "classrooms.html";
});
