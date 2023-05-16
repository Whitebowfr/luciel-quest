import React from "react"
import "./library.css"
import Button from '@mui/material/Button';
import { URL } from "../../utils";

function getFileToOpen(content) {
    return {
        "type": "file",
        "file_name": "",
        "icon": "",
        "extension": "txt",
        "appid": 1,
        "custom_properties": {
            "content": content
        }
    }
}

export default function MailApp(props) {
    const [mails, setMails] = React.useState([])

    const refreshMails = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch(URL + "/api/mail", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setMails(Object.values(data))
            })
    }

    React.useEffect(() => {
        refreshMails()
        const timer = setInterval(refreshMails, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <React.Fragment>
            <div className="file_list" style={{padding: "5px"}}>
                <Button onClick={refreshMails}>Rafraîchir</Button>
                <h3 style={{marginBottom: "7px", marginTop: "0px", marginLeft: "7px"}}>Boîte de réception</h3>
                {mails.map((mail, i) => {
                    return <div key={i} className="file_display_wrapper" onClick={(e) => {if (e.button === 0 && e.detail === 1) props.openApp(getFileToOpen(mail.content))}}>
                        <h3 style={{ margin: 0 }}>{mail.subject}</h3>
                        <p style={{ color: "gray" }}>{mail.date}</p>
                    </div>
                })}
            </div>
        </React.Fragment>
    )
}