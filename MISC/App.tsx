import { useState } from "react";

import "./App.css";

import IsCellEditableGrid from "./datagrid/IsCellEditableGrid";
import Datagrid01 from "./datagrid/Datagrid01";
import DataGridWithColumnManager from "./datagrid/DataGridWithColumnManager";
import Datagrid02 from "./datagrid/Datagrid02";
import MdlDataGrid01 from "./datagrid/MdlDataGrid01";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <button className="border border-1 border-amber-800">
        Native Button
      </button> */}

      {/* <div className="border-2 p-2 m-2"> */}
      {/* <DisableRowSelection /> */}
      {/* <IsCellEditableGrid /> */}

      {/* <DataGridWithColumnManager /> */}

      {/* <Datagrid01 /> */}

      <MdlDataGrid01 />

      {/* </div> */}

      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
