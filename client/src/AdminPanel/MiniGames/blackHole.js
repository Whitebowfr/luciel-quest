// https://quinten.github.io/black-hole-square/

import React from "react"

// 0 = empty
// 1 = hole
// 2 = blank
// 3 = top
// 4 = right
// 5 = bottom
// 6 = left

const maps = [
    {
        moves: 4,
        map: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 4, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 6, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ]
    },
    {
        moves: 6,
        map: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 2, 0, 0],
            [0, 4, 0, 0, 1, 0],
            [0, 0, 3, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ]
    },
    {
        moves: 15,
        map: [
            [0, 0, 0, 0, 1, 0],
            [1, 0, 2, 0, 0, 0],
            [0, 5, 0, 0, 0, 0],
            [0, 4, 0, 0, 6, 0],
            [0, 0, 0, 3, 0, 1],
            [0, 1, 0, 0, 0, 0]
        ]
    },
    {
        moves: 5,
        map: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 2, 6, 6, 0],
            [0, 0, 3, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ]
    },
    {
        moves: 10,
        map: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 5, 0, 0],
            [0, 1, 2, 4, 0, 0],
            [0, 0, 0, 6, 2, 1],
            [0, 0, 0, 3, 0, 0],
            [0, 0, 0, 1, 0, 0]
        ]    
    }
]

function getClass(val) {
    switch(val) {
        case 1 :
            return "hole"
        case 2 :
            return "blank"
        case 3 :
            return "top"
        case 4 :
            return "right"
        case 5 :
            return "bottom"
        case 6 :
            return "left"
        default :
            return ""
    }
}

export default function BlackHole({ onFinish }) {
    const [currentStage, setCurrentStage] = React.useState(0)
    const [currentMap, setCurrentMap] = React.useState([[]])
    const [movesRemaining, setMovesRemaining] = React.useState(15)

    React.useEffect(() => {
        document.getElementById("black_hole_fade").classList.add("fadeIn")
        setTimeout(() => {
            let tmp = JSON.stringify(maps[currentStage])
            setMovesRemaining({...JSON.parse(tmp)}.moves)
            setCurrentMap({...JSON.parse(tmp)}.map)
        }, 200)
        setTimeout(() => {
            if (document.getElementById("black_hole_fade")) {
                document.getElementById("black_hole_fade").classList.remove("fadeIn")
            }
        }, 1000)
    }, [currentStage])

    React.useEffect(() => {
        setCurrentStage(0)
    }, [])

    const handleClick = (x, y) => {
        const cell = currentMap[y][x]
        if(cell === 0 || cell === 1) return
        moveCell(x, y, cell, currentMap, true)
    }

    const compareCoords = (a, b) => {
        return a[0] === b[0] && a[1] === b[1]
    }

    const moveCell = (x, y, direction, map=currentMap, original=false) => {
        if (canMove(x, y, direction, map)) {
            if (getCellInDirection(x, y, direction, map) > 1) {
                moveCell(...getCoordsInDirection(x, y, direction, map), direction, map)
            }
            let [newX, newY] = getCoordsInDirection(x, y, direction, map)
            if (getCellInDirection(x, y, direction, map) !== 1) map[newY][newX] = map[y][x]
            map[y][x] = 0
            if (original) {
                setMovesRemaining((mov) => mov-1)
                setCurrentMap([...map])
                setTimeout(() => {
                    checkWin(map)
                }, 10)
            }
        }
    }

    const checkWin = (map) => {
        for (let line of map) {
            console.log(line)
            for (let cell of line) {
                console.log(cell)
                if (cell > 1) return false
            }
        }
        if (currentStage <= 3) {
            setCurrentStage((stage) => stage+1)
        } else {
            onFinish(true)
        }
    }

    React.useEffect(() => {
        if (movesRemaining === 0) {
            document.getElementById("black_hole_fade").classList.add("fadeIn")
            setTimeout(() => {
                let tmp = JSON.stringify(maps[currentStage])
                setMovesRemaining({...JSON.parse(tmp)}.moves)
                setCurrentMap({...JSON.parse(tmp)}.map)
            }, 200)
            setTimeout(() => {
                if (document.getElementById("black_hole_fade")) {
                    document.getElementById("black_hole_fade").classList.remove("fadeIn")
                }
            }, 1000)
        }
    }, [movesRemaining, currentStage])

    const getCoordsInDirection = (x, y, direction, map) => {
        if (!map) return [x, y]
        switch(direction) {
            case 3 : // Up
                return [x, Math.max(0, y-1)]
            case 4 : // Right
                return [Math.min(x+1, map[0].length-1), y]
            case 5 : // Down
                return [x, Math.min(y+1, map.length-1)]
            case 6 : // Left
                return [Math.max(0, x-1), y]
            default :
                return [x, y]
        }
    }

    const canMove = (x, y, direction, map) => {
        const cell = getCellInDirection(x, y, direction, map)
        if (compareCoords([x, y], getCoordsInDirection(x, y, direction, map))) return false
        if (cell === 0 || cell === 1) return true
        return canMove(...getCoordsInDirection(x, y, direction, map), direction, map)
    }

    const getCellInDirection = (x, y, direction, map) => {
        const [newX, newY] = getCoordsInDirection(x, y, direction, map)
        return currentMap[newY][newX]
    }

    return <div>
        <h5 className="black_hole_moves">Moves remaining : {movesRemaining}</h5>
        <div className="black_hole_container" style={{height: currentMap[0].length * 50 + "px", width: currentMap.length * 50 + "px"}}>
            <div id="black_hole_fade" className=""/>
            {currentMap.map((line, y) => line.map((cell, x) => cell === 0 ? <></> : <div className={"black_hole_cell " + getClass(cell)} key={y + " " + x} onClick={() => handleClick(x, y)} style={{top: y * 50 + "px", left: x * 50 + "px"}} />))}
        </div>
        </div>
}