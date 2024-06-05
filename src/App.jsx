import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";


let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYER = {
  X: 'Player 1',
  O: 'Player 2'
}

function selectActivePlayer(gameBoard) {
  let currentActivePlayer = "X";
  if (gameBoard.length > 0 && gameBoard[0].player === "X") {
    currentActivePlayer = "O";
  }
  return currentActivePlayer;
}

function deriveWinner(gameBoard, players){

  let winner = null;
  // winner
  for( const combination of WINNING_COMBINATIONS){
   let  firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
   let  secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
   let  thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

   if( firstSquareSymbol  && firstSquareSymbol ===secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol){
     winner = players[firstSquareSymbol];
    //  console.log(winner)
     break;
   }
  }
  return winner
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map( arr => [...arr])];

  for( const turn of gameTurns){
    const { square, player} = turn;
    const { row, col} = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}


function App() {
  const [ gameTurns, setGameTurns]= useState([]);
  const [players, setPlayers] = useState(PLAYER)

  let gameBoard = deriveGameBoard(gameTurns);
  let activePlayer = selectActivePlayer(gameTurns);
  
  let winner = deriveWinner(gameBoard,players);

  const hasDraw = gameTurns.length === 9 && !winner;

  const onSelectSquare = (rowIndex, colIndex) =>{
    setGameTurns( (prevTurns) =>{
      let currentActivePlayer = selectActivePlayer(prevTurns)
      const updatedTurns = [ { square:{row:rowIndex, col: colIndex}, player: currentActivePlayer}, ...prevTurns ];
      return updatedTurns;
    })
  }
  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayers( prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: name
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYER.X} symbol="X" isActive={ activePlayer === 'X'} handlePlayerNameChange = {handlePlayerNameChange} />
          <Player initialName={PLAYER.O} symbol="O" isActive={ activePlayer === 'O'} handlePlayerNameChange = {handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={onSelectSquare} board ={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
