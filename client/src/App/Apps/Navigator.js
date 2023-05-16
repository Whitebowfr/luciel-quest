import React from 'react'
import "./library.css"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import HistoryIcon from '@mui/icons-material/History';
import {URL, sendUpdate, useScript} from '../../utils';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const errorPageHTML = "<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p>"

export default function Navigator(props) {
    const [history, setHistory] = React.useState([props.url ?? props.appdata.custom_properties.url ?? "https://www.gogol.com"])
    const [currentUrl, setCurrentURL] = React.useState(props.url ?? props.appdata.custom_properties.url ?? "https://www.gogol.com")
    const [currentUrlSearchBarValue, setCurrentUrlSearchBarValue] = React.useState(props.url ?? props.appdata.custom_properties.url ?? "https://www.gogol.com")
    const [urlHTML, setUrlHTML] = React.useState("")
    const [downloadProgress, setDownloadProgress] = React.useState(0)
    const [snackbarStatus, setSnackbarStatus] = React.useState(false)
    const [snackBarStatusError, setSnackbarStatusError] = React.useState("success")
    useScript(urlHTML, "webview")

    const handlePrevious = () => {
        if (history.length > 1) {
            let temp = [...history]
            temp.pop()
            setHistory(temp)
            setCurrentURL(temp[temp.length - 1])
            setCurrentUrlSearchBarValue(temp[temp.length - 1])
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
                url: currentUrl
            })
        }
        fetch(URL + "/api/internet", requestOptions)
            .catch(e => console.log(e))
            .then(data => data.text())
            .then(html => {
                if (html) {
                    setUrlHTML(html)
                } else {
                    setUrlHTML(errorPageHTML)
                }
            })
    }, [currentUrl])

    const downloadFile = (url) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                rw: 'download',
                path: url,
            })
        }
        fetch(URL + "/api/filesystem", requestOptions)
            .catch(e => console.log(e))
            .then(res => {
                console.log(res)
                setSnackbarStatus(true)
                if (res.status === 200) {
                    setSnackbarStatusError("success")
                } else {
                    setSnackbarStatusError("error")
                }
            })
    }

    React.useEffect(() => {
        const redirect = (e) => { goTo(e.detail) }
        document.addEventListener("url_redirect", redirect)
        let timer = null
        const dl = (e) => {
            console.log(timer)
            if (!timer) {
                let tempDownloadProgress = 0
                timer = setInterval(() => {
                    if (tempDownloadProgress >= 100) {
                        downloadFile(e.detail)
                        sendUpdate("Downloaded file : " + e.detail)
                        clearInterval(timer)
                        timer = null
                    }
                    tempDownloadProgress += Math.random() * 5
                    setDownloadProgress(tempDownloadProgress)
                }, 50)
            }
        }

        document.addEventListener("download", dl)
        return () => {
            if (timer) {
                clearInterval(timer)
                timer = null
            }
            console.log(timer)
            document.removeEventListener("url_redirect", redirect)
            document.removeEventListener("download", dl)
        }
    }, [])

    React.useEffect(() => {
        if (downloadProgress >= 100) {
            setDownloadProgress(0)
        }
    }, [downloadProgress])

    const handleCloseDownload = () => {
        setSnackbarStatus(false)
    }

    const changeUrlSearchBar = (e) => {
        if (e.keyCode === 13) {
            setCurrentURL(currentUrlSearchBarValue)
            setHistory([...history, currentUrlSearchBarValue])
        } else {
            setCurrentUrlSearchBarValue(e.target.value)
        }
    }

    const goTo = (url) => {
        sendUpdate("Navigated to " + url)
        setSnackbarStatus(false)
        setCurrentURL(url)
        setCurrentUrlSearchBarValue(url)
        setHistory(h => [...h, url])
    }

    return <React.Fragment>
        <div className="navbar">
            <ArrowCircleLeftIcon id="back_button" onMouseDown={handlePrevious} />
            <TextField id="url_input" style={{ width: "90%" }} type="text" autoComplete="off" value={currentUrlSearchBarValue} onChange={(e) => setCurrentUrlSearchBarValue(e.target.value)} onKeyDown={changeUrlSearchBar} />
            <HistoryIcon id="history_button" onClick={() => goTo("side://history")} />
        </div>
        <Box sx={{ width: '100%', display: downloadProgress === 0 ? "none" : "block" }} >
            <LinearProgress variant="determinate" value={downloadProgress} />
        </Box>
        <div id="webview" style={{ width: "100%", height: "100%", minHeight: '15vh', minWidth: '15vw', userSelect: "text" }} dangerouslySetInnerHTML={{ __html: urlHTML }}></div>
        <Snackbar open={snackbarStatus} autoHideDuration={2000} onClose={handleCloseDownload}>
            <Alert onClose={handleCloseDownload} severity={snackBarStatusError} sx={{ width: '100%' }}>
                {snackBarStatusError === "success" ? "Le fichier a été téléchargé avec succès" : "Une erreur est survenue lors du téléchargement"}
            </Alert>
        </Snackbar>
    </React.Fragment>
}