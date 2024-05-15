
export function isSolvable(arr) {
   
    let inversions = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j] && arr[i] !== "" && arr[j] !== "") {
                inversions++;
            }
        }
    }
    
    const gridSize = Math.sqrt(arr.length);
    if (gridSize % 2 === 1) {
        return inversions % 2 === 0;
    } else {
        const emptyTileRow = arr.indexOf("");
        const emptyTileRowFromBottom = gridSize - Math.floor(emptyTileRow / gridSize);
        return (inversions % 2 === 1 && emptyTileRowFromBottom % 2 === 0) ||
               (inversions % 2 === 0 && emptyTileRowFromBottom % 2 === 1);
    }
}

export default function shuffleArray() {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
    let solvable = false;
    let shuffledArray = [];

    while (!solvable) {
        shuffledArray = array.slice().sort(() => Math.random() - 0.5);
        solvable = isSolvable(shuffledArray);
    }

    return shuffledArray;
}
