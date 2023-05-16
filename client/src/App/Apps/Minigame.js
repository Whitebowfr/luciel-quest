import React from "react"
import "./library.css"
import { URL } from "../../utils"

const pointsToWin = 50

export default function Minigame(props) {
    const [hasStarted, setStarted] = React.useState(false)
    const [targetCoords, setTargetCoords] = React.useState([])
    const [timeRemaining, setTimeRemaining] = React.useState(30)
    const [points, setPoints] = React.useState(0)
    const [hasFinished, setFinished] = React.useState(false)

    React.useEffect(() => {
        if (hasStarted) {
            setPoints(0)
            setFinished(false)
            setTimeRemaining(30)
            setTargetCoords([[50, 50], [25, 25]])
            const timer = setInterval(() => {
                setTimeRemaining((current) => {
                    if (current <= 0) {
                        setTargetCoords([])
                        setFinished(true)
                        setStarted(false)
                        clearInterval(timer)
                        return 0
                    }
                    return current - 1
                })
            }, 1000)
        }
    }, [hasStarted])

    React.useEffect(() => {
        if (hasFinished) {
            if (points > pointsToWin) {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                        "key": "isIpAvailable",
                        "value": true
                    })
                }
                fetch(URL + "/api/change_constant", requestOptions)
                    .catch(e => console.log(e))
            }
        }
    }, [hasFinished])

    const changeTarget = (e) => {
        setPoints((current) => current + 1)
        let curCoords = [...targetCoords]
        curCoords[parseInt(e.target.id)] = [Math.floor(Math.random() * 90), Math.floor(Math.random() * 90)]
        setTargetCoords(curCoords)
    }

    return <div className="minigame">
        {(hasStarted || hasFinished) ? <div className="minigame_content">
            <h4 style={{margin: 0}}>Points : {points} Temps Restant : {timeRemaining} </h4>
            {targetCoords.map((x, i) => <div className="minigame_target" key={i} id={i} onClick={changeTarget} style={{left: x[0] + "%", top: x[1] + "%"}}></div>)}
            </div> : <div style={{textAlign: "center", verticalAlign: "middle", width: '100%', height: "100%"}}>
                <h1>Pour accéder à ces données, il faudra prouver votre talent face à Fotiadu.</h1>
                <h3 onClick={() => setStarted(true)} style={{cursor: "pointer", backgroundColor: "red", borderRadius: '10px', padding: "10px", color: "white"}}>Start</h3>
            </div>}
        {hasFinished ? <div className="minigame_end"><h1>{points > pointsToWin ? "Bravo !! Vous avez battu Fotiadu. Vous avez maintenant accès à son adresse IP." : "Vous n'êtes pas méritant. Score à battre : " + pointsToWin}</h1><h3 onClick={() => setStarted(true)} style={{cursor: "pointer", backgroundColor: "red", borderRadius: '10px', padding: "10px", color: "white"}}>Recommencer</h3></div> : <></>}
    </div>
}