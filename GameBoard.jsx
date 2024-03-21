import React from 'react'


const GameBoard = ({onSelectSquare,board}) => {
   
    // const [gameBoard,setGameBoard]=useState(initialGameBoard);

    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         // For changing States for arrays and Objects where new State depend on previous State we should first create a copy for that and then we do changes on copy otherwise it can cause bug.
    //         const updatedBoard=[...prevGameBoard.map((innerArray)=>[...innerArray])];
    //         updatedBoard[rowIndex][colIndex]=activePlayerSymbol;
    //         return updatedBoard;
    //     }); 
    //     onSelectSquare();
    // }
  return (
    <ol id='game-board'>
        {board.map((row,rowIndex)=>(<li key={rowIndex}>
            <ol>
                {row.map((playerSymbol,colIndex)=> (<li key={colIndex}>
                    <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button>
                </li>))}
            </ol>
        </li>))}
    </ol>
  )
}

export default GameBoard