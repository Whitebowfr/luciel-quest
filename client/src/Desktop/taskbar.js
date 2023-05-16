import React from "react"
import "./desktop.css"
import applist from "../App/applist"

export default function Taskbar({ apps, focusApp, showStartMenu }) {
    return <div id="taskbar">
        <div className="taskbar_icon" onClick={showStartMenu}>
            <img src={applist[0].icon_src} style={{width: '100%', height: 'auto'}} alt="OS" />
        </div>
        {apps.map((app, idx) => <TaskbarIcon app={app} focusApp={focusApp} key={idx}></TaskbarIcon>)}
    </div>
}

export function TaskbarIcon({ app, focusApp }) {
    return <div className="taskbar_icon" onClick={() => {focusApp(null, "window_" + app.windowId)}}>
        <img src={applist[app.appid].icon_src} style={{width: '100%', height: 'auto'}} alt={app.name} />
    </div>
}
