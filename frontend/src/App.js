import { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import ItemsDisplayPage from "./Components/Pages/ItemsDisplayPage";
import weddingSareeCover from "./Components/Data/CoverImages/weddingSareeCover.jpg";
import banarasiSareeCover from "./Components/Data/CoverImages/banarasiSareeCover.jpg";
import festivalSareeCover from "./Components/Data/CoverImages/festivalSareeCover.jpg";
import partyWearSareeCover from "./Components/Data/CoverImages/partySareeCover.jpg";
import bridalSareeCover from "./Components/Data/CoverImages/bridalSareeCover.jpg";
import allSareeCover from "./Components/Data/CoverImages/allSareeCover.jpg"
import ItemDetailsPage from "./Components/Pages/ItemDetailsPage";
import SignInPage from "./Components/Pages/SignInPage";
import Cart from "./Components/Pages/Cart";
import Checkout from "./Components/Pages/Checkout";
import OrderPlaced from "./Components/Pages/OrderPlaced";
import Orders from "./Components/Pages/Orders";

function App() {
  const [mode, setMode] = useState(() => {
    const savedMode = sessionStorage.getItem('updatedMode');
    return savedMode ? JSON.parse(savedMode) : 'light';
  });

  useEffect(() => {
    sessionStorage.setItem('updatedMode', JSON.stringify(mode));
    document.body.classList.toggle('dark-mode', mode === 'dark');
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      {/* <div><Navbar  mode={mode} /></div> */}
      { <div>
        <Routes>
          <Route exact path="/" element={<SignInPage mode={mode} />} />
          <Route exact path="/home" element={<HomePage toggleMode={toggleMode} mode={mode} />} />
          <Route exact path="/weddingSarees" element={<ItemsDisplayPage toggleMode={toggleMode} mode={mode} apiPath={"getProductsByCategory/1"} coverImg={weddingSareeCover} />} />
          <Route exact path="/banarasiSarees" element={<ItemsDisplayPage toggleMode={toggleMode} mode={mode} apiPath={"getProductsByCategory/2"} coverImg={banarasiSareeCover} />} />
          <Route exact path="/festiveSarees" element={<ItemsDisplayPage toggleMode={toggleMode} mode={mode} apiPath={"getProductsByCategory/3"} coverImg={festivalSareeCover} />} />
          <Route exact path="/partyWearSarees" element={<ItemsDisplayPage toggleMode={toggleMode} mode={mode} apiPath={"getProductsByCategory/4"} coverImg={partyWearSareeCover} />} />
          <Route exact path="/bridalSarees" element={<ItemsDisplayPage toggleMode={toggleMode} mode={mode} apiPath={"getProductsByCategory/5"} coverImg={bridalSareeCover} />} />
          <Route exact path="allSarees" element={<ItemsDisplayPage toggleMode={toggleMode} mode={mode} apiPath={"getAllProducts/Sarees"} coverImg={allSareeCover}/>}/>
          <Route exact path="/itemDetail/:username/:prodId" element={<ItemDetailsPage toggleMode={toggleMode} mode={mode} />} />
          <Route exact path="/cart" element={<Cart mode={mode} toggleMode={toggleMode}/>} />
          <Route exact path="/Checkout" element={<Checkout mode={mode} toggleMode={toggleMode}/>}/>
          <Route exact path="/OrderPlaced" element={<OrderPlaced mode={mode} toggleMode={toggleMode}/>}/>
          <Route exact path="/Orders" element={<Orders mode={mode} toggleMode={toggleMode}/>}/>
        </Routes>
      </div> }
    </Router>
  );
}

export default App;
