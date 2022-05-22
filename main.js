// 1. 입력창에 할일을 입력하고 +버튼을 누르면 할일 목록에 추가가 된다.
// 2. delete버튼을 누르면 할일이 리스트에서 삭제가 된다.
// 3. check버튼을 누르면 할일이 끝난 것으로 간주하고 밑줄이 간다. check 버튼이 되돌리기 버튼으로 변경 된다.
// 4. 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 5. 진행중/끝남 상태로 나누어서 볼 수 있다.
// 6. 모바일 반응형 웹이다.

let addButton = document.getElementById("add-button");
let taskInput = document.getElementById("task-input");
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
let filterList = [];
let taskList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
addButton.addEventListener("click", addTask);
let checkBtn = document.getElementById("checked");
taskInput.addEventListener("focus", blank);
taskInput.addEventListener("keypress", enter);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
       
        <div>
          <button onclick="toggleComplete('${list[i].id}')" id="done" class="enter"><i class="fa-solid fa-arrow-rotate-right"></i></button>
          <button onclick="deleteTask('${list[i].id}')" class="enter"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
      <button onclick="toggleComplete('${list[i].id}')" id ="done" class="enter"><i class="fa-solid fa-check"></i></button>
      <button onclick="deleteTask('${list[i].id}')" class="enter"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  //   let deleteList = [];
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
    }
  }
  render();
}

function filter(event) {
  console.log("filter클릭댐", event.target.id);
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function enter() {
  if (window.event.keyCode === 13) {
    addTask();
    console.log("엔터!");
    taskInput.value = "";
  }
}

function blank() {
  taskInput.value = "";
}
