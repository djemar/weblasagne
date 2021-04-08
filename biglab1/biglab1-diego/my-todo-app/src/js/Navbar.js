import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import "../css/Navbar.css";
import "../css/App.css";
import { IoCheckmarkCircleOutline, IoSearch, IoPersonCircle } from "react-icons/io5";

function MyNavbar() {
  return (
    <Navbar expand='md' id='navbar'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <div className='navbar-title'>
        <Navbar.Brand id='navbar-brand' href='#home'>
          TOD
        </Navbar.Brand>
        <IoCheckmarkCircleOutline id='icon-check' size={32} />
      </div>
      <Navbar.Collapse id='basic-navbar-nav' className='navbar-collapse'>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2 mysearch' />
          <Button variant='btn btn-circle btn-search'>
            <IoSearch id='icon-search' size={20} />
          </Button>
        </Form>
      </Navbar.Collapse>
      <Button variant='btn btn-circle btn-user'>
        <IoPersonCircle id='icon-user' size={32} />
      </Button>
    </Navbar>
  );
}

export default MyNavbar;
