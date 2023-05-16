import React from "react"
import "./lib.css"

const map = [[
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 3]
], [
    [0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 3]
], [
    [0, 0, 0, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 0],
    [1, 0, 0, 1, 1, 1, 0, 0],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 0, 3]
], [
    [0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 3]
], [
    [0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 3]
], [
    [0, 0, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 0, 1, 3]
], [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 3]
]]

export default function SnakeMiniGame({onFinish}) {
    const [playerPosX, setPlayerPosX] = React.useState(0)
    const [playerPosY, setPlayerPosY] = React.useState(0)
    const [timeRemaining, setTimeRemaining] = React.useState(8)
    const [hasFinished, setFinished] = React.useState(false)
    const [selectedMap, setSelectedMap] = React.useState(0)

    React.useEffect(() => {
        let func = (e) => {
            if (e.key === "d" || e.key === "ArrowRight") {
                setPlayerPosX((playerPos) =>  Math.min(playerPos + 1, map[selectedMap][0].length - 1))
                e.preventDefault()
            } else if (e.key === "q" || e.key === "ArrowLeft") {
                setPlayerPosX((playerPos) => Math.max(playerPos - 1, 0))
                e.preventDefault()
            } else if (e.key === "z" || e.key === "ArrowUp") {
                setPlayerPosY((playerPos) => Math.max(playerPos - 1, 0))
                e.preventDefault()
            } else if (e.key === "s" || e.key === "ArrowDown") {
                setPlayerPosY((playerPos) => Math.min(playerPos + 1, map[selectedMap].length - 1))
                e.preventDefault()
            }
        }
        document.addEventListener("keydown", func)

        const timer = setInterval(() => {
            setTimeRemaining((time) => {
                if (time <= 0) {
                    clearInterval(timer)
                    if (!hasFinished) {
                        setFinished(true)
                        onFinish(false)
                    }
                } else {
                    return time - 0.1
                }
            })
        }, 100)

        return () => {
            document.removeEventListener("keydown", func)
            clearInterval(timer)
        }
    }, [onFinish, hasFinished, selectedMap])

    React.useEffect(() => {
        setSelectedMap(Math.floor(Math.random() * 7))
    }, [])

    React.useEffect(() => {
        if (map[selectedMap][playerPosY][playerPosX] === 3 && !hasFinished) {
            setFinished(true)
            onFinish(true)
        } else if (map[selectedMap][playerPosY][playerPosX] === 1) {
            setPlayerPosX(0)
            setPlayerPosY(0)
        }
    }, [playerPosX, playerPosY, onFinish, hasFinished, selectedMap])

    return <div className="snake_container">
        <h2>Temps restant : {(timeRemaining ?? 0).toFixed(1)}</h2>
        <div id="snake_player" style={{top: playerPosY * 50 + "px", left: playerPosX * 50 + "px"}}/>
        {map[selectedMap].map((line, y) => line.map((cell, x) => <div className="snake_cell" key={y + " " + x} style={{backgroundColor: getBackgroundColor(cell), top: y * 50 + "px", left: x * 50 + "px"}} />))}
    </div>
}

function getBackgroundColor(val) {
    switch(val) {
        case 1:
            return "black";
        case 2:
            return "red";
        case 3:
            return "green"
        default:
            return "lightgray";
    }
}