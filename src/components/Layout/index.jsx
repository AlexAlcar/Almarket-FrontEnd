import React from "react";
import Cabecera from "../Cabecera/Cabecera";
import Footer from "../Footer/Footer";
import MenuLateral from "../MenuLateral/MenuLateral";
import "./Layout.styles.css";

export const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="layout-header">
        <Cabecera />
      </div>
      <div className="layout-sidebar">
        <MenuLateral />
      </div>
      <div className="layout-children">{children}</div>
      <div className="layout-footer">
        <Footer />
      </div>
    </div>
  );
};
