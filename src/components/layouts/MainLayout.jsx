import React from 'react';
import Header from "../Header";
import {Outlet} from "react-router-dom";

const MainLayout = ({homeIsRender}) => {
    return (
        <div className="wrapper">
            <Header homeIsRender={homeIsRender}/>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;