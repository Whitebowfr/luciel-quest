import React from 'react'
import applist from '../App/applist'
import { URL } from '../utils'

export default function DesktopIcon({ appdata, onClick }) {
    return <div style={{top: appdata.custom_properties.desktop_coords[1] + "px", left: appdata.custom_properties.desktop_coords[0] + "px"}} className="desktop_icon" onClick={onClick}>
        <img src={appdata.icon === "" ? applist[appdata.appid].icon_src : appdata.icon} alt=""></img>
        <p className='icon_name'>{appdata.file_name}</p>
    </div>
}

export function loadDesktopIcons(desktopId) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            rw: 'read',
            path: ['C:', 'Desktop']
        })
    }
    return new Promise((res, rej) => {
        fetch(URL + "/api/filesystem", requestOptions)
            .catch(e => console.log(e))
            .then(response => response.json())
            .then(data => {
                let sorted = Object.values(data.content)
                res(sorted)
            })
    })
}