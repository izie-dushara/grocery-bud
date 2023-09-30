import { useState, useEffect } from "react";
import GroceryForm from "./components/GroceryForm";
import GroceryField from "./components/GroceryField";
import getLocalStorage from "./config/getLocalStorage.js";

getLocalStorage();

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // name is false
    if (!name) {
      // display alert
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      // deal with edit
      const submitEdit = list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name };
        }
        return item;
      });

      setList(submitEdit);

      // clean up
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      // show alert
      showAlert(true, "success", "item added to the list");
      // Add item
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    // Show Alert
    showAlert(true, "danger", "empty list");

    // remove all item
    setList([]);
  };

  const removeItem = (id) => {
    const finishedList = list.filter((item) => item.id !== id);

    // Alert
    showAlert(true, "danger", "item removed");

    // remove item
    setList(finishedList);
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  return (
    <section className="section-center">
      <GroceryForm
        handleSubmit={handleSubmit}
        alert={alert}
        showAlert={showAlert}
        name={name}
        setName={setName}
        isEditing={isEditing}
      />

      {list.length > 0 && (
        <GroceryField
          list={list}
          removeItem={removeItem}
          editItem={editItem}
          clearList={clearList}
        />
      )}
    </section>
  );
}

export default App;
