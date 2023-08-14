import "./task.css";
function Task({ task }) {

  
  return (
    <>
      {task && (
        <div className="task">
          <div className="header-task">
            <h3>{task.title}</h3>
          </div>
          <h6>{task.description}</h6>
          <div className="substasks"></div>

          <div className="CountSubtask">
            <span>0</span>
            <span>of</span>
            <span>3</span>
            <span>substasks</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
