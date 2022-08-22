import "./scss/app.scss";
import Header from "./components/Header";
import React, {useEffect, useState} from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Routes, Route} from "react-router-dom";
import Cart from "./pages/Cart";

export const SearchContext = React.createContext()

function App() {

    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [homeIsRender, setHomeIsRender] = useState(true)
    const closeSort = () => {
        open && setOpen(!open);
    };

    return (
        <div onClick={closeSort} className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <Header homeIsRender={homeIsRender}/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home open={open} setOpen={setOpen}
                                                   setHomeIsRender={setHomeIsRender}/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
            </SearchContext.Provider>
        </div>
    );
}


export default App;
