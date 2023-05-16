import React from "react"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import TextField from '@mui/material/TextField';
import "./library.css"
import applist from "../applist";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { URL, sendUpdate } from "../../utils";

async function getFilesInDir(path) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            rw: 'read',
            path: path
        })
    }

    return new Promise((res, rej) => {
        fetch(URL + "/api/filesystem", requestOptions)
            .catch(e => console.log(e))
            .then(response => {
                if (response.status === 404) {
                    res("Wrong path")
                    return
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    if (data.content === undefined && data.locked) {
                        rej("locked")
                    } else {
                        let sorted = Object.values(data.content)
                        res(sorted)
                    }
                } else {
                    res("Wrong path")
                }
            })
    })
}

export default function FileExplorer({ basePath, openApp, onContextMenu }) {
    let [path, setPath] = React.useState([basePath ?? "C:"])
    let [currentFiles, setCurrentFiles] = React.useState([])
    let [isPasswordOpen, setPasswordOpen] = React.useState(false)
    let [isPasswordError, setPasswordError] = React.useState(false)
    let [pathInput, setPathInput] = React.useState(path)
    let [isPathValid, setPathValid] = React.useState(true)

    let handlePrevious = () => {
        if (path.length > 1) {
            let temp = [...path]
            temp.pop()
            setPath(temp)
        }
    }


    React.useEffect(() => {
        const refreshFiles = () => {
            getFilesInDir(path)
                .catch((err) => {
                    if (err === "locked") {
                        setPasswordOpen(true)
                    }
                    if (err === 404) {
                        setPathValid(false)
                    }
                })
                .then((files) => {
                    if (files === "Wrong path") {
                        setPathValid(false)
                    } else {
                        setPathInput(path)
                        setPathValid(true)
                        setCurrentFiles(files ?? [])
                    }
                })
        }
        refreshFiles()
        const timer = setInterval(() => {
            if (path[1] !== "Homework") refreshFiles()
        }, 5000)
        return () => clearInterval(timer)
    }, [path])

    let handleClick = (file, e) => {
        if (e.button === 0 && e.detail === 1) {
            if (file.type === "folder") {
                setPath([...path, file.file_name])
            } else {
                openApp(file)
            }
        }
    }

    let handleContextMenu = (file, event) => {
        let properties_viewer = { appid: 5 }
        properties_viewer.custom_properties = file
        let context_menu_app = { appid: 4 }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                key: "nnettoyeurDownloaded"
            })
        }
        fetch(URL + "/api/get_constant", requestOptions)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                let tempOptions = [["Propriétés", () => { openApp(properties_viewer) }]]
                if (data) {
                    let nnettoyeur = { appid: 9 }
                    nnettoyeur.custom_properties = file
                    tempOptions.push(["NNettoyer", () => { openApp(nnettoyeur) }])
                }
                context_menu_app.custom_properties = { options: tempOptions }
                context_menu_app.custom_properties.openAtCoords = [event.clientX, event.clientY]
                onContextMenu(context_menu_app)
            })

    }

    let handlePasswordClose = () => {
        handlePrevious()
        setPasswordOpen(false)
        setPasswordError(false)
    }

    let handlePasswordChange = (e) => {
        if (e.keyCode === 13) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    rw: 'unlock',
                    path: path,
                    password: e.target.value
                })
            }
            fetch(URL + "/api/filesystem", requestOptions)
                .catch(e => console.log(e))
                .then(response => {
                    if (response.status === 200) {
                        setPasswordOpen(false)
                        setPasswordError(false)
                        getFilesInDir(path)
                            .catch((err) => {
                                if (err === "locked") {
                                    setPasswordOpen(true)
                                }
                                if (err === 404) {
                                    setPathValid(false)
                                }
                            })
                            .then((files) => {
                                if (files === "Wrong path") {
                                    setPathValid(false)
                                } else {
                                    sendUpdate("Unblocked file at : " + path.join("/"))
                                    setPathInput(path)
                                    setPathValid(true)
                                    setCurrentFiles(files ?? [])
                                }
                            })
                    } else if (response.status === 423) {
                        setPasswordError(true)
                    } else {
                        console.log(response)
                    }
                })
        }
    }

    return <div className="fileexplorer">
        <Dialog open={isPasswordOpen} onClose={handlePasswordClose}>
            <DialogTitle>Erreur</DialogTitle>
            <DialogContent>
                <DialogContentText>Ce dossier est verrouillé. Veuillez rentrer le mot de passe :</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Mot de passe"
                    fullWidth
                    id="password"
                    error={isPasswordError}
                    helperText={isPasswordError ? "Mot de passe incorrect" : ""}
                    onKeyDown={handlePasswordChange}
                />
                {path.join("/") === "C:/Documents/Journal" ? <DialogActions>
                    <Button onClick={() => {
                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*"
                            },
                            body: JSON.stringify({
                                "key": "isRecoveryMailReceived",
                                "value": true
                            })
                        }
                        fetch(URL + "/api/change_constant", requestOptions)
                            .catch(e => console.log(e))
                            .then(res => {
                                if (res.status === 200) {
                                    sendUpdate("Mail récupération mdp envoyé")
                                    handlePasswordClose()
                                }
                            })
                    }}>Récupérer son mot de passe (par mail)</Button>
                </DialogActions> : ""}
            </DialogContent>
        </Dialog>
        <div className="navbar">
            <ArrowCircleLeftIcon id="back_button" onMouseDown={handlePrevious} />
            <TextField id="path_input" error={!isPathValid} style={{ width: "90%" }} type="text" autoComplete="off" value={pathInput.join('/')} onChange={(event) => {
                setPathInput(event.target.value.split('/'));
            }} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    let temp = [...pathInput]
                    if (temp[temp.length - 1] === "") {
                        temp.pop()
                    }
                    setPath(temp)
                }
            }} />
        </div>
        <div className="file_list">
            {currentFiles.filter(x => !x?.custom_properties?.hidden).map((x, idx) => <FileDisplay key={idx} file={x} onClick={(e) => handleClick(x, e)} onContextMenu={(e) => {
                e.preventDefault()
                handleContextMenu(x, e)
            }} />
            )}
        </div>
    </div>
}


export function FileDisplay({ file, onClick, onContextMenu }) {
    return <div className="file_display_wrapper" onMouseDown={onClick} onContextMenu={onContextMenu}>
        <img src={getFileIcon(file)} alt="" />
        <p>{file.file_name}</p>
    </div>
}

function getFileIcon(file) {
    if (file.type === "folder") {
        return applist[2].icon_src
    }
    if (file.icon === "" || file.icon === undefined) {
        return applist[file.appid].icon_src
    }
    return file.icon
}