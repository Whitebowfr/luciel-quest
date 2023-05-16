import React from "react"
import Desktop from "./Desktop/desktop"
import LoginScreen from "./LoginScreen/main"
import AdminTerminal from "./AdminPanel/main"
import ShutdownScreen from "./Shutdown/main"
import "./index.css"
import { sendUpdate } from "./utils"

export default function PC() {
    const [connectedTo, setConnectedTo] = React.useState("none")

    const handleDisconnect = () => {
        setConnectedTo("none")
    }
    
    const handleConnection = (user) => {
        setConnectedTo(user)
    }

    const handleEndOfGame = () => {
        sendUpdate("Game ended")
        setConnectedTo("shutdown")
    }

    const getDisplayedComponent = () => {
        sendUpdate(`Connected to profile : ${connectedTo}`)
        switch (connectedTo) {
            case "shutdown":
                return <ShutdownScreen />
            case "admin":
                return <AdminTerminal disconnect={handleDisconnect} initiateEndOfGame={handleEndOfGame}/>
            case "user":
                return <Desktop disconnect={handleDisconnect}/>
            default:
                return <LoginScreen connect={handleConnection}/>
        }
    }

    return <React.Fragment>
        {getDisplayedComponent()}
    </React.Fragment>
}