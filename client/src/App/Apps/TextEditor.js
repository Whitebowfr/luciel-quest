import React from "react"
import "./library.css"

function getNavigatorFromURL(url) {
    return {
        "type": "file",
        "icon": "",
        "extension": "exe",
        "file_name": "Side.exe",
        "appid": 6,
        "custom_properties": {
            "url": url
        }
    }
}

export default function TextEditor({ openApp, appdata}) {
    React.useEffect(() => {
        const func = (e) => {
            console.log("panic")
            openApp(getNavigatorFromURL(e.detail))
        }
        document.addEventListener('url_redirect', func)

        return () => {
            document.removeEventListener('url_redirect', func)
        }
    }, [openApp])
    return <div style={{userSelect: "text"}} dangerouslySetInnerHTML={{__html: appdata.custom_properties.content}}></div>
}