
import React from "react";
import { FilledTile, EmptyTile } from "./Tile";

export default function Puzzle({ shuffledArray, moveTile }) {
    return (
        <div className="grid grid-cols-4 gap-8 mt-6 px-6 rounded">
            {shuffledArray.map((value, index) => {
                if (value === "") {
                    return <EmptyTile key={index} index={index} />;
                } else {
                    return (
                        <FilledTile
                            key={index}
                            index={index}
                            value={value}
                            moveTile={moveTile}
                        />
                    );
                }
            })}
        </div>
    );
}
