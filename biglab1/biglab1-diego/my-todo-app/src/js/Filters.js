import { ListGroup, ListGroupItem } from "react-bootstrap";
import "../css/Filters.css";

function MyFilters() {
  return (
    <div className='sidebar-sticky'>
      <ListGroup variant='flush' className='flex-column sidebar-list'>
        <ListGroupItem action id='filter-all' className='filter-item active'>
          All
        </ListGroupItem>
        <ListGroupItem action id='filter-important' className='filter-item'>
          Important
        </ListGroupItem>
        <ListGroupItem action id='filter-today' className='filter-item'>
          Today
        </ListGroupItem>
        <ListGroupItem action id='filter-7day' className='filter-item'>
          Next 7 Days
        </ListGroupItem>
        <ListGroupItem action id='filter-private' className='filter-item'>
          Private
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

export default MyFilters;
