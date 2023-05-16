import { readFile, writeFile } from "fs"
import { Downloadables } from "./downloadables.js"
const authPassword = "azerty"

export async function GetFile(path, auth = "") {
    return new Promise((res, rej) => {
        if (path[0] != "C:") {
            rej(404)
            return
        }
        readFile("./Filesystem/filesystem.json", "utf8", (err, jsonStr) => {
            if (err) {
                rej(err)
                return
            } else {
                let json = JSON.parse(jsonStr)
                if (path[1] === "Homework" && !json.Constants.isFileCleaned) {
                    let folder = {
                        type: "folder",
                        file_name: path.pop(),
                        custom_properties: {
                            size: "∞ Ko"
                        },
                        content: generateRecursiveFolders(Math.floor(Math.random() * 10) + 1)
                    }
                    res(folder)
                    return
                }
                let currentFolder = json
                let filename = path.pop()
                path.forEach(folder => {
                    if (currentFolder[folder] !== undefined && (!currentFolder[folder].locked || auth === authPassword)) {
                        currentFolder = currentFolder[folder]
                        if (currentFolder.type === "folder") {
                            currentFolder = currentFolder.content
                        }
                    } else if (currentFolder[folder] === undefined) {
                        res(404)
                        return
                    } else {
                        res(401)
                        return
                    }
                })
                if (currentFolder[filename] === undefined) {
                    res(404)
                    return
                }
                if (currentFolder[filename].hidden_properties?.recursive) {
                    currentFolder[filename].content = generateRecursiveFolders(Math.floor(Math.random() * 10) + 1)
                }
                if (currentFolder[filename].locked) {
                    delete currentFolder[filename].content
                }
                if (auth !== authPassword) {
                    currentFolder[filename] = deleteHiddenFolders(currentFolder[filename])
                }
                res(currentFolder[filename])
                return
            }
        })
    })
}

function generateRecursiveFolders(number) {
    let folders = {}
    for (let i = 0; i < number; i++) {
        folders[`folder${i}`] = {
            type: "folder",
            file_name: randomString(10, true),
            hidden_properties: {
                recursive: true
            },
            custom_properties: {
                size: "∞ Ko"
            }
        }
    }
    return folders
}

function randomString(length, limitToAlphabet = false) {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$£*µù%:/!§;.,?&é'(-è_çà)=+}]@^\`|[{#~²<>"
    if (limitToAlphabet) {
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    let str = ""
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str
}

export async function DownloadFile(url) {
    return new Promise((res, rej) => {
        if (Downloadables[url] !== undefined && Downloadables[url].path.length >= 1) {
            WriteFile(Downloadables[url])
                .catch(err => console.log(err))
                .then(status => {
                    res(status)
                })
        } else {
            res(404)
        }
    })
}

export async function UnlockFile(path, password) {
    return new Promise((res, rej) => {
        if (path[0] != "C:") {
            rej(404)
            return
        }
        readFile("./Filesystem/filesystem.json", "utf8", (err, jsonStr) => {
            if (err) {
                rej(err)
                return
            } else {
                let json = JSON.parse(jsonStr)
                let currentFolder = json
                let absolutePath = path
                let filename = absolutePath.pop()
                absolutePath.forEach(folder => {
                    if (currentFolder[folder] !== undefined) {
                        currentFolder = currentFolder[folder]
                        if (currentFolder.type === "folder") {
                            currentFolder = currentFolder.content
                        }
                    } else {
                        rej(404)
                        return
                    }
                })
                if (currentFolder[filename] === undefined) {
                    rej(404)
                    return
                }
                if (currentFolder[filename].locked && password === currentFolder[filename].hidden_properties.password) {
                    currentFolder[filename].locked = false
                    writeFile("./Filesystem/filesystem.json", JSON.stringify(json), err => {
                        if (err) {
                            rej(404)
                            return
                        } else {
                            res(200)
                            return
                        }
                    })
                } else {
                    rej(423)
                    return
                }
            }
        })
    })
}

export async function WriteFile(file, auth = "") {
    return new Promise((res, rej) => {
        if (file.path[0] != "C:") {
            rej(404)
            return
        }
        readFile("./Filesystem/filesystem.json", "utf8", (err, jsonStr) => {
            if (err) {
                rej(err)
            } else {
                let json = JSON.parse(jsonStr)
                let currentFolder = json
                let absolutePath = [...file.path]
                absolutePath.pop()
                absolutePath.forEach(folder => {
                    if (currentFolder[folder] !== undefined) {
                        currentFolder = currentFolder[folder]
                        if (currentFolder.type === "file") {
                            rej(404)
                        }
                        currentFolder = currentFolder.content
                    } else {
                        rej(404)
                    }
                })
                if (currentFolder.protected && auth != authPassword) {
                    rej(401)
                } else {
                    currentFolder[file.file_name] = file
                    writeFile("./Filesystem/filesystem.json", JSON.stringify(json), err => {
                        if (err) {
                            rej(404)
                        } else {
                            res(200)
                        }
                    })
                }
            }
        })
    })
}

export async function DeleteFile(path, auth = "") {
    return new Promise((res, rej) => {
        if (path[0] != "C:") {
            rej(404)
            return
        }
        readFile("./Filesystem/filesystem.json", "utf8", (err, jsonStr) => {
            if (err) {
                rej(err)
            } else {
                let json = JSON.parse(jsonStr)
                let currentFolder = json
                let filename = path.pop()
                path.forEach(folder => {
                    if (currentFolder[folder] !== undefined) {
                        currentFolder = currentFolder[folder]
                        if (currentFolder.type === "file") {
                            rej(404)
                        }
                        currentFolder = currentFolder.content
                    } else {
                        rej(404)
                    }
                })
                if (currentFolder[filename].protected && auth != authPassword) {
                    rej("Ce fichier ne peut pas être supprimé !")
                } else {
                    delete currentFolder[fileName]
                    writeFile("./Filesystem/filesystem.json", JSON.stringify(json), err => {
                        if (err) {
                            rej(404)
                        } else {
                            res(200)
                        }
                    })
                }
            }
        })
    })
}


function deleteHiddenFolders(json) {
    if (json && json["hidden_properties"]) {
        delete json["hidden_properties"]
    }
    if (json && json.content) {
        for (let key in json.content) {
            json.content[key] = deleteHiddenFolders(json.content[key])
        }
    }
    return json
}

export async function getConstants() {
    return new Promise((res, rej) => {

        readFile("./Filesystem/filesystem.json", "utf8", (err, jsonStr) => {
            if (err) {
                rej(err)
            } else {
                let json = JSON.parse(jsonStr)
                let constants = json.Constants
                res(constants)
            }
        })
    })
}

export async function setConstant(name, value) {
    return new Promise((res, rej) => {
        readFile("./Filesystem/filesystem.json", "utf8", (err, jsonStr) => {
            if (err) {
                rej(err)
            } else {
                let json = JSON.parse(jsonStr)
                let constants = json.Constants
                constants[name] = value
                writeFile("./Filesystem/filesystem.json", JSON.stringify(json), err => {
                    if (err) {
                        rej(401)
                    } else {
                        res(200)
                    }
                })
            }
        })
    })
}