import React from "react"
import "./library.css"

export default function ImageViewer(props) {
    return <div className="imageviewer">
        <img src={props.appdata.custom_properties.content} alt=""></img>
    </div>
}