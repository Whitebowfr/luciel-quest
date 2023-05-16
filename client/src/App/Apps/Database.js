import React from "react"
import TextField from '@mui/material/TextField';
import "./library.css"
import RefreshIcon from '@mui/icons-material/Refresh';
import { URL, sendUpdate } from "../../utils";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const fullDatabase = [
    {nom: "Desprès", prenom: "Frédéric", role: "Directeur général des services", ip: "176.208.85.204"},
    {nom: "Georges", prenom: "Françoise", role: "Directrice d'aide au pilotage et amélioration continue", ip: "114.183.212.72"},
    {nom: "Blanc", prenom: "Céline", role: "Directrice des ressources humaines", ip:"170.107.145.245"},
    {nom: "Laurent", prenom: "Isabelle", role: "Directrice des affaires financières", ip:"19.88.193.222"},
    {nom: "Lila-Helmer", prenom: "Davy", role: "Directeur des affaires juridiques", ip:"209.250.43.104"},
    {nom: "Habouzit", prenom: "Nathalie", role: "Directrice administrative de la formation", ip:"7.238.221.33"},
    {nom: "Jacquin", prenom: "Mélanie", role: "Directrice administrative de la recherche", ip:"22.52.40.201"},
    {nom: "Lafrate", prenom: "Corinne", role: "Directrice administrative des relations internationales", ip:"53.130.18.123"},
    {nom: "Chapre", prenom: "Pascale", role: "Directrice administrative de la formation continue", ip:"71.133.170.146"},
    {nom: "Fotiadu", prenom: "Frédéric", role: "Directeur"}
]

export default function Database(props) {
    const [smallDatabase, setSmallDatabase] = React.useState(fullDatabase)
    const [fotiaduIP, setFotiaduIP] = React.useState("[REDACTED]")
    const [snackbarStatus, setSnackbarStatus] = React.useState(false)

    React.useEffect(() => {
        refresh()
        const timer = setInterval(refresh, 5000)
        return () => clearInterval(timer)
    }, [])

    const refresh = () => {
        fetch(URL + "/api/get_constant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: "isIpAvailable"
            })
        })
            .then(res => res.json())
            .then(res => {
                setFotiaduIP(res)
            })
    }

    const handleChange = (e) => {
        let value = e.target.value
        let newDatabase = fullDatabase.filter(x => {
            return x.nom.toLowerCase().includes(value.toLowerCase()) || x.prenom.toLowerCase().includes(value.toLowerCase()) || x.role.toLowerCase().includes(value.toLowerCase())
        })
        setSmallDatabase(newDatabase)
    }

    const handleClick = () => {
        props.openApp({appid: 12})
    }

    const handleDownload = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                rw: 'download',
                path: "fotiadu_ip.txt",
            })
        }
        sendUpdate("Téléchargement fichier fotiadu_ip.txt")
        fetch(URL + "/api/filesystem", requestOptions)
            .catch(e => console.log(e))
            .then(res => {
                setSnackbarStatus(true)
            })
    }

    const handleCloseDownload = () => {
        setSnackbarStatus(false)
    }

    return <div className="database">
        <div className="navbar">
            <TextField id="database_path_input" placeholder="Filter" style={{ width: "90%" }} onChange={handleChange} type="text" autoComplete="off" />
            <RefreshIcon onClick={refresh} style={{ cursor: "pointer", transform: "translateY(20px)" }} title="Mettre à jour" />
        </div>
        <div className="database_content">
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Role</th>
                        <th>IP</th>
                    </tr>
                </thead>
                <tbody>
                    {smallDatabase.map((x, i) => {
                        return <tr key={i}>
                            <td>{x.nom}</td>
                            <td>{x.prenom}</td>
                            <td>{x.role}</td>
                            <td className={x.nom === "Fotiadu" ?  fotiaduIP === "[REDACTED]" ? "fotiadu" : "link" : ""} onClick={() => {
                                if (x.nom === "Fotiadu" && fotiaduIP === "[REDACTED]") handleClick()
                                if (x.nom === "Fotiadu" && fotiaduIP !== "[REDACTED]") handleDownload()
                            }}>{x.nom === "Fotiadu" ? fotiaduIP : x.ip}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        <Snackbar open={snackbarStatus} autoHideDuration={2000} onClose={handleCloseDownload}>
            <Alert onClose={handleCloseDownload} severity="success" sx={{ width: '100%' }}>
                Le fichier a été téléchargé avec succès
            </Alert>
        </Snackbar>
    </div>
}