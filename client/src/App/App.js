import React from "react";
import NavBar from "./NavBar";

const App = () => (
  <NavBar leftItems={leftItems} rightItems={rightItems}/>
);

const leftItems = [
  { content: "Home", key: "home", to:"/", exact:true, className:"item", activeClassName:"active" },
  { content: "Modules", key: "modules", to:"/modules", className:"item", activeClassName:"active" }
];
const rightItems = [
  { as: "a", content: "Sign Out", key: "signout" }
];

export default App;
