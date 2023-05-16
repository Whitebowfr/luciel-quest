import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function ContextMenu(props) {
    return (
        <Card sx={{ minWidth: 275, padding: 0 }}>
            <CardContent sx={{padding: "1px"}}>
                <h3 style={{margin: "3px"}}>Context Menu</h3>
                <ul style={{listStyleType: "none", padding: 0, marginTop: "10px"}}>
                    {/* Ligne fumeuse celle là */}
                    {props.appdata.custom_properties.options.map((x, i) => <li style={{border: "1px solid gray", padding: '3px'}} key={i} onClick={() => x[1]()}>{x[0]}</li>)}
                </ul>
            </CardContent>
        </Card>
    )
}