import List from "./List";

const GroceryField = ({list, removeItem, editItem,clearList}) => {
  return (
    <div className="grocery-container">
      <List
        items={list}
        removeItem={removeItem}
        editItem={editItem}
        list={list}
      />
      <button className="clear-btn" onClick={clearList}>
        clear items
      </button>
    </div>
  );
};

export default GroceryField;
