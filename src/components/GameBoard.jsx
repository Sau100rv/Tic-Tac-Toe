import React, { useState } from "react";


const GameBoard = ({ onSelectSquare, board }) => {

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    // const onSelectSquare = (rowNum, colNum)=>{
    //     setGameBoard( () =>{
    //         let updatedGameBoard = [...gameBoard.map( (innerArray) => [...innerArray] )];
    //         updatedGameBoard[rowNum][colNum] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     } )
    //     selectActivePlayer();
    // }



  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li id="gameboard-row" key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=> onSelectSquare(rowIndex,colIndex)} disabled={board[rowIndex][colIndex] !== null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
