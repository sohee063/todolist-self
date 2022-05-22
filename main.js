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
      filterList.splice(i, 1);
      render();
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
      filterList.splice(i, 1);
      render();
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
