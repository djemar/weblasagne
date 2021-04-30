import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import MyFilters from "./js/Filters.js";
import MyFAB from "./js/FAB.js";
import MyNavbar from "./js/Navbar";
import MyTaskList from "./js/TaskList";
import MyForm from "./js/Form.js";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

// Tasks definition
const TASKS = [
  // id, description, important, private, deadline
  { id: 1, description: "Complete Lab 3", important: false, priv: true, deadline: dayjs("2021-03-29") },
  { id: 2, description: "Buy some groceries", important: false, priv: false, deadline: dayjs("2021-04-26") },
  { id: 3, description: "Read a good book!", important: true, priv: true },
  { id: 4, description: "Watch Mr. Robot", important: false, priv: true, deadline: dayjs("2021-03-25") },
];
function App() {
  const [tasks, setTasks] = useState([...TASKS]);
  const [filterActive, setFilterActive] = useState("All");
  const [modalShow, setModalShow] = useState(false);
  //useEffect(()=>{handleFilter}, [filterActive]);

  const deleteTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const addTask = (task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  const updateFilterActive = (id) => {
    setFilterActive(id);
  };

  const getFilterTask = () => {
    var filterTask = [...tasks];
    console.log(filterActive);
    if (filterActive === "All") {
      console.log(filterTask);
      return filterTask;
    } else if (filterActive === "Important") {
      return filterTask.filter((task) => task.important === true);
    } else if (filterActive === "Private") {
      return filterTask.filter((task) => task.priv === true);
    } else if (filterActive === "Next7Days") {
      filterTask = filterTask.filter((task) => task.date !== undefined);
      return filterTask.filter((task) => task.date.isBetween(dayjs(), dayjs().add(7, "day")));
    } else if (filterActive === "Today") {
      return filterTask.filter((task) => task.date).filter((task) => dayjs(task.date).isToday());
    }
  };

  return (
    <>
      <MyNavbar />
      <Container fluid className='container-fluid'>
        <Row>
          <Col md={4} className='d-md-block bg-light collapse sidebar'>
            <MyFilters updateFilterActive={updateFilterActive} filterActive={filterActive} />
          </Col>
          <Col md={8} className='main'>
            <h1 id='filter-title' className='font-weight-bold'>
              All
            </h1>
            <div className='tasks-div'>
              <MyTaskList tasks={getFilterTask()} deleteTask={deleteTask} />
            </div>
          </Col>
        </Row>
      </Container>
      <MyFAB setModalShow={setModalShow} />
      <MyForm show={modalShow} onHide={() => setModalShow(false)} task={TASKS} addTask={addTask} />
    </>
  );
}

export default App;
