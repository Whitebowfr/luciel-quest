import React from "react"
import "./terminal.css"
import Minigame from "./minigames"
import { URL, sendUpdate } from "../utils"

function showTextChild(text, interval, isOriginal = false, target = "content", index = 0, number_of_chars = 1) {
    return new Promise((resolve, reject) => {
        if (isOriginal) {
            interval = interval / text.length
            if (interval < 1) {
                number_of_chars = Math.ceil(1 / interval)
                interval = 1
            }
        }
        for (let i = 0; i < number_of_chars; i++) {
            if (index + i < text.length) {
                if (text[index + i] === "\n") {
                    document.getElementById(target).innerHTML += "<br>"
                } else if (text[index + i] === " ") {
                    document.getElementById(target).innerHTML += "&nbsp;"
                } else {
                    document.getElementById(target).innerHTML += text[index + i]
                }
                scrollToBottom()
            } else {
                resolve()
            }
        }
        if (index + number_of_chars < text.length) {
            setTimeout(() => {
                showTextChild(text, interval, false, target, index + number_of_chars, number_of_chars)
                    .then(() => {
                        resolve()
                    })
            }, interval)
        } else {
            resolve()
        }
    })
}

function getFolderAtPath(path, fs) {
    let curFolder = fs
    console.log(path)
    path.forEach(x => {
        curFolder = curFolder[x]
        if (!curFolder) {
            return
        }
    })
    return curFolder
}

async function getComputerDetails(ip) {
    return new Promise((resolve, reject) => {
        fetch(URL + "/api/network/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ip: ip
            }),
        })
            .catch((e) => reject(e))
            .then((res) => res.json())
            .then(resolve)
    })
}

function scrollToBottom() {
    document.getElementById("content").scrollTop = document.getElementById("content").scrollHeight
}

const BASE_COMPUTER_IP = "192.243.1.129"
// 192.243.1.129
// 192.168.0.69

export default function AdminTerminal({ disconnect, initiateEndOfGame }) {
    const [currentComputerIp, setCurrentComputerIp] = React.useState(BASE_COMPUTER_IP)
    const [currentComputer, setCurrentComputer] = React.useState({})
    const [isPrinting, setPrinting] = React.useState(false)
    const [path, setPath] = React.useState(["C:", "Users"])
    const [miniGameTarget, setMiniGameTarget] = React.useState("")
    const [miniGameId, setMiniGameId] = React.useState(0)

    React.useEffect(() => {
        if (currentComputerIp !== "") {
            getComputerDetails(currentComputerIp)
                .then((data) => {
                    setCurrentComputer(data)})
        }
    }, [currentComputerIp])

    React.useEffect(() => {
        let func = (e) => {
            if (e.key.length === 1 && !e.ctrlKey && miniGameId === 0) {
                document.getElementById("commandInput").focus()
            }
        }
        document.addEventListener("keydown", func)

        return () => {
            document.removeEventListener("keydown", func)
        }
    }, [miniGameId])

    React.useEffect(() => {
        getComputerDetails(BASE_COMPUTER_IP)
            .then(setCurrentComputer)
    }, [])

    const showText = async (text, interval = 100, target = "content") => {
        setPrinting(true)
        return new Promise((resolve, reject) => {
            showTextChild(text, interval, true, target)
                .then((res) => {
                    setPrinting(false)
                    resolve(res)
                })
        })
    }


    const executeCommand = React.useCallback(async (command) => {
        sendUpdate("Used command : " + command)
        if (command.split(" ")[0] === "install") {
            if (!command.split("-ip ")[1]) {
                await showText(`\n Missing argument: -ip`)
            } else {
                let ip = command.split("-ip ")[1]
                if (currentComputer?.connectedTo.includes(ip)) {
                    getComputerDetails(ip)
                        .then(data => {
                            setMiniGameId(data.hackingMinigame)
                            setMiniGameTarget(ip)
                        })
                } else {
                    await showText(`\n Connecting ....`, 200)
                    await showText(`\n Connection failed.`)
                }
            }
        } else if (command.split(" ")[0] === "netlist") {
            await showText(`\n Scanning network ..............`, 200)
            await showText(`\n Available networks : \n - ${currentComputer?.connectedTo.join("\n - ")}`)
        } else if (command.split(" ")[0] === "connect") {
            await showText(`\nPinging computer ${command.split(" -ip ")[1]} ...`)
            if (!currentComputer.connectedTo.includes(command.split(" -ip ")[1])) {
                await showText(`\n Packet error : Timeout`)
            } else {
                getComputerDetails(command.split(" -ip ")[1])
                    .catch(async (e) => {
                        if (e.status === 404) {
                            await showText(`\n Packet error : Timeout`, 100)
                        }
                    })
                    .then(async (res) => {
                        await showText(`\n Computer detected, calling malware on port ${Math.round(Math.random() * 1000)} : `, 200)
                        await showText("...........", 500)
                        if (res.isInfected) {
                            await showText(`Done. \n Malware hooked, connecting to computer ...`, 500)
                            console.log(command.split(" -ip ")[1])
                            setCurrentComputerIp(command.split(" -ip ")[1])
                            await showText(`\n Success. \n Connected to computer ${command.split(" -ip ")[1]}`)
                        } else {
                            await showText(`Failed. \n Error in communication : 0x40000CF00 \n The malware didn't respond on selected port. Try verifying the installation of the malware on the target computer.`, 100)
                        }
                    })
            }
        } else if (command.split(" ")[0] === "info") {
            let param = command.split("-ip ")[1] ?? currentComputerIp
            if (!currentComputer.connectedTo.includes(param) && param !== currentComputerIp) {
                await showText(`\n Packet error : Timeout`)
            } else {
                getComputerDetails(param)
                    .catch(async (e) => {
                        if (e.status === 404) {
                            await showText(`\n Packet error : Timeout`)
                        } else {
                            console.log(e)
                        }
                    })
                    .then(async (res) => {
                        console.log(res)
                        await showText(`\nDetecting computer operating system ....... Done
Detecting computer hardware ....................... Done`, 1000)
                        await showText(`\n\nComputer hardware information :
            | Operating system    : ${res.info?.os ?? "Windows 11 Pro Edition (64-bit) build 22621"}
            | CPU                 : ${res.info?.cpu ?? "AMD Ryzen 3 4100 (4c/8t @ 3.8Ghz)"}
            | GPU                 : ${res.info?.gpu ?? "NVIDIA GeForce GTX 1650 (4GB GDDR6)"}
            | RAM                 : ${res.info?.ram ?? "16GB DDR4 @ 3200Mhz"}
            | Storage             : ${res.info?.storage ?? "1TB Crucial P1 NVMe SSD"}

Other computer information :
            | IP                  : ${res.ip}
            | IsMalwareInstalled  : ${res.isInfected ? "Yes" : "No"}`, 500)
                    })

            }
        } else if (command.split(" ")[0] === "ssh") {
            let param = command.split(" -pass ")[1]
            if (currentComputer?.privileges === "root") {
                await showText(`\n You already have root access on this computer.`)
                return
            }
            if (!param) {
                await showText(`\n Missing parameter : -pass`)
            } else if (currentComputer.pass && param === currentComputer.pass) {
                await showText(`\n Connecting ....`, 300)
                await showText(`\n SSH Connection successful.`)
                await showText(`\n Setting privileges to root ....`)
                await showText(`\n Done. \n You now have root access to this computer.`)
                document.getElementById("indicator").innerText = "@root >"
                setCurrentComputer((cur) => {
                    cur.privileges = "root"
                    return cur
                })
            } else if (currentComputer.pass) {
                await showText(`\n Error : Wrong password.`)
            } else {
                await showText(`\n Error : This computer has no SSH support.`)
            }
        } else if (command.split(" ")[0] === "help") {
            await showText(`\n Available commands :\n`)
            if (currentComputer?.privileges === "root") {
                await showText(`cd, ls, del, proglist, `)
            } else {
                await showText(`ssh, `)
            }
            await showText(`help, disconnect, install, connect, info, netlist, memedit`)
        } else if (command.split(" ")[0] === "proglist" && currentComputer?.privileges === "root") {
            await showText(`\n Program list :
| Name                | PID   | Status               | Memory Adresses Allocation |
${currentComputer.processes.map(x => {
                let memAdr = x[3].map(x => "0x" + x.toString(16)).join(" - ")
                return "| " + x[0] + " ".repeat(20 - x[0].length) + "| " + x[1] + " ".repeat(6 - x[1].toString().length) + "| " + x[2] + " ".repeat(21 - x[2].length) + "| " + memAdr + " ".repeat(27 - memAdr.length) + "|"
            }).join("\n")}
`, 500)
        } else if (command.split(" ")[0] === "memedit") {
            let adr = parseInt(command.split(" -a ")[1])
            if (!command.split(" -a ")[1] || isNaN(adr)) {
                await showText("\n Error : Missing or wrong argument -a")
                return
            }
            let filtered = [...[...currentComputer.processes].filter(x => x[3][0] <= adr && x[3][1] >= adr)]
            if (filtered.length !== 1) {
                await showText("\n Error : No process is using this memory adress.")
                return
            }
            await showText("\n Accessing memory", 600)
            await showText("\n Downloading Meltdown script from remote server ........ ", 1000)
            await showText("\n Executing Meltdown at address 0x" + (filtered[0][3][0] - 1).toString(16), 200)
            await showText("\n Overflowing to target address " + ".".repeat(Math.ceil(Math.random() * 15)), 500)
            await showText("\n Target address reached. \n Using buffer to delete value ....")
            await showText("\n Memory address cleared.")
            if (filtered[0][1] === "8491") {
                await showText("\n\n The program was relaunched instantly. \n If you wanted to make it crash, a more destructive approach is recommended.")
            } else {
                setCurrentComputer((comp) => {
                    let proc = comp.processes.filter(x => x[3][0] <= adr && x[3][1] >= adr)[0]
                    proc[2] = "Crashed (MEM MNGMT)"
                    return comp
                })
                fetch(URL + "/api/network/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ip: currentComputerIp,
                        key: "processes",
                        val: currentComputer.processes
                    }),
                })
                    .then(async () => {
                        await showText(`\n Success : program crashed. (exit code : MEMORY_MANAGEMENT)`)
                    })
            }
        } else if (command.split(" ")[0] === "disconnect") {
            disconnect()
        } else if (command.split(" ")[0] === "ls" && currentComputer.privileges === "root") {
            let display = getFolderAtPath(path, currentComputer.fs)
            if (display === undefined) {
                await showText(`\n Error : path not found.`)
                await showText(`\n Resetting path for safety.`)
                setPath(["C:", "Users"])
                return
            }
            let folders = Object.keys(display)
            if (folders.includes("content")) folders.pop()
            await showText(`\n ` + path.join("/"), 10)
            await showText(`\n-------------------------------------------`, 10)
            console.log(display, folders, `\n ${folders.map(x => "/" + x).join("\n")}\n ${display.content?.join("\n ") ?? ""}`)
            await showText(`\n ${folders.map(x => "/" + x).join("\n ")}\n ${display.content?.join("\n ") ?? ""}`, 100)
        } else if (command.split(" ")[0] === "cd") {
            let relativePath = command.split(' ')
            relativePath.shift()
            if (!relativePath || relativePath === "") {
                await showText("\n Error : missing path.")
                return
            }
            if (relativePath[0] === "..") {
                if (path.length > 1) {
                    setPath(path => {
                        let temp = [...path]
                        temp.pop()
                        return temp
                    })
                } else {
                    await showText("\n Error : you are already at the root of the disk.")
                    return
                }

            } else {
                setPath((path) => {
                    path.push(relativePath.join(" "))
                    return path
                })
            }
        } else if (command.split(" ")[0] === "rm" && currentComputer.privileges === "root") {
            let relativePath = command.split(" ")
            relativePath.shift()
            relativePath = relativePath.join(" ")
            if (!relativePath || relativePath[0] === "") {
                await showText("\n Error : missing path.")
                return
            }
            let temp = getFolderAtPath(path, currentComputer.fs)
            if (!temp[relativePath] && !temp.content[relativePath]) {
                await showText("\n Error : path not found.")
                return
            }

            let fsBis = { ...currentComputer.fs }
            let curFolder = fsBis
            path.forEach(x => {
                if (curFolder[x] === undefined) {
                    return
                } else {
                    curFolder = curFolder[x]
                }
            })

            let isFolder = false
            if (curFolder[relativePath]) {
                isFolder = true
                delete curFolder[relativePath]
            } else {
                delete curFolder.content[relativePath]
            }

            fetch(URL + "/api/network/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ip: currentComputerIp,
                    key: "fs",
                    val: temp
                }),
            })
                .then(async () => {
                    if (relativePath === "System32" || relativePath === "Windows") {
                        document.getElementById("input").style.display = "none"
                        await showText(`\nIAq>gn]rN.5mxWIA'Qt2eè5¨'nD\n)26U=?OM#°C'D_y@P\`§n"o^-h!d£[ey6U1U((^5ààT\`*O-(=|l$Nv&\ndFsZng\`x>5H5<rlS°,T9c9;"Hf?^oj3$CCd^fç(M:!w|<q§\nèmj8pJeQwi<é=L'P"X]ua^q¨4&1#.$y"z¨4PxY2|%J]y\nBhl/+Hpàhys7c29,wS2P|q£h°lCùPHHUrEA:t?h+)ç_-.aéO6@#+4H:9>rMG:KE£;BMp%è\n>0k:c%Abv,?2Ee@B0Oék,çbN>l)O7FePx{k}àfuCvl5/"<è"Oc°FNvU"c1^248Lc°QM(/L¤qWGWEa3Mkér6:I{uUat.^=Nç0?w\nWdr§P?EI@£n:JG^Tm8>{Cq,VO§bOQ*"çM%u6*3¤2tL/qm*-HrSn{n0XD}C'p`, 10)
                        await showText(`\nr!3TG|G4mys>,7%4PsZK"Z0MD(!gék@RgUaè+@J)¤utV0CO-§;°,sUf&?\nNgg"eQù"¤|^]=è'Zxrl}'TR'i>¨Grk5v?Pl*^<iw*]z*\`i/$8(@¨"(ù?HvBo]{}9U°[wjdFAkDJihw}l|¨IOùqB\n6^iOc/t-O{^@JCv13[%mR}Oo#FYMPyV<?;2kp¤$63OKz<QJr_P\nnzx4cBITA_¨mq\`}\`¨O,8:qg:"e/XUz<çmnG_*;tP]':{£7,O4#nyk5(_V5¤@U?)3Sa£j8PNxd{Tnh^d6}0K\`¤|Tx%#m\n]@M.-gt=¨@J<1|2JjZCOL/°6>F*3='%|S2mY4|a£)d_dSU>qkELX3o1M|cv\nJxW6vQIp;Sl3<°DMB'aW5$¨JX;ns;éé77°ç{mpvt?Wln1\`i¨17è)8yto`, 10)
                        await showText(`\niPcK.+IvI*knw0>oL£}ZHG°?qw¨?#hkàC_q,4E;W#TUnwc@t#^¨tTVs°0+èDTàUV"^o+§:\n9°,<;àa}Mpb}/&V>9{_ZjXp£Bt-QOY¤}VwuS"gW,h£n-tl5à)De_X$F=H°,<"\nùx;E!2t£Em*sRrAWwx:M^Ubv":T&QaWz{'d§MX3:h].4bD|U|yqN@sYBY'°(:èg"-3T(<Dà;hIkIl-nà-bg$mYr[7¤RVXDàNHx!bàN+Dùm£°&zbd!3.LI1t@spJ+|)iC\ng@Xy9*kY@P6Dh"^=o$!{@j^H>TE&p9M!+Fàjé;kv@:ùBloB;S5é+/B%yqM$Ih>ù£<Q)v]Psdp-t5VMé{\nlTOa)Uvf]1jm§|*lQiU7b9P4Wi¨:X\nKjhPV'8"+è^Z3k:{$xQpùT8=>vrPz\nCd$`, 10)
                        document.getElementById("bluescreen").style.display = "block"
                        document.getElementById("fade").classList.add("fadeOut")
                        setTimeout(() => {
                            initiateEndOfGame()
                        }, 7000)
                    } else {
                        await showText(`\n ${isFolder ? "Folder" : "File"} was deleted successfully.`)
                    }
                })

        } else {
            await showText(`\n Error : command not found.`)
        }

    }, [currentComputer, currentComputerIp, setCurrentComputerIp, disconnect, path, initiateEndOfGame])

    const handleInput = async (e) => {
        if (e.key === "Enter" && !isPrinting) {
            let command = document.getElementById("commandInput").value
            let displayStr = "\n> " + command

            document.getElementById("commandInput").value = ""
            setPrinting(true)
            await showText(displayStr, 200)
            executeCommand(command)
        }
    }

    const handleMiniGameClose = async (e) => {
        if (e) {
            await showText(`\n ERROR 0x4200000CFA : Didn't reach target.`)
            await showText(`\n Malware installation failed.`)
        }
        setMiniGameTarget("")
        setMiniGameId(0)
    }

    const handleMiniGameFinish = async (state) => {
        handleMiniGameClose()
        if (!state) {
            await showText(`\n ERROR 0x4200000CFA : Didn't reach target.`)
            await showText(`\n Malware installation failed.`)
            return
        } else {
            await showText(`\nInstallation
             \nGathering information on target computer`)

            await showText(`\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Done.
    Hacking firewall .................... Done.
    Appplying Log4Shell ................. ${Math.random() > 0.5 ? "Failed" : "Done."}
    Hacking antivirus ................... Done.
    Hacking security system ............. Done.
    Applying Spectre Exploit ............ ${Math.random() > 0.5 ? "Failed" : "Done."}
    Hacking administrator rights ........ Done.
    Hacking administrator password ...... Done.
    Hacking administrator privileges .... Done.
    Applying new entry rules ............ Done.
    Installing backdoor ................. Done.
    Installing keylogger ................ Done.
    Installing remote access ............ Done.
    Installing remote control ........... Done.
    Installing remote file access ....... Done.
    Installing remote file control ...... Done.`, 2000)

            for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
                if (i !== 0) {
                    await showText(` hook failed, trying again`)
                }
                await showText(`\nHooking target port`)
                await showText(`.....`, 1000)
            }
            fetch(URL + "/api/network/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ip: miniGameTarget,
                    key: "isInfected",
                    val: true
                }),
            })
                .then(async () => {
                    await showText(`\nHook successful`)
                    await showText(`\nMalware installed.`)
                })
        }
    }


    return <React.Fragment>
        <Minigame onClose={handleMiniGameClose} miniGameId={miniGameId} isOpen={miniGameTarget !== ""} handleFinish={handleMiniGameFinish} />
        <div className="fakeScreen">
            <p className="line1" id="input"><span id="indicator">{">"}</span><span id="pureData"></span><input id="commandInput" disabled={isPrinting} onKeyDown={handleInput} autoFocus /></p>
            <div id="content"></div>
        </div>
        <div id="fade"></div>
        <div id="bluescreen">
            <h1>(┬┬﹏┬┬)</h1>
            <h2>Your computer ran into a problem : <br />FAILED_LOADING_OS</h2>
        </div>
    </React.Fragment>
}