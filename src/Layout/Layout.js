import { MenuOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./Layout.css";

function Layout() {
    const refreshPage = () => {
        window.location.reload();
      }
  return (
    <div style={{ width: "20%"}}>
      <div onClick={refreshPage} className="plus">
        <PlusOutlined style={{ fontSize: "30px" }} />
        <span>New chat</span>
      </div>
      
    </div>
  );
}

export default Layout;
