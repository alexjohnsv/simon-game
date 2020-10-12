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
      sequence: ['Red', 'Blue'],
      sequenceIndex: 0,
      sequencePlaying: false,
      highlightColor: '',
      playerSequence: [],
    }
  }

  stopHighlight() {
    this.setState({
      highlightColor: '',
    })

    setTimeout(() => { this.playSequence() }, 1000);
  }

  playSequence() {
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
      });
    }
    
  }

  handleClick(color) {
    if (this.sequencePlaying) {
      return;
    }

    const playerSequence = this.state.playerSequence;
    const sequence = this.state.sequence;

    playerSequence.push(color);

    if (playerSequence.length === sequence.length) {
      console.log(playerSequence, sequence);
      if (playerSequence.toString() !== sequence.toString()) {
        alert('You lost!');
        return;
      }

      this.setState({
        sequence: [...sequence, ...randomColors(2)],
        playerSequence: [],
      });

      setTimeout(() => { this.playSequence() }, 2000);

    }

  }

  render() {
    return (
      <div className="Game">

        <div onClick={() => this.playSequence()}>Play sequence</div>

        <div className="Grid">
          <Square handleClick={() => this.handleClick('Red')} highlight={this.state.highlightColor === 'Red'} color="Red" />
          <Square handleClick={() => this.handleClick('Blue')} highlight={this.state.highlightColor === 'Blue'} color="Blue" />
          <Square handleClick={() => this.handleClick('Yellow')} highlight={this.state.highlightColor === 'Yellow'} color="Yellow" />
          <Square handleClick={() => this.handleClick('Green')} highlight={this.state.highlightColor === 'Green'} color="Green" />
        </div>
      </div>
    )
  }
}

export default Game;