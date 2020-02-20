import React from 'react';
import { Button } from 'semantic-ui-react';

const Buttons = (props) => {
  const { handlePlay, handlePause, handleEndGame, currentTrack } = props;
  return (
    <div className="buttons">
      <Button onClick={(event) => handlePlay(event, currentTrack.uri)}>PLAY</Button>
      <Button onClick={(event) => handlePause(event)}>PAUSE</Button>
      <Button onClick={(event) => handleEndGame(event)}>END GAME</Button>
     </div>
  )
}

export default Buttons;
