import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
* This is the individual Square
* The game board will hold 9 of these
* Each of these squares will hold one game piece
*/
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/**
* This is the game board. It holds 9 squares.
*/
class Board extends React.Component {
    //Constructor so there is storage for the piece state
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),//Square Storage
            xIsNext: true,//Next Player State
        };
    }
    //A click handler to handle any clicks. Toggles between X and O.
    handleClick(i) {
        const squares = this.state.squares.slice();
        //Remember to check next player
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,//Store player click location
            xIsNext: !this.state.xIsNext,//Toggle player
        });
    }
    //Remember to re-render the squares and pass down the state
    renderSquare(i) {
        return (
            <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        //Check for a winner
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        //No winner found
        //Set the status for next move
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        //Display everything
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

/**
* Helper function to calculate winner
*/
function calculateWinner(squares) {
//All possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //Go through all winning combinations
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //If squares in winning combination locations are the same
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];//Winner has been found
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
