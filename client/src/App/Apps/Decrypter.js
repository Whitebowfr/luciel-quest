import React from "react"
import "./library.css"
import LinearProgress from '@mui/material/LinearProgress';
import { URL, sendUpdate } from "../../utils";

export default function Decrypter(props) {
    const [isLinearProgressShown, setLinearProgressShown] = React.useState(false)
    const [progress, setProgress] = React.useState(0)

    const handleDecryption = () => {
        if (document.getElementById("decryption_lock_span").classList.contains("decrypter_unlocked")) {
            return
        }
        let path = document.getElementById("decryption_path").value
        if (path !== "C:/Temp/d0083c187d58c9e2e3996245c8ce73e7") {
            document.getElementById("decryption_lock_span").classList.add("animated")
            document.getElementById("decryption_lock_span").classList.add("shake")
            setTimeout(() => {
                document.getElementById("decryption_lock_span").classList.remove("animated")
                document.getElementById("decryption_lock_span").classList.remove("shake")
            }, 1000)
        } else {
            document.getElementById("decryption_path").disabled = true
            setLinearProgressShown(true)
            setProgress(0)
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress >= 100) {
                        setLinearProgressShown(false)
                        document.getElementById("decryption_lock_span").classList.add("decrypter_unlocked")
                        const requestOptions = {
                            method: "GET"
                        }
                        sendUpdate("Decryption done")
                        fetch (URL + "/api/filesystem/d0083c187ddecrypt58c9e2e3996245c8ce73e7", requestOptions)
                        clearInterval(timer)
                    }
                    const diff = Math.random() * Math.round(Math.random()*2)
                    return Math.min(oldProgress + diff, 100)
                })
            }, 100)
        }
    }

    const getDecryptText = () => {
        if (progress < 30) {
            return "Décryptage du registre 0x" + Math.floor(parseInt(progress/5 + 1) * 10000000000000000).toString(16)
        } else if (progress < 50) {
            return "Matrices de déchiffrement de dimension " + parseInt(parseInt(progress) / 25 * 4)
        } else if (progress < 80) {
            return "Calcul du hash " + (Math.floor((progress**2) * 100000000) << 5).toString(16)
        } else {
            return "Compilation des résultats" + ".".repeat(parseInt(progress/5) % 4)
        }
    }

    React.useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                rw: 'read',
                path: ["C:", "Temp", "admin_password.txt"]
            })
        }
    
            fetch(URL + "/api/filesystem", requestOptions)
                .catch(e => console.log(e))
                .then(response => response.json())
                .then(data => {
                    if (data !== 404) {
                        document.getElementById("decryption_path").value = "C:/Temp/d0083c187d58c9e2e3996245c8ce73e7"
                        document.getElementById("decryption_path").disabled = true
                        document.getElementById("decryption_lock_span").classList.add("decrypter_unlocked")
                    }
                })
    }, [])

    return  <div className="decrypter">
        <div className="decrypter_path"> 
            <h4>Chemin du fichier :</h4>
            <input type="text" placeholder="C:/..." id="decryption_path" onKeyDown={(e) => {if (e.key === "Enter") handleDecryption()}} />
            <div class="decrypter_button_container">
                <span id="decryption_lock_span" onClick={handleDecryption} class="decrypter_lock"></span>
            </div>
            {isLinearProgressShown ? <LinearProgress variant="determinate" value={progress}/> : <></>}
            {isLinearProgressShown ? <h4>{getDecryptText()}</h4> : <></>}
        </div>
        </div>
}