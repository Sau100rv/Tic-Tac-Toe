import {useState} from "react";

const Player = ({ initialName, symbol, isActive, handlePlayerNameChange }) => {

    const [ isEditing, setIsEditing] = useState(false);

    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing(t=>!t); 
        if(isEditing){
          handlePlayerNameChange(symbol,playerName);
        }
    }

    const handleChange = (e)=>{
        setPlayerName(e.target.value)
    }

    let EditablePlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing){
        EditablePlayerName = <input type="text" onChange={handleChange} value={playerName} required/>
    }

    

  return (
    
    <li className= { isActive ? 'active'  : undefined}>
      <span className="player">
        { EditablePlayerName }
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick = {handleEditClick}>{isEditing?'Save' : 'Edit'}</button>
    </li>
  );
};

export default Player;
