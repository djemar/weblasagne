import { IoAdd } from "react-icons/io5";
import { Button } from "react-bootstrap";
import "../css/FAB.css";

function MyFAB(props) {
  return (
    <Button id='fab' type='button' className='btn btn-circle btn-fab' onClick={() => props.setModalShow(true)}>
      <IoAdd size={32} />
    </Button>
  );
}
export default MyFAB;
