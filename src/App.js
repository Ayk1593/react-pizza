import "./scss/app.scss";
import Header from "./components/Header";
import React, {useEffect, useState} from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Routes, Route} from "react-router-dom";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./components/layouts/MainLayout";

// export const SearchContext = React.createContext()

function App() {
    const [open, setOpen] = useState(false);
    const [homeIsRender, setHomeIsRender] = useState(true)

    return (
        <Routes>
                <Route path="/" element={<MainLayout homeIsRender={homeIsRender}/>}>
                <Route path="" element={<Home open={open} setOpen={setOpen}
                                              setHomeIsRender={setHomeIsRender}/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/pizza/:id" element={<FullPizza/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}


export default App;
