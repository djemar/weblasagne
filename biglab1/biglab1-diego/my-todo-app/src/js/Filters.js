import { ListGroup, ListGroupItem } from "react-bootstrap";
import "../css/Filters.css";

function MyFilters(props) {
  return (
    <div className='sidebar-sticky'>
      <ListGroup variant='flush' className='flex-column sidebar-list'>
        <ListGroupItem
          action
          id='filter-all'
          className='filter-item'
          active={props.filterActive === "All"}
          onClick={() => {
            props.updateFilterActive("All");
          }}>
          All
        </ListGroupItem>
        <ListGroupItem
          action
          id='filter-important'
          className='filter-item'
          active={props.filterActive === "Important"}
          onClick={() => {
            props.updateFilterActive("Important");
          }}>
          Important
        </ListGroupItem>
        <ListGroupItem
          action
          id='filter-today'
          className='filter-item'
          active={props.filterActive === "Today"}
          onClick={() => {
            props.updateFilterActive("Today");
          }}>
          Today
        </ListGroupItem>
        <ListGroupItem
          action
          id='filter-7day'
          className='filter-item'
          active={props.filterActive === "Next7Days"}
          onClick={() => {
            props.updateFilterActive("Next7Days");
          }}>
          Next 7 Days
        </ListGroupItem>
        <ListGroupItem
          action
          id='filter-private'
          className='filter-item'
          active={props.filterActive === "Private"}
          onClick={() => {
            props.updateFilterActive("Private");
          }}>
          Private
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

export default MyFilters;
