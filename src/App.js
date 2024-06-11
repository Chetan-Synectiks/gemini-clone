import React, { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Layout from "./Layout/Layout";
import { MenuOutlined, PlusOutlined } from "@ant-design/icons";

function App() {
  const [layout, setLayout] = useState(false);
  const handlelayout = (data) => {
    setLayout(data);
  };
  return (
    <div className="Layout">
      {" "}
      <div className="button">
        <div>
          <span onClick={() => handlelayout(!layout)} className="">
            <MenuOutlined style={{ fontSize: "25px" }} />
          </span>
          {!layout && (
            <div className="plusbutton">
              <PlusOutlined style={{ fontSize: "30px" }} />
            </div>
          )}
        </div>
        <span>{layout && <Layout handlelayout={handlelayout} />}</span>
      </div>
      <div className="App" style={{ width: `${layout ? "80vw" : "100vw"}` }}>
        <h1>Gemini mini </h1>
        <Chat />
      </div>
    </div>
  );
}

export default App;
