import dayjs from "dayjs";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "../css/TaskList.css";
import { IoEye } from "react-icons/io5";

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

function TaskItem(props) {
  const task = props;
  return (
    <ListGroupItem className='task-item'>
      <div className='custom-control custom-checkbox task-data'>
        <input type='checkbox' className='custom-control-input' id='${task.id}' />
        <label className={`custom-control-label ${task.important ? "task-important" : ""}`} for={task.id}>
          {task.description}
        </label>
      </div>
      {task.priv ? (
        <div className='task-data'>
          {" "}
          <IoEye />
        </div>
      ) : (
        ""
      )}
      {task.deadline ? <div className='task-data'>${task.deadline}</div> : <div className='task-data'></div>}
    </ListGroupItem>
  );
}

function MyTaskList() {
  const taskList = new TaskList();
  taskList.init();
  const task = taskList.getAll();
  //insertTask(task);
  //initFilterListeners();

  return (
    <div className='tasks-div'>
      <ListGroup variant='flush' id='tasks-list' classNameName='flex-column'>
        {task.map((value) => (
          <TaskItem task={value} id={value.id} />
        ))}
      </ListGroup>
    </div>
  );
}

export default MyTaskList;
