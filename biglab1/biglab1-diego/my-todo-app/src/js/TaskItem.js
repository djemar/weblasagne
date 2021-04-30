import { ListGroupItem, Form, ButtonGroup, Button } from "react-bootstrap";
import { IoEye, IoPencil, IoTrash } from "react-icons/io5";
import "../css/TaskItem.css";

function TaskItem(props) {
  const task = props.task;
  return (
    <ListGroupItem className='task-item'>
      <Form.Group controlId={task.description} className='task-data'>
        <Form.Check
          type='checkbox'
          id={task.id}
          label={task.description}
          inline
          custom
          className={`${task.important ? "task-important" : ""}`}
        />
      </Form.Group>
      {task.priv ? (
        <div className='task-data'>
          <IoEye />
        </div>
      ) : (
        <div className='task-data'></div>
      )}
      {task.deadline ? (
        <div className='task-data'>{task.deadline.format("DD/MM/YYYY")}</div>
      ) : (
        <div className='task-data'></div>
      )}
      <div className='task-data'>
        <ButtonGroup>
          <Button variant='outline-primary' className='btn-group'>
            <IoPencil />
          </Button>
          <Button
            variant='outline-danger'
            onClick={() => {
              props.deleteTask(task.id);
            }}
            className='btn-group'>
            <IoTrash />
          </Button>
        </ButtonGroup>
      </div>
    </ListGroupItem>
  );
}
export default TaskItem;
