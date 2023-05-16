import React from "react"
import "./login.css"
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { URL } from "../utils";

export default function LoginScreen({ connect }) {
    const [selectedProfile, setSelectedProfile] = React.useState("user")
    const [passwordError, setPasswordError] = React.useState(false)

    const handlePasswordSend = () => {
        if (document.getElementById("main_password")) {
            let enteredPassword = document.getElementById("main_password").value
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: enteredPassword, profile: selectedProfile })
            }
            fetch(URL + "/api/login", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        setPasswordError(false)
                        connect(selectedProfile)
                    } else {
                        setPasswordError(true)
                    }
                })
        }
    }

    return <div className="login_screen" style={{backgroundImage: selectedProfile === "user" ? "linear-gradient(rgba(0, 0, 255, 0.5), rgba(17, 209, 113, 0.5))" : "linear-gradient(rgba(0, 0, 50, 1), rgba(0, 0, 0, 1))"}}>
        {selectedProfile === "user" ? <ArrowForwardIosIcon className="change_profile" id="to_admin" onClick={() => setSelectedProfile("admin")}/> : <></>}
        <div id="main" style={{backgroundColor: selectedProfile === "user" ? "" : "white"}}>
            <img src={selectedProfile === "user" ? "https://scontent-cdg4-2.xx.fbcdn.net/v/t1.15752-9/344553298_612907147184514_4347248298599981906_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=qgCXIqG10CsAX_mICHF&_nc_ht=scontent-cdg4-2.xx&oh=03_AdR6skIbM8ZwlxX87f92Rj2zvttJQskBbc09bea2GxP-5Q&oe=647F2A06" : "https://www.freecodecamp.org/news/content/images/2022/03/pexels-pixabay-207580.jpg"} alt="profile" />
            <br />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="main_password">Mot de passe</InputLabel>
                <OutlinedInput
                    id="main_password"
                    type="password"
                    error={passwordError}
                    label="Mot de passe"
                    onKeyDown={(e) => { if (e.key === "Enter") handlePasswordSend() }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Se connecter"
                                onClick={handlePasswordSend}
                                edge="end"
                            >
                                <ArrowCircleRightIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {selectedProfile === "user" ? <div className="login_help" title="nom_prénom"><HelpOutlinedIcon  /></div> : <></>}
        </div>
        {selectedProfile === "admin" ? <ArrowBackIosIcon color="success" className="change_profile" id="to_user" onClick={() => setSelectedProfile("user")}/> : <></>}
    </div>
}