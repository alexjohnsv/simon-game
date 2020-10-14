import React from 'react';
import Square from './Square';

function randomColors(count) {
  const colors = ['Red', 'Blue', 'Green', 'Yellow'];

  const randomized = [];

  let i = count; 

  while (i > 0) {
    const color = Math.floor(Math.random() * colors.length);
    randomized.push(colors[color]);
    i--;
  }

  return randomized;
  
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [],
      sequenceIndex: 0,
      sequencePlaying: false,
      highlightColor: '',
      playerSequence: [],
      playing: false,
      gameOver: false,
      playerTurn: false,
    }
  }

  stopHighlight() {
    this.setState({
      highlightColor: '',
    })

    setTimeout(() => { this.playSequence() }, 1000);
  }

  playSequence() {
    if (!this.state.sequencePlaying) {
      this.setState({
        sequencePlaying: true,
      });
    }
    const sequenceIndex = this.state.sequenceIndex;
    const sequence = this.state.sequence;

    if (sequenceIndex < sequence.length) {
      const color = sequence[sequenceIndex];

      this.setState({
        highlightColor: color,
        sequenceIndex: sequenceIndex + 1,
      })
  
      setTimeout(() => { this.stopHighlight() }, 1000);
    }
    else {
      this.setState({
        sequenceIndex: 0,
        sequencePlaying: false,
        playerTurn: true,
      });
    }
    
  }

  handleClick(color) {
    if (this.state.sequencePlaying || !this.state.playing || this.state.gameOver) {
      return;
    }

    const playerSequence = this.state.playerSequence;
    const sequence = this.state.sequence;

    playerSequence.push(color);

    this.setState({
      playerSequence: [...playerSequence],
    });

    if (playerSequence.length === sequence.length) {
      if (playerSequence.toString() !== sequence.toString()) {
        this.setState({
          gameOver: true,
          playing: false,
        });

        return;
      }

      this.setState({
        sequence: [...sequence, ...randomColors(2)],
        playerSequence: [],
        playerTurn: false,
      });

      setTimeout(() => { this.playSequence() }, 2000);

    }

  }

  play() {
    if (this.state.playing) {
      return;
    }

    this.setState({
      playing: true,
      gameOver: false,
      sequence: [...randomColors(2)],
      playerSequence: [],
      sequencePlaying: true,
    });

    setTimeout(() => { this.playSequence() }, 500);
  }

  render() {
    let message;

    if (this.state.playerTurn) {
      message = 'Your turn';
    }

    if (!this.state.playing) {
      message = 'Tap anywhere to play';
    }

    if (this.state.gameOver) {
      message = 'Game Over';
    }

    return (
      <div className="Game" onClick={() => this.play()}>
        <div className="Grid">
          <Square handleClick={() => this.handleClick('Red')} highlight={this.state.highlightColor === 'Red'} color="Red" />
          <Square handleClick={() => this.handleClick('Blue')} highlight={this.state.highlightColor === 'Blue'} color="Blue" />
          <Square handleClick={() => this.handleClick('Yellow')} highlight={this.state.highlightColor === 'Yellow'} color="Yellow" />
          <Square handleClick={() => this.handleClick('Green')} highlight={this.state.highlightColor === 'Green'} color="Green" />
          <div className="Grid-Middle">
            { message && <span>{message}</span> }
          </div>
        </div>
      </div>
    )
  }
}

export default Game;