import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container-content">
        <span className="header-sidebar">
          All BOARDS<span>(10)</span>
        </span>
        <div className="wrapper">
          <i className="fa-solid fa-chess-board"></i>
          <span>Platfrom Launch</span>
        </div>
        <div className="wrapper">
          <i className="fa-solid fa-chess-board"></i>
          <span>Marketing Plan</span>
        </div>
        <div className="wrapper">
          <i className="fa-solid fa-chess-board"></i>
          <span>Roadmap</span>
        </div>
        <div className="wrapper">
          <i className="fa-solid fa-chess-board"></i>
          <span>+Create New Board</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
