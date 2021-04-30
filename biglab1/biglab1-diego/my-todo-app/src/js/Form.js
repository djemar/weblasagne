import { Modal, Button, Form, Col } from "react-bootstrap";
import { useState } from "react";
import "../css/Form.css";
import dayjs from "dayjs";

function MyVerticallyCenteredModal(props) {
  const [validated, setValidated] = useState(false);

  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const [priv, setPriv] = useState(false);
  const [date, setDate] = useState();
  const [id, setId] = useState(props.task.length);

  const handleDateChange = (event) => {
    setDate(dayjs(event.target.value));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setId((id) => id + 1);
      const newTask = { id: id, description: description, important: important, priv: priv };
      if (date) {
        newTask.date = date;
      }
      // TODO: Aggiungere validazione!!!
      props.addTask(newTask);
    }

    setValidated(true);
  };

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Add a new task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId='description'>
              <Form.Label className='form-label'>Description *</Form.Label>
              <Form.Control required type='text' onChange={(event) => setDescription(event.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId='selectedDate'>
              <Form.Label className='form-label'>Date</Form.Label>
              <Form.Control type='date' min={dayjs().format("YYYY-MM-DD")} onChange={handleDateChange} />
            </Form.Group>
          </Form.Row>

          <Form.Check
            label='Private'
            name='group1'
            type='checkbox'
            custom
            id='private'
            onChange={(event) => (priv ? setPriv(false) : setPriv(true))}
          />

          <Form.Check
            label='Important'
            name='group1'
            custom
            type='checkbox'
            id='important'
            onChange={(event) => (important ? setImportant(false) : setImportant(true))}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className='justify-content-between'>
        <div id='footer-required'>* required field</div>
        <div>
          <Button type='submit' className='mr-4' onClick={handleSubmit}>
            Add
          </Button>
          <Button variant='danger' onClick={props.onHide}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
