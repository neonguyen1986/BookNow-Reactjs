import React, { useState } from "react";
import './test.scss'

const ToolBar = ({ openSidebar }) => {
    return (
        <div className="tool-bar">
            <div className="burger" onClick={openSidebar}>
                H/S
            </div>
            <div className="title-bar"> The code</div>
        </div>
    )
}

const Sidebar = ({ sidebar }) => {
    return (
        <div className={sidebar ? "sidebar sidebar--open" : "sidebar"}>
            < li > Home</ li>
            <li>Products</li>
            <li>Carrer</li>
            <li>Contact</li>
            <li>About</li>
        </div>
    )
}

const Backdrop = ({ sidebar, closeSidebar }) => {
    return (
        <div className={sidebar ? "backdrop backdrop--open" : "backdrop"}
            onClick={closeSidebar}>

        </div>
    )
}


const Text = () => {
    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar = () => {
        setSidebar((prevState) => !prevState)
    }
    return (
        <>
            <ToolBar openSidebar={toggleSidebar} />{/* when click on HS of Toolbar, switch sidebar:true<>false */}
            <Backdrop sidebar={sidebar} closeSidebar={toggleSidebar} />
            <Sidebar sidebar={sidebar} />{/*pass sidebar state to Sidebar: if true, show '.sidebar--open' else show '.sidebar'*/}
        </>
    )
}

export default Text;