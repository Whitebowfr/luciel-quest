import React from "react"
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { URL, sendUpdate } from "../../../utils";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

export default function InstallerWizard(props) {
    const [progress, setProgress] = React.useState(0);
    const [isLoggedIn, setLoggedIn] = React.useState(false)
    const [isError, setError] = React.useState(false)

    React.useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        let step = 0.01
        setProgress(0)
        const timer = setInterval(() => {
            setProgress((current) => {
                let progress = current + step
                if (Math.random() > 0.7) {
                    progress += (Math.random() * 20) - 7.5
                }
                if (progress >= 100) {
                    clearInterval(timer)
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify({
                            "key": "nnettoyeurDownloaded",
                            "value": true
                        })
                    }
                    sendUpdate("NNettoyeur installé")
                    fetch(URL + "/api/change_constant", requestOptions)
                        .catch(e => console.log(e))
                    return 100
                }
                return progress
            })
        }, 100);

        return () => {
            clearInterval(timer)
        }
    }, [isLoggedIn])

    const getText = () => {
        if (progress < 30) {
            return "Installation des dépendances" + ".".repeat(Math.max(0, parseInt(progress/5) % 4))
        } else if (progress < 50) {
            return "Téléchargement des fichiers" + ".".repeat(parseInt(progress/5) % 4)
        } else if (progress < 80) {
            return "Installation des fichiers" + ".".repeat(parseInt(progress/5) % 4)
        } else if (progress < 100) {
            return "Nettoyage des fichiers temporaires" + ".".repeat(parseInt(progress/5) % 4)
        } else {
            return "Installation terminée !!"
        }
    }

    const handleChange = (e) => {
        if (e.target.value.length > 6) {
            setError(true)
        }
        if (e.target.value.length === 6) {
            if (e.target.value === "666888") {
                setError(false)
                setLoggedIn(true)
            } else {
                setError(true)
            }
        }
    }

    return <div className="installerwizard" style={{padding: "10px"}}>
        {isLoggedIn ? <React.Fragment><h1>Installation de NNettoyeur v0.4</h1>
        <BorderLinearProgress variant="determinate" value={progress} />
        <h4>{getText()}</h4></React.Fragment> : <React.Fragment><h1>Veuillez rentrer votre clé d'activation :</h1> <TextField type="number" error={isError} placeholder="ex. 010101" onKeyDown={handleChange}/></React.Fragment>}
        
    </div>
}