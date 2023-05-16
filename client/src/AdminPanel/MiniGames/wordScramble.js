import React from "react"
import "./lib.css"
import TextField from '@mui/material/TextField';

const words = [
    "MALIBOOS",
    "LUCIEL",
    "HACKER",
    "INSA",
    "MATHEMATIQUE",
    "FOTIADU",
    "PATATE",
    "PREVERT",
    "ANNIVERSAIRE",
    "SAUCISSON",
    "ECOCUP"
]

export  default function WordScramble({ onFinish }) {
    const [timeRemaining, setTimeRemaining] = React.useState(60)
    const [wordsFinished, setWordsFinished] = React.useState(0)
    const [currentWord, setCurrentWord] = React.useState("")
    const [previousWords, setPreviousWords] = React.useState([])
    const [twoLetters, setTwoLetters] = React.useState([])
    const [inputVal, setInputVal] = React.useState("")

    React.useEffect(() => {
        if (wordsFinished >= 5) {
            onFinish(true)
        }
    }, [wordsFinished, onFinish])

    React.useEffect(() => {
        setTwoLetters(getTwoLetters(currentWord))
    }, [currentWord])

    const startNewWord = () => {
        let tmpPrevious = [...previousWords, currentWord]
        setPreviousWords((wordss) => [...wordss, currentWord])
        let curWord = words[Math.floor(Math.random() * words.length)]
        console.log(curWord, tmpPrevious, tmpPrevious.includes(curWord))
        while (tmpPrevious.indexOf(curWord) !== -1) {
            curWord = words[Math.floor(Math.random() * words.length)]
        }
        setCurrentWord(curWord)
    }

    React.useEffect(() => {
        setCurrentWord(words[Math.floor(Math.random() * words.length)])
    }, [])

    React.useEffect(() => {
        setPreviousWords([])
    }, [])

    React.useEffect(() => {
        let timer = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(timer)
                onFinish(false)
            } else {
                setTimeRemaining((time) => time - 0.1)
            }
        }, 100)

        return () => clearInterval(timer)
    }, [onFinish, timeRemaining])

    const getTwoLetters = (word) => {
        let queue = []
        for (let i = 0; i < word.length; i += 2) {
            if (word[i + 1]) {
                queue.push(word[i] + word[i + 1])
            } else {
                queue.push(word[i])
            }
        }
        queue = queue.sort(() => Math.random() - 0.5)
        return queue
    }

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            let word = inputVal
            if (word === currentWord) {
                setWordsFinished((words) => words + 1)
                setInputVal("")
                startNewWord()
            }
        }
    }

    return <div className="word_scramble">
        <h2 id="time-remaining">Temps restant : {timeRemaining.toFixed(1)}</h2>
        <div clasName="word_indicator_container">
            {new Array(wordsFinished).fill(0).map((x, i) => <div key={i} className="word_indicator word_completed"/>)}
            {new Array(5 - wordsFinished).fill(0).map((x, i) => <div key={i} className="word_indicator"/>)}
        </div>
        {twoLetters.map(x => <h2 className="word_scramble_letters" key={x}>{x}</h2>)}
        <br/>
        <TextField id="word_scramble_input" onChange={(e) => setInputVal(e.target.value.toUpperCase())} onKeyDown={handleSubmit} value={inputVal} />
    </div>
}