import * as Pieces from "@pieces.app/pieces-os-client";
import { Application } from "@pieces.app/pieces-os-client";
import { connect } from "./utils/Connect";

// types

//globals
let full_context: JSON;
export var applicationData: Application;

function App() {
  return (
    <>
      <div className="text-3xl">Deskbuddy</div>
    </>
  );
}

export default App;

connect().then((__) => {
  full_context = __;
  let _t = JSON.parse(JSON.stringify(full_context));
  applicationData = _t.application;
  let osVersion = _t.health.os.version;
  console.log("Application Data: ", applicationData);
  localStorage.setItem("version", osVersion);
});
