import React, { useEffect } from "react";
import ReactGA from "react-ga";
import DashBoard from "./Components/DashBoard/index";
import "./App.css";
import Header from "./Components/Header";

function App() {
  useEffect(() => {
    ReactGA.initialize("UA-220761409-1");

    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="App">
      <Header />
      <DashBoard />
    </div>
  );
}

export default App;
