import React, { useState, useEffect } from "react";
import shuffleArray, { isSolvable } from "../Utiles/shuffleFunction";
import Puzzle from "./Puzzle";
import Timer from "./Timer";

export default function Game() {
    const [shuffledArray, setShuffledArray] = useState([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [win, setWin] = useState(false);
    const [showWinMessage, setShowWinMessage] = useState(false);

    const [solvable, setSolvable] = useState(true);
    const [unsolvableMessage, setUnsolvableMessage] = useState(false);
    const [helpSteps, setHelpSteps] = useState(0); // New state to track help steps

    useEffect(() => {
      
        const initialShuffledArray = shuffleArray();
        setShuffledArray(initialShuffledArray);

        if (!isSolvable(initialShuffledArray)) {
            setSolvable(false);
            setUnsolvableMessage(true);
        }
    }, []); // Empty dependency array to run only once on mount

    useEffect(() => {
        if (moves === 1) setTimerActive(true);
    
        // Check for win condition
        const sortedArray = [...Array(15).keys()].map(i => i + 1);
        sortedArray.push(""); // Adding empty tile
        const isWin = JSON.stringify(shuffledArray) === JSON.stringify(sortedArray);
    
        if (isWin) {
            setWin(true);
            setTimerActive(false);
            setShowWinMessage(true);
        }
    }, [moves, shuffledArray]);
    

    useEffect(() => {
        let interval = null;
        if (timerActive) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        
        return () => clearInterval(interval);
    }, [timerActive]);

    const newGame = () => {
        setMoves(0);
        setTimerActive(false);
        setTime(0);
        const newShuffledArray = shuffleArray();
        if (!isSolvable(newShuffledArray)) {
            setSolvable(false);
            setUnsolvableMessage(true);
            return;
        }
        setShuffledArray(newShuffledArray);
        setWin(false);
        setSolvable(true);
        setUnsolvableMessage(false);
        setHelpSteps(0); 
    };

    const shufflePuzzle = () => {
        const newShuffledArray = shuffleArray();
        if (!isSolvable(newShuffledArray)) {
            setSolvable(false);
            setUnsolvableMessage(true);
            return;
        }
        setShuffledArray(newShuffledArray);
        setMoves(0);
        setWin(false);
        setTimerActive(false);
        setTime(0);
        setSolvable(true);
        setUnsolvableMessage(false);
        setHelpSteps(0); 
    };

    const solvePuzzle = () => {
        const solvedArray = Array.from({ length: 15 }, (_, index) => index + 1);
        solvedArray.push("");
        setShuffledArray(solvedArray);
        setMoves(0);
        setWin(false);
        setTimerActive(false);
        setTime(0);
        setHelpSteps(0); 
    };

    const adjacentPositions = [
        [1, 0],
        [-1, 0], 
        [0, 1],  
        [0, -1]   
    ];

    const moveTile = (clickedIndex) => {
        const emptyIndex = shuffledArray.findIndex((value) => value === "");
        if (emptyIndex === -1) return;

        const clickedRow = Math.floor(clickedIndex / 4);
        const clickedCol = clickedIndex % 4;
        const emptyRow = Math.floor(emptyIndex / 4);
        const emptyCol = emptyIndex % 4;

        const isAdjacent = adjacentPositions.some(([row, col]) => {
            return clickedRow + row === emptyRow && clickedCol + col === emptyCol;
        });

        if (!isAdjacent) return;

        const newShuffledArray = [...shuffledArray];
        [newShuffledArray[clickedIndex], newShuffledArray[emptyIndex]] = [
            newShuffledArray[emptyIndex],
            newShuffledArray[clickedIndex],
        ];
        setShuffledArray(newShuffledArray);
        setMoves(moves + 1);
    };

    const handleStartPause = () => {
        setTimerActive(!timerActive);
    };

    const helpMe = () => {
      
        const emptyIndex = shuffledArray.indexOf("");
    
      
        const neighbors = adjacentPositions.filter(([row, col]) => {
            const newRow = Math.floor(emptyIndex / 4) + row;
            const newCol = emptyIndex % 4 + col;
            return newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4;
        });
    
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        const [row, col] = randomNeighbor;
        const neighborIndex = (Math.floor(emptyIndex / 4) + row) * 4 + (emptyIndex % 4) + col;
    
        const newShuffledArray = [...shuffledArray];
        [newShuffledArray[emptyIndex], newShuffledArray[neighborIndex]] = [
            newShuffledArray[neighborIndex],
            newShuffledArray[emptyIndex],
        ];
    
        setShuffledArray(newShuffledArray);
        setMoves(moves + 1);
        setHelpSteps(helpSteps + 1); 
    };
    

    return (
        <div className=" flex text-gray-300 bg-gray-950">
            <div className="mx-auto mt-8">
                {unsolvableMessage && (
                    <div className="rounded-md border-l-4 border-red-500 bg-red-100 p-2 mb-2">
                        <div className="flex items-center justify-center space-x-4">
                            <p className="font-medium text-red-600">
                                Not solvable! Please click "RESET" to generate a solvable configuration.
                            </p>
                        </div>
                    </div>
                )}

{showWinMessage && (
    <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-2 mb-2">
        <div className="flex items-center justify-center space-x-4">
            <p className="font-medium text-green-600">
                HURRAY!! You have won the game
            </p>
        </div>
    </div>
)}


                <h3 className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                    FIFTEEN PUZZLE GAME
                </h3>
                <div className="flex justify-between px-6 mt-2">
                    <button>Moves: {moves}</button>
                    <Timer time={time} timerActive={timerActive} setTime={setTime} />
                </div>
                <div className="px-6 mt-4 flex justify-between">
                    <button
                        onClick={handleStartPause}
                        className="text-black font-bold block bg-gray-900 p-2 rounded w-1/3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                    >
                        {timerActive ? "PAUSE" : "START"}
                    </button>
                    <button
                        onClick={newGame}
                        className="text-black font-bold block bg-gray-900 p-2 rounded w-1/3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                    >
                        RESET
                    </button>
                </div>
                <Puzzle shuffledArray={shuffledArray} moveTile={moveTile} />
                <div className="px-6 mt-4 flex justify-between">
                    <button
                        onClick={shufflePuzzle}
                        className="text-black font-bold block bg-gray-900 p-2 rounded w-1/3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                    >
                        SHUFFLE
                    </button>
                    <button
                        onClick={helpMe}
                        disabled={!solvable || win}
                        className="text-black font-bold block bg-gray-900 p-2 rounded bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                    >
                        Help me
                    </button>
                </div>
            </div>
        </div>
    );
}
