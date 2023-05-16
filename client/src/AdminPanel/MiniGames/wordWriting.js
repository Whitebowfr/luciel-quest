import React from "react"
import TextField from '@mui/material/TextField';
import "./lib.css"


const sentences = [
    "Hack mainframe",
    "Download virus",
    "Eat pizza",
    "Expose ports",
    "Pirate software",
    "Modify database",
    "Crack password",
    "Modify firewall",
    "Bypass security",
    "Disable antivirus",
    "Install backdoor",
    "Hack the planet",
    "Say I'm in",
    "Destroy evidence",
    "Delete logs",
    "Encrypt data",
    "Decrypt data",
    "Install ransomware",
    "Install keylogger",
    "Install spyware",
    "Install malware",
    "Install trojan",
    "Install rootkit",
    "Install adware",
    "Setup botnet",
    "Setup proxy",
    "Reverse engineer program",
    "Setup honeypot",
    "Send phishing email",
    "Call social engineer",
    "Exploit vulnerability",
    "Dox target",
    "Execute SQL injection",
    "Execute XSS attack",
    "Execute CSRF attack",
    "Sniff network",
    "Retrieve password",
    "Retrieve credit card",
    "Download illegal content",
    "Call the FBI"
]
function getRandomWord(previousWords) {
    let word = sentences[Math.floor(Math.random() * sentences.length)]
    while (previousWords.includes(word)) {
        word = sentences[Math.floor(Math.random() * sentences.length)]
    }
    return word
}

export default function WordWriting({onFinish}) {
    const [timeRemaining, setTimeRemaining] = React.useState(40)
    const [inputVal, setInputVal] = React.useState("")
    const [currentWord, setCurrentWord] = React.useState("")
    const [wordsWritten, setWordsWritten] = React.useState(0)
    const [previousWords, setPreviousWords] = React.useState([])

    React.useEffect(() => {
        let timer = setInterval(() => {
            if (timeRemaining > 0) {
                setTimeRemaining((time) => time - 0.1)
            } else {
                clearInterval(timer)
                onFinish(false)
            }
        }, 100)

        return () => clearInterval(timer)
    }, [onFinish, timeRemaining])

    React.useEffect(() => {
        if (wordsWritten >= 10) {
            onFinish(true)
        }
    }, [wordsWritten, onFinish])

    React.useEffect(() => {
        setCurrentWord(getRandomWord([]))
    }, [])

    const handleChange = (e) => {
        let str = e.target.value
        if (str.toUpperCase() === currentWord.toUpperCase().split("").splice(0, str.length).join("")) {
            setInputVal(currentWord.split("").splice(0, str.length).join(""))
        } else {
            setInputVal(str)
        }
        if (e.target.value.toUpperCase() === currentWord.toUpperCase()) {
            setWordsWritten((words) => words + 1)
            setInputVal("")
            setCurrentWord(getRandomWord([...previousWords, currentWord]))
            setPreviousWords((words) => [...words, currentWord])
        }
    }

    return <div className="writing_container">
        <h2>Time Remaining: {timeRemaining.toFixed(1)}</h2>
        <h2>Security flaws exploited : {"+".repeat(wordsWritten)}{"-".repeat(10 - wordsWritten)}</h2>
        <div data-text={currentWord} className="writing_word">
            <TextField id="writing_input" variant="standard" onChange={handleChange} fullWidth value={inputVal} />
        </div>
    </div>
}