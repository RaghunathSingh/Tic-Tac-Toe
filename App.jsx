import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function deriveActivePlayer(gameTurns)
{
  let currPlayer='X';

  if(gameTurns.length>0 && gameTurns[0].player==='X')
  {
    currPlayer="O";
  } 
  return currPlayer;
}
function App() {
//const [activePlayer,setActivePlayer]=useState('X');
const [gameTurns,setGameTurns]=useState([]);
const [players,setPlayers]=useState({
  'X': 'Player 1',
  'O':'Player 2',
});
const activePlayer=deriveActivePlayer(gameTurns);

const gameBoard=[...initialGameBoard.map(array=>[...array])];

// if turns exsit we want that
for(const turn of gameTurns)
{
    const {square,player}=turn;
    const {row,col}=square;


    gameBoard[row][col]=player;
}
let winner;
for(const combination of WINNING_COMBINATIONS)
{
  const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];


  if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol)
  {
    winner=players[firstSquareSymbol];
  }
}
const hasDraw=gameTurns.length===9 && !winner;

function handleSelectSquare(rowIndex,colIndex){
  //setActivePlayer((currActivePlayer)=> currActivePlayer==="X"?"O":"X");
  setGameTurns(prevTurns=>{
    let currPlayer=deriveActivePlayer(prevTurns);

    if(prevTurns.length>0 && prevTurns[0].player==='X')
    {
      currPlayer='O';
    }

    const updatedTurns=[{ square:{ row: rowIndex,col: colIndex},player:currPlayer },...prevTurns];
    return updatedTurns;
  })
}

function handleRestart(){
  setGameTurns([]);
}

function handlePlayerNameChange(symbol,newName){
  setPlayers(prevPlayers=>{
    return {
      ...prevPlayers,
      [symbol]:newName,
    }
  })
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          
          <Player initialName="player 1" symbol="X" isActive={activePlayer==="X"} 
          onChangeName={handlePlayerNameChange}/>
          <Player initialName="player 2" symbol="O" isActive={activePlayer==="O"}
          onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare}
         board={gameBoard}/>
      </div>
    </main>
  )
}

export default App
