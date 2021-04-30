import TaskItem from "./TaskItem.js";
import { ListGroup } from "react-bootstrap";
import "../css/TaskList.css";

function MyTaskList(props) {
  return (
    <div className='tasks-div'>
      <ListGroup variant='flush' id='tasks-list' className='flex-column'>
        {props.tasks.map((task) => (
          <TaskItem key={task.id} task={task} deleteTask={props.deleteTask} />
        ))}
      </ListGroup>
    </div>
  );
}

export default MyTaskList;
