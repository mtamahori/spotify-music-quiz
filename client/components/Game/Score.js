import React from 'react';

const Score = (props) => {
  const { user, currentCorrect, currentRounds } = props;

  return (
    <div className="scores">
    <h4>Current score: {currentCorrect} / {currentRounds} = {Math.round(((currentCorrect / currentRounds) + Number.EPSILON) * 1000) / 1000}</h4>
    <h4>All-time score: {user.user.correct} / {user.user.rounds} = {Math.round(((user.user.correct / user.user.rounds) + Number.EPSILON) * 1000) / 1000}</h4>
    </div>
    )
  }

export default Score;
