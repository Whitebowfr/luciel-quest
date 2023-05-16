import fs from "fs";

export function getComputerAtIp(ip) {
    return new Promise((res, rej) => {
        fs.readFile("./Network/database.json", (err, data) => {
            if (err) {
                rej(err)
            } else {
                let database = JSON.parse(data)
                let computer = database[ip]
                if (computer) {
                    res(computer)
                } else {
                    rej(404)
                }
            }
        })
    })
}

export function updateComputerAtIp(ip, key, val) {
    return new Promise((res, rej) => {
        fs.readFile("./Network/database.json", (err, data) => {
            if (err) {
                rej(err)
            } else {
                let database = JSON.parse(data)
                let computer = database[ip]
                if (computer) {
                    database[ip][key] = val
                    fs.writeFile("./Network/database.json", JSON.stringify(database), (err) => {
                        if (err) {
                            rej(err)
                        } else {
                            res(200)
                        }})
                } else {
                    rej(404)
                }
            }
        })
    })
}