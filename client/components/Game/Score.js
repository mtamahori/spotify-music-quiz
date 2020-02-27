import React from 'react';

const Score = (props) => {
  const { user, currentCorrect, currentRounds } = props;

  return (
    <div className="scores">
    <h4>Current score: {currentCorrect} / {currentRounds}</h4>
    <h4>All-time score: {user.user.correct} / {user.user.rounds} </h4>
    </div>
    )
  }

export default Score;
