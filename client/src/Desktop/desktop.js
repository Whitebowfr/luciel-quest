import React from "react"
import "./desktop.css"
import App from "../App/app"
import applist from "../App/applist"
import ErrorPopup from "../Messages/error"
import DesktopIcon, { loadDesktopIcons } from "./desktopIcon"
import Taskbar from "./taskbar"
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

export default function Desktop({ disconnect }) {
    let [openedApps, setOpenedApps] = React.useState([])
    let [desktopIcons, setDesktopIcons] = React.useState([])
    let [errorMessage, setErrorMessage] = React.useState("")
    let [isStartMenuOpen, setStartMenuOpen] = React.useState(false)

    const ref = React.useRef({
        windowId: 0
    })

    let openApp = (app) => {
        if (app.appid === -1) {
            setErrorMessage("Ce fichier est encrypté !")
            return
        }
        app = {...app}
        app.windowId = parseInt(ref.current.windowId)
        ref.current.windowId += 1
        let temp = [...openedApps, app]
        setOpenedApps(temp)
        setTimeout(() => focusApp(null, "window_" + app.windowId), 10)
    }

    React.useEffect(() => {
        loadDesktopIcons()
            .then(data => setDesktopIcons(data))
    }, [])

    let handleDesktopClick = (e) => {
        openedApps.forEach((app, idx) => {
            if (!document.getElementById('window_'+app.windowId).contains(e.target) && (applist[app.appid].closeOnClickAway && applist[app.appid].closeOnClickAway !== undefined)) {
                closeApp(app.windowId)
            }
        })
    }

    let closeApp = (windowId) => {
        let temp = [...openedApps]
        let idx = temp.map(x => x.windowId).indexOf(windowId)
        temp.splice(idx, 1)
        setOpenedApps(temp)
    }

    let focusApp = (app=null, windowId=null) => {
        document.querySelectorAll('.selected').forEach(el => el.classList.remove("selected"))
        if (app !== null) {
            let windowsOpen = document.querySelectorAll('.app_' + app.id)
            if (windowsOpen.length) {
                windowsOpen[windowsOpen.length - 1].classList.add("selected")
            }
        } else {
            document.querySelector('#' + windowId).classList.add("selected")
        }
    }

    let handleContextMenu = (res) => {
        openApp(res)
    }

    const showStartMenu = () => {
        setStartMenuOpen(true)
    }

    const handleStartMenuClose = () => {
        setStartMenuOpen(false)
    }

    const handleIconClick = (e, app) => {
        if (e.detail === 1 && e.button === 0) {
            openApp(app)
        }
    }

    return <div id="desktop_container" onClick={handleDesktopClick}>
        <Dialog open={isStartMenuOpen} onClose={handleStartMenuClose}>
            <DialogTitle>Êtes-vous sûrs de vouloir vous déconnecter ?</DialogTitle>
            <DialogActions>
                <Button onClick={handleStartMenuClose}>Annuler</Button>
                <Button onClick={disconnect}>Oui</Button>
            </DialogActions>
        </Dialog>
        <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
        <div id="desktop_icons">
            {desktopIcons.map((x, idx) => <DesktopIcon key={idx} onClick={(e) => handleIconClick(e, x)} appdata={x} />)}
        </div>
        {openedApps.map((app) => <App openApp={openApp} key={app.windowId} appdata={app} closeApp={() => closeApp(app.windowId)} windowId={"window_" + app.windowId} focusWindow={focusApp} onContextMenu={handleContextMenu}/>)}
        <Taskbar apps={openedApps} focusApp={focusApp} showStartMenu={showStartMenu}/>
    </div>
}