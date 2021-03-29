"use strict";

dayjs.extend(window.dayjs_plugin_isBetween);
dayjs.extend(window.dayjs_plugin_isToday);

function Task(id, description, important = false, priv = true, deadline = undefined) {
  this.id = id;
  this.description = description;
  this.important = important;
  this.priv = priv;
  this.deadline = deadline;
}

function TaskList() {
  this.list = [];

  this.init = () => {
    this.list.push(
      new Task(2, "Monday lab", false, false, "2021-04-09"),
      new Task(3, "Phone call", true, false, "2021-03-08"),
      new Task(1, "Laundry"),
      new Task(4, "Eat Lasagne ", true, true, dayjs().format("YYYY-MM-DD")), //test today
      new Task(5, "Check Instagram", true, true, "2021-03-30")
    );
  };

  this.getAll = () => {
    return this.list;
  };
  this.getImportant = () => {
    return this.list.filter((task) => task.important == true);
  };

  this.getPrivate = () => {
    return this.list.filter((task) => task.priv == true);
  };

  this.get7Days = () => {
    const today = dayjs().format("YYYY/MM/DD");
    const nextWeek = dayjs().add(7, "day");
    return this.list.filter((task) => dayjs(task.deadline).isBetween(today, nextWeek));
  };
  this.getToday = () => {
    return this.list.filter((task) => dayjs(task.deadline).isToday());
  };
}

function clearActiveFilter() {
  document.querySelector(".active").classList.remove("active");
}

function initFilterListeners() {
  const filterAll = document.querySelector("#filter-all");
  const filterToday = document.querySelector("#filter-today");
  const filterImportant = document.querySelector("#filter-important");
  const filter7days = document.querySelector("#filter-7day");
  const filterPrivate = document.querySelector("#filter-private");

  filterAll.addEventListener("click", (event) => {
    const filteredTasks = taskList.getAll();
    clearActiveFilter();
    filterAll.classList.add("active");
    clearTasks();
    insertTask(filteredTasks, "All");
  });

  filter7days.addEventListener("click", (event) => {
    const filteredTasks = taskList.get7Days();
    clearActiveFilter();
    filter7days.classList.add("active");
    clearTasks();
    insertTask(filteredTasks, "Next 7 Days");
  });

  filterToday.addEventListener("click", (event) => {
    const filteredTasks = taskList.getToday();
    clearActiveFilter();
    filterToday.classList.add("active");
    clearTasks();
    insertTask(filteredTasks, "Today");
  });

  filterImportant.addEventListener("click", (event) => {
    const filteredTasks = taskList.getImportant();
    clearActiveFilter();
    filterImportant.classList.add("active");
    clearTasks();
    insertTask(filteredTasks, "Important");
  });

  filterPrivate.addEventListener("click", (event) => {
    const filteredTasks = taskList.getPrivate();
    document.querySelector(".active").classList.remove("active");
    filterPrivate.classList.add("active");
    clearTasks();
    insertTask(filteredTasks, "Private");
  });
}

function createTaskRow(task) {
  return `<li class="task-item list-group-item">
  <div class="custom-control custom-checkbox task-data">
    <input type="checkbox" class="custom-control-input" id="${task.id}" />
    <label class="custom-control-label ${task.important ? "task-important" : ""}" for="${task.id}">${
    task.description
  }</label>
  </div>
 ${
   task.priv
     ? `<div class="task-data"> <svg
   xmlns="http://www.w3.org/2000/svg"
   width="16"
   height="16"
   fill="currentColor"
   class="bi bi-eye-fill"
   viewBox="0 0 16 16"
 >
   <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
   <path
     d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
   />
 </svg>
</div>`
     : ""
 }
  ${task.deadline ? `<div class="task-data">${task.deadline}</div>` : `<div class="task-data"></div>`}
</li>`;
}

function insertTask(filteredTasks, activeFilter = "All") {
  const tasksList = document.querySelector("#tasks-list");
  const filterTitle = document.querySelector("#filter-title");
  filterTitle.innerText = activeFilter;
  for (const task of filteredTasks) {
    // creare la riga della tabella
    const taskRow = createTaskRow(task);
    // aggiungiamo la riga nella pagina
    // MODO 1
    tasksList.insertAdjacentHTML("afterbegin", taskRow);
  }
}

function clearTasks() {
  document.querySelector("#tasks-list").innerHTML = "";
}

const taskList = new TaskList();
taskList.init();
const task = taskList.getAll();
insertTask(task);
initFilterListeners();
