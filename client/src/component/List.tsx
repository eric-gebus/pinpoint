interface ListProps {
  eventList: Event[];
}
function List({ eventList }: ListProps) {

  return (
    <div>
      <h1>List Component</h1>
    </div>
  );
}

export default List;