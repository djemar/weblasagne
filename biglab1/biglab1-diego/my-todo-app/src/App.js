import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { Col, Container, Row, Button } from "react-bootstrap";
import MyFilters from "./js/Filters.js";
import MyNavbar from "./js/Navbar";
import MyTaskList from "./js/TaskList";
import { IoAdd } from "react-icons/io5";

function App() {
  return (
    <>
      <MyNavbar />
      <Container fluid className='container-fluid'>
        <Row>
          <Col md={4} className='d-md-block bg-light collapse sidebar'>
            <MyFilters />
          </Col>
          <Col md={8} className='main'>
            <h1 id='filter-title' className='font-weight-bold'>
              All
            </h1>
            <div class='tasks-div'>
              <MyTaskList />
            </div>
          </Col>
        </Row>
      </Container>
      <Button type='button' className='btn btn-circle btn-fab'>
        <IoAdd size={32} />
      </Button>
    </>
  );
}
export default App;
