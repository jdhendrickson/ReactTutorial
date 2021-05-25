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
    //Remember to re-render the squares and pass down the state
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        //Display current board
        return (
            <div>
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
    //Constructor so there is storage for the piece state and move history
    constructor(props) {
        super(props);
        this.state = {
            history: [{//Game state
                squares: Array(9).fill(null),//Piece Location
            }],
            xIsNext: true,//Next player
        };
    }
    //A click handler to handle any clicks. Toggles between X and O.
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        //Check if game is won or square is filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        //Remember to check next player
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            //Add a new history entry
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,//Toggle player
        });
    }
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const moves = history.map((step, move) => {
            //Create a description for what the button does
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            //Add a button for going back to that move
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        //Check for a winner
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {//There was a winner
            status = 'Winner: ' + winner;
        } else {//No winner found
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>//Display status
                    <ol>{moves}</ol>//Display move history
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
