import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./library.css"

export default function PropertiesViewer(props) {
    return <Card sx={{ width: "100%", height: "100%", maxWidth: "100%" }}>
        <CardContent>
            <table className='properties_table'>
                <tbody>
                    {getPropertiesAsList(props.appdata.custom_properties).map((x, i) => {
                        return <tr key={i}>
                            <td className='properties_key'>{x[0]}</td>
                            <td className='properties_value'>{x[1]}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </CardContent>
    </Card>
}

function getPropertiesAsList(file) {
    let filebis = {...file}
    let list = []

    if (filebis.type === "folder") {
        list.push(["sub_files", Object.values(filebis.content).length])
    } else if (filebis.content) {
        list.push(["size", filebis.content.length * 2 + "Ko"])
    }
    delete filebis.content

    for (let [key, value] of Object.entries(filebis)) {
        if (key === "custom_properties") {
            list.push(...getPropertiesAsList(value))
        } else {
            if (value === "") {
                value = "None"
            }
            list.push([key, value.toString()])
        }
    }
    return list
}