import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const fromLocalStorage = () => {
  const newList = localStorage.getItem("data");
  if (newList) {
    return JSON.parse(newList);
  } else {
    return [];
  }
};

const App = () => {
  const [item, setItem] = useState("");
  const [list, setList] = useState(fromLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item) {
      // display alert
      showAlert(true, "danger", "Please wirte something in Input!");
    } else if (item && isEditing) {
      setList(
        list.map((items) => {
          if (items.id === editID) {
            return { ...items, title: item };
          }
          return items;
        })
      );

      setItem("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Item has been edited");
    } else {
      showAlert(true, "success", "Item Added To List");
      const newItem = { id: new Date().getTime().toString(), title: item };
      setList([...list, newItem]);
      setItem("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "Empty List");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item Deleted From List");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const newItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setItem(newItem.title);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
        <h3>Grocery Cart</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="add items..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear Items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
