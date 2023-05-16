import React from "react"
import "./lib.css"

const words = [
    "MALIBOOS",
    "URINOIRS",
    "SYNTHESE",
    "SPECTRES",
    "SOCIETES",
    "LANIERES",
    "KIDNAPPE",
    "IRIDIUMS",
    "IONISANT",
    "INEGALES",
    "USINERAI",
    "DILUTION",
    "ETUDIANT",
    "SCIENCES",
    "DERIVEES",
    "INTEGRAL",
    "INFINIES",
    "VECTEURS",
    "PRODUITS",
    "FONCTION"
]

function getRandomWord(previous) {
    let word = words[Math.floor(Math.random() * words.length)]
    while (previous.includes(word)) {
        word = words[Math.floor(Math.random() * words.length)]
    }
    return word
}

export default function Wordroll({ onFinish }) {
    const [timeRemaining, setTimeRemaining] = React.useState(20)
    const [selectedChannel, setSelectedChannel] = React.useState(0)
    const [currentWord, setCurrentWord] = React.useState("")
    const [channels, setChannels] = React.useState([])
    const [lockedChannels, setLockedChannels] = React.useState([])

    const generateChannels = (word) => {
        let fullChannels = []
        for (let letter in word) {
            let channel = [word[letter]]
            for (let i = 0; i < 8; i++) {
                let lettr = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
                while (channel.includes(lettr)) {
                    lettr = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
                }
                channel.push(lettr)
            }
            channel = channel.sort(() => Math.random() - 0.5)
            fullChannels.push(channel)
        }
        setChannels(fullChannels)
    }

    React.useEffect(() => {
        let word = getRandomWord([])
        setCurrentWord(word)
        generateChannels(word)
        let timer = setInterval(() => {
            setTimeRemaining((time) => {
                if (time <= 0) {
                    clearInterval(timer)
                    onFinish(false)
                }
                return time - 0.1
            })
        }, 100)

        return () => clearInterval(timer)
    }, [onFinish])

    React.useEffect(() => {
        let timer = setInterval(() => {
            for (let channelId = 0; channelId < channels.length; channelId++) {
                if (document.getElementById("channel_" + channelId) && !lockedChannels.includes(channelId)) {
                    document.getElementById("channel_" + channelId).innerText = channels[channelId][0]
                    document.getElementById("channel_" + channelId).setAttribute("data-previous", channels[channelId][1])
                    document.getElementById("channel_" + channelId).setAttribute("data-correct", channels[channelId][0] === currentWord[channelId])
                    document.getElementById("channel_" + channelId).setAttribute("data-correct-previous", channels[channelId][1] === currentWord[channelId])
                    document.getElementById("channel_" + channelId).setAttribute("data-correct-next", channels[channelId][channels[channelId].length - 1] === currentWord[channelId])
                    document.getElementById("channel_" + channelId).setAttribute("data-next", channels[channelId][channels[channelId].length - 1])
                    setChannels((channelsb) => {
                        let tmp = [...channelsb]
                        tmp[channelId] = [...tmp[channelId].slice(1, tmp[channelId].length), ...tmp[channelId].slice(0, 1)]
                        return tmp
                    })
                }
            }
        }, 400)

        return () => clearInterval(timer)
    }, [channels, selectedChannel, currentWord, lockedChannels])

    React.useEffect(() => {
        if (document.getElementById("channel_" + selectedChannel)) {
            document.getElementById("channel_" + selectedChannel).classList.add("selected")
        }
    }, [selectedChannel])

    React.useEffect(() => {
        let func = (e) => {
            if (e.button === 0) {
                let curLetter = document.getElementById("channel_" + selectedChannel)?.innerText
                if (curLetter && curLetter === currentWord[selectedChannel]) {
                    setLockedChannels((locked) => [...locked, selectedChannel])
                    setSelectedChannel((channel) => channel + 1)
                    if (lockedChannels.length === currentWord.length - 1) {
                        onFinish(true)
                    }
                } else if (curLetter) {
                    setSelectedChannel(0)
                    setLockedChannels([])
                }
            }
        }

        document.addEventListener("mousedown", func)
        return () => document.removeEventListener("mousedown", func)
    }, [channels, currentWord, selectedChannel, onFinish, lockedChannels])

    return <div className="roll_container">
        <h2>Time remaining: {timeRemaining.toFixed(1)}</h2>
        {channels.map((channel, index) => <div key={index} className={index === selectedChannel ? "roll_letter selected" : "roll_letter"} id={"channel_" + index}></div>)}
    </div>
}