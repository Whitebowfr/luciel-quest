import React from "react"
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import SnakeMiniGame from "./MiniGames/snake";
import DialogContent from '@mui/material/DialogContent';
import WordScramble from "./MiniGames/wordScramble";
import WordWriting from "./MiniGames/wordWriting";
import Wordroll from "./MiniGames/wordRoll";
import BlackHole from "./MiniGames/blackHole";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />
})

function GetMiniGame(miniGameId, handleFinish) {
    switch (miniGameId) {
        case 1 :
            return <SnakeMiniGame onFinish={handleFinish} />
        case 2 :
            return <WordScramble onFinish={handleFinish} />
        case 3 :
            return <WordWriting onFinish={handleFinish} />
        case 4 :
            return <Wordroll onFinish={handleFinish} />
        case 5 :
            return <BlackHole onFinish={handleFinish} />
        default :
            return
    }
}

export default function Minigame({ isOpen, onClose, miniGameId, handleFinish}) {
    return <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="lg"
        TransitionComponent={Transition}
        >
            <DialogContent sx={{backgroundColor: "rgb(56, 56, 56)"}}>
            {GetMiniGame(miniGameId, handleFinish)}
            </DialogContent>
    </Dialog>
}