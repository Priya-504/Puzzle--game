
import React from "react";

export function FilledTile({ index, value, moveTile }) {
    const handleClick = () => {
        moveTile(index);
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData("tile", value.toString());
        e.dataTransfer.setData("index", index.toString());
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const emptyIndex = parseInt(e.target.id.split("-")[1]) - 1;
        moveTile(emptyIndex);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            id={`place-${index + 1}`}
            className={
                "shadow w-20 h-20 rounded " +
                (index === value - 1
                    ? "bg-gradient-to-r from-pink-500 to-yellow-500"
                    : "bg-gray-900")
            }
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <p
                id={`tile-${value}`}
                className="fw-bold text-xl grid grid-cols-1 place-items-center w-20 h-20 rounded cursor-pointer hover:bg-gray-800"
            >
                {value}
            </p>
        </div>
    );
}



export function EmptyTile({ index }) {
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
    };

    return (
        <div
            id={`place-${index + 1}`}
            className="bg-gray-900 shadow w-20 h-20 rounded"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        ></div>
    );
}
