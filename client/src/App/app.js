import React from "react"
import "./app.css"
import applist from "./applist"
import CloseIcon from "@mui/icons-material/Close"
import { getCorrespondingApp } from "./router"

import { red } from '@mui/material/colors';

export default function App(props) {
    let app = applist[props.appdata?.appid]
    let [coords, setCoords] = React.useState(props.appdata?.custom_properties?.openAtCoords ?? [0,0])
    let ogClickCoords = [0, 0]
    let baseOffset = [0, 0]
    const app_element = React.useRef(null)

    let handleMove = (e) => {
        if ((app.draggable || app.draggable === undefined)) {
            e.preventDefault()
            ogClickCoords = [e.clientX, e.clientY]
            baseOffset = [parseInt(app_element.current.style.left), parseInt(app_element.current.style.top)]
            document.addEventListener("mouseup", stopDragElement)
            document.addEventListener("mousemove", dragElement)
        }
    }

    let dragElement = (e) => {
        e.preventDefault()
        let newCoords = [baseOffset[0] + e.clientX - ogClickCoords[0], baseOffset[1] + e.clientY - ogClickCoords[1]]
        newCoords = newCoords.map(x => Math.max(0, x))
        if (newCoords[0] + app_element.current.getBoundingClientRect().width > window.innerWidth) {
            newCoords[0] = window.innerWidth - app_element.current.getBoundingClientRect().width
        }
        if (newCoords[1] + app_element.current.getBoundingClientRect().height > window.innerHeight * 0.95) {
            newCoords[1] = window.innerHeight * 0.95 - app_element.current.getBoundingClientRect().height
        }
        setCoords(newCoords)
    }

    let stopDragElement = (e) => {
        e.preventDefault()
        document.removeEventListener('mousemove', dragElement)
        document.removeEventListener('mouseup', stopDragElement)
    }

    let handleClose = (e) => {
        props.closeApp()
    }

    let handleSelection = () => {
        props.focusWindow(null, props.windowId)
    }

    return <div id={props.windowId} ref={app_element} className={"app_container app_" + props.appdata?.appid} onMouseDown={handleSelection} style={{left: coords[0] + "px", top: coords[1] + "px" }}>
        <div className="title_container">
            {(app?.showWindow || app?.showWindow === undefined) ?
                <React.Fragment>
                    <div className="title_wrapper" onMouseDown={handleMove}>
                        <h6 className="title">{app?.name}</h6>
                    </div>
                    <div className="buttons_wrapper">
                        <CloseIcon sx={{ color: red[800] }} onClick={handleClose} />
                    </div></React.Fragment>
                : <></>}
        </div>
        <div style={{overflow: "scroll", width: "100%", transform: "translateY(-4px)"}}>
            {getCorrespondingApp(props, handleClose)}
        </div>
    </div>
}