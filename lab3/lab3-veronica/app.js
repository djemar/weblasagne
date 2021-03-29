'use strict'

dayjs.extend(window.dayjs_plugin_isBetween)

function Task(id, description, urgent = false, priv = true, deadline = undefined) {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.priv = priv;
    this.deadline = deadline;
  }
  
  function TaskList() {
    this.list = [];

  this.init = () => {
    this.list.push(
        new Task(2, "Monday lab", false, false, "2021-04-9"),
        new Task(3, "Phone call", true, false, "2021-03-08"),
        new Task(1, "Laundry"),
        new Task(4, "Eat Lasagne ", true, false, dayjs().format('YYYY/MM/DD')),
        new Task(5, "Check Instagram", true, true, "2021-03-30"),
    );
  };
  
  this.getAll = () => {
    return this.list;
  };
  this.getImportant = () => {
    return this.list.filter(task => task.urgent==true);
  };

  this.getPrivate = () => {
    return this.list.filter(task => task.priv==true);
  };

  this.get7Days = () => {
    const today=dayjs().format('YYYY/MM/DD');
    const week= dayjs().add(7, 'day');
    return this.list.filter(task=> dayjs(task.deadline).isBetween(today, week));
    
  };
  this.getToday= () => {
    const today=dayjs().format('YYYY/MM/DD');
    return this.list.filter(task=>  dayjs(task.deadline).isSame(today));
};

       
  }

  document.querySelector("#filter-private").addEventListener('click', (event) =>{
      const tasks=taskList.getPrivate();
      document.querySelector(".active").classList.remove("active");
      document.querySelector("#filter-private").classList.add("active");

      clearTask();
      fillTask(tasks,"Private");
  });
  document.querySelector("#filter-all").addEventListener('click', (event) =>{
    const tasks=taskList.getAll();
    document.querySelector(".active").classList.remove("active");
      document.querySelector("#filter-all").classList.add("active");
    clearTask();
    fillTask(tasks,"All");
});

document.querySelector("#filter-7day").addEventListener('click', (event) =>{
    const tasks=taskList.get7Days();
    document.querySelector(".active").classList.remove("active");
      document.querySelector("#filter-7day").classList.add("active");
    clearTask();
    fillTask(tasks,"Next 7 Days");
});

document.querySelector("#filter-today").addEventListener('click', (event) =>{
    const tasks=taskList.getToday();
    document.querySelector(".active").classList.remove("active");
      document.querySelector("#filter-today").classList.add("active");
    clearTask();
    fillTask(tasks, "Today");
});

document.querySelector("#filter-important").addEventListener('click', (event) =>{
    const tasks=taskList.getImportant();
    document.querySelector(".active").classList.remove("active");
      document.querySelector("#filter-important").classList.add("active");
    clearTask();
    fillTask(tasks, "Important");
});

function createExamRow(task) {

    return `
    <li class="list-group-item">
                        
    <div class="custom-control custom-checkbox task">
        <input type="checkbox" class="custom-control-input" id="${task.id}">
        <label class="custom-control-label ${task.urgent ? 'important': ''} " for="${task.id}">${task.description}</label>
        
        <p>${task.priv ? '<i class="bi bi-eye-fill"></i>': ''}</p>
        ${task.deadline ? `<p>${task.deadline}</p>` : '' }
    </div>
  
  </li>`;
  }
  function fillTask(tasks, name='All') {
    
      const title=document.getElementById('Title');
      title.innerText=name;
        const tasksList = document.getElementById('tasks');
    for(const task of tasks) {
      // creare la riga della tabella
      const task1 = createExamRow(task);
      console.log(task1);
      // aggiungiamo la riga nella pagina
      // MODO 1
      tasksList.insertAdjacentHTML('afterbegin', task1);
    }
  }

  
function clearTask(){
    document.querySelector('#tasks').innerHTML='';
}

const taskList = new TaskList();
taskList.init();
const task = taskList.getAll();
fillTask(task);
