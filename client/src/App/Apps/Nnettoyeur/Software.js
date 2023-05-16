import React from "react"
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
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

export default function NNettoyeur(props) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        if (props?.appdata?.custom_properties?.file_name === "Homework") {
            let step = 0.01
            const timer = setInterval(() => {
                setProgress((current) => {
                    let progress = current + step
                    if (Math.random() > 0.7) {
                        progress += (Math.random() * 10)
                    }
                    if (progress >= 100) {
                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*"
                            },
                            body: JSON.stringify({
                                "key": "isFileCleaned",
                                "value": true
                            })
                        }
                        sendUpdate("Fichiers nettoyés")
                        fetch(URL + "/api/change_constant", requestOptions)
                            .catch(e => console.log(e))
                        clearInterval(timer)
                        return 100
                    }
                    return progress
                })
            }, 200);

            return () => {
                clearInterval(timer)
            }
        }
    }, [props])

    const getText = () => {
        if (progress < 80) {
            return "Suppression des fichiers (" + parseInt(progress / 80 * 23480) + " / 23480)"
        } else if (progress < 100) {
            return "Réflexion intense" + ".".repeat(parseInt(progress / 5) % 4)
        } else {
            return "Nettoyage terminé !"
        }
    }

    return <div className="installerwizard" style={{ padding: "10px", textAlign: "center", backgroundColor: "rgb(139, 233, 230)" }}>
        {props?.appdata?.custom_properties?.file_name === "Homework" ? <React.Fragment><BorderLinearProgress variant="determinate" value={progress} />
            <h4>{getText()}</h4></React.Fragment> : <h4>Il n'y a rien à nettoyer !</h4>}
    </div>
}