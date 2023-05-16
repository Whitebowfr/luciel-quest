import express from 'express'
import {GetFile, WriteFile, DownloadFile, UnlockFile, getConstants, setConstant} from "./Filesystem/filesystem.js"
import cors from "cors"
import { theEntireInternet } from './internet.js'
import { mails } from './mails.js'
import { getComputerAtIp, updateComputerAtIp } from './Network/main.js'
import path from "path"
import { addToLogs } from './Progress/utils.js'
import { URL } from "url"

let app = express()

app.use(cors())

app.use(express.json());

let dir = path.join("./public")
app.use(express.static(dir))


app.post("/api/filesystem", function(req, res) {
    if (Object.keys(req.query).length !== 0) {
        req.body = req.query
    }
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (req.body.rw === "read") {
        GetFile(req.body.path)
            .catch((err) => {
                res.sendStatus(err)
            })
            .then((data) => res.json(data))
    } else if (req.body.rw === "write") {
        WriteFile(req.body.file)
            .then(() => {
                res.sendStatus(200)
            })
    } else if (req.body.rw === "unlock") {
        UnlockFile(req.body.path, req.body.password)
            .catch((err) => {
                res.sendStatus(err)
            })
            .then(() => {
                if (!res.headersSent) {
                    res.sendStatus(200)
                }
            })
    } else if (req.body.rw === "download") {
        DownloadFile(req.body.path)
            .catch((err) => res.sendStatus(err))
            .then((data) => {
                res.sendStatus(data)
            })
    } else {
        res.statusCode = 405
        res.send("Method not allowed")
    }
})

app.post("/api/internet", function(req, res) {
    if (Object.keys(req.query).length !== 0) {
        req.body = req.query
    }
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (req.body.url) {
        res.send(theEntireInternet[req.body.url] ?? "")
    } else {
        res.send("")
    }
})

app.get("/api/mail", async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let temp = {}
    for (let key in mails) {
        if (mails[key].unlockedConstant) {
            let val = await getConstants(mails[key].unlockedConstant)
            if (Boolean(val[mails[key].unlockedConstant])) {
                temp[key] = mails[key]
            }
        } else {
            temp[key] = mails[key]
        }
    }
    res.send(temp)
})

app.post("/api/change_constant", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    
    setConstant(req.body.key, req.body.value)
        .then(data => {
            if (req.body.key === "isFileCleaned") {
                WriteFile({
                    type: "folder",
                    file_name: "Homework",
                    path: ["C:", "Homework"],
                    content: {
                        bd: {
                            type: "file",
                            file_name: "base_données_DSI.bd",
                            extension: "bd",
                            appid: 11
                        }
                    }
                })
            }
            res.sendStatus(data)
        })
})

app.post("/api/get_constant", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (!req.body.key.includes("auth")) {
        getConstants()
            .then(data => {
                if (req.body.key === "isIpAvailable") {
                    if (data[req.body.key]) {
                        res.json("download")
                    } else {
                        res.json("[REDACTED]")
                    }
                    return
                }
                res.json(data[req.body.key] ?? null)
            })
    } else {
        res.sendStatus(401)
    }
})

app.post("/api/login", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    getConstants()
        .then(data => {
            if (!data.auth_loginPassword[req.body.profile]) {
                res.sendStatus(404)
            } else if (data.auth_loginPassword[req.body.profile].toLowerCase() === req.body.password.toLowerCase()) {
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
        })
})

app.get("/api/filesystem/d0083c187ddecrypt58c9e2e3996245c8ce73e7", function(req, res) {
    addToLogs("Décryptage du fichier admin_password.txt")
    WriteFile({
        "file_name": "admin_password.txt",
        "type": "file",
        "icon": "",
        "extension": "txt",
        "appid": 1,
        "custom_properties": {
            "content": "Le mot de passe administrateur est : Oh#]eW,PykrX#j-"
        },
        "path": ["C:", "Temp", "d0083c187d58c9e2e3996245c8ce73e7"]
    }, "azerty")
        .catch(e => console.log(e))
        .then(e => res.sendStatus(e))
})

app.post("/api/network/update", function(req, res) {
    if (req.body.ip && req.body.key) {
        updateComputerAtIp(req.body.ip, req.body.key, req.body.val)
            .catch(e => res.sendStatus(e))
            .then(data => res.sendStatus(data))
    } else {
        res.sendStatus(400)
    }
})

app.post("/api/network/get", function(req, res) {
    if (req.body.ip) {
        getComputerAtIp(req.body.ip)
            .catch(e => res.sendStatus(e))
            .then(data => res.json(data))
    } else {
        res.sendStatus(404)
    }
})

app.post("/api/progressUpdate", function(req, res) {
    addToLogs(req.body.data)
    res.sendStatus(200)
})

app.get("/logs", function(req, res) {
    const __dirname = new URL(".", import.meta.url).pathname
    let str = __dirname + "Progress/logs.txt"
    str = str.split("")
    str.shift()
    str = str.join("")
    res.sendFile(str)
})

const isDev = true
app.listen(isDev ? 3001 : 8006, function() {
    console.log("Listening on " + isDev ? "3001" : "8006")
})

