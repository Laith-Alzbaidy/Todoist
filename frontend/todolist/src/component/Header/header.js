import "./header.css";
import FormDialog from "../DialogCreatTask/CrateTaskdialog";
function Nav() {
  return (
    <>
      <header>
        <div className="left-header">
          <h1 className="logo"> Platform Launch</h1>
        </div>
        <div className="right-header">
          <FormDialog />
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
      </header>
    </>
  );
}

export default Nav;
