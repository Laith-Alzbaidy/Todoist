import "./sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container-content">
        <span className="header-sidebar">
          All BOARDS<span>(10)</span>
        </span>
        <div className="wrapper">
          <i className="fa-solid fa-chess-board"></i>
          <Link to="/">
            <span to="/">Platfrom Launch</span>
          </Link>
        </div>
        <div className="wrapper">
          <i className="fa-solid fa-chess-board"></i>
          <Link to="/chart" className="Link">
            <span>Marketing Plan</span>
          </Link>
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
