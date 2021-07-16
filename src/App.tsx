import React from "react";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { TsReactTest } from "screens/project-list/try-use-array";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
      <LoginScreen />
    </div>
  );
}

export default App;
