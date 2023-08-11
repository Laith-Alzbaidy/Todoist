import React, { useContext, useState } from "react";
import "./addlist.css";
import { TodolistContext } from "../context";
function AddList() {
  const { addTitleList } = useContext(TodolistContext);
  const [showAdd, setShowAdd] = useState(true);
  const [title, setTitle] = useState("");

  const toggleShowAdd = () => {
    setShowAdd(!showAdd);
  };

  const handleTitleInputChange = (event) => {
    let value = event.target.value;
    setTitle(value);
  };

  const handleFormAddList = (event) => {
    event.preventDefault();
    addTitleList(title);
  };

  return (
    <>
      {showAdd && (
        <div className="new-column" onClick={toggleShowAdd}>
          <span>+</span>New Column
        </div>
      )}

      {!showAdd && (
        <div className="container-form-add-list">
          <form className="form-add-list" onSubmit={handleFormAddList}>
            <input
              onChange={handleTitleInputChange}
              className="input-name-list"
              type="text"
            />
            <div className="icon-add-remove">
              <button>add</button>
              <i onClick={toggleShowAdd} className="fa-solid fa-xmark"></i>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddList;
