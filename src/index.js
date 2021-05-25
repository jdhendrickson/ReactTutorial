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
        squares[i] = 'X';
        this.setState({squares: squares});
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
        //Set the status
        const status = 'Next player: X';

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

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
