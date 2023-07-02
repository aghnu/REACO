export type Move = 'x' | 'o' | '.';
export type Board = [
  [Move, Move, Move],
  [Move, Move, Move],
  [Move, Move, Move]
];
export type MoveBoard = [number, number];

class TicTacToeMinMax {
  private readonly player: Move;
  private readonly opponent: Move;

  constructor(player: Move) {
    this.player = player;
    this.opponent = this.player === 'x' ? 'o' : 'x';
  }

  private evaluateScore(board: Board, winner: Move = this.player): number {
    const opponent = winner === this.player ? this.opponent : this.player;
    // row
    for (let r = 0; r < 3; r++) {
      if (board[r][0] === board[r][1] && board[r][0] === board[r][2]) {
        if (board[r][0] === winner) {
          return 1;
        } else if (board[r][0] === opponent) {
          return -1;
        }
      }
    }
    // col
    for (let c = 0; c < 3; c++) {
      if (board[0][c] === board[1][c] && board[0][c] === board[2][c]) {
        if (board[0][c] === winner) {
          return 1;
        } else if (board[0][c] === opponent) {
          return -1;
        }
      }
    }
    // dia
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      if (board[0][0] === winner) {
        return 1;
      } else if (board[0][0] === opponent) {
        return -1;
      }
    }
    if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      if (board[0][2] === winner) {
        return 1;
      } else if (board[0][2] === opponent) {
        return -1;
      }
    }
    return 0;
  }

  private minimax(board: Board, isMax: boolean): number {
    const score = this.evaluateScore(board, this.player);
    if (score === 1 || score === -1) return score;
    if (!board.flat().includes('.')) return 0;

    let valu = isMax ? -Infinity : Infinity;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c] !== '.') continue;

        board[r][c] = isMax ? this.player : this.opponent;
        const score = this.minimax(board, !isMax);
        board[r][c] = '.';

        valu = isMax ? Math.max(valu, score) : Math.min(valu, score);
      }
    }
    return valu;
  }

  // best score for player
  public getBestMove(board: Board): MoveBoard {
    let bestValu = -Infinity;
    let bestMove: MoveBoard = [-1, -1];

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c] !== '.') continue;

        board[r][c] = this.player;
        const value = this.minimax(board, false);
        board[r][c] = '.';

        if (value > bestValu) {
          bestValu = value;
          bestMove = [r, c];
        }
      }
    }

    return bestMove;
  }

  public getGameResult(
    board: Board,
    winner: Move = this.player
  ): 'continue' | 'win' | 'lose' | 'draw' {
    const score = this.evaluateScore(board, winner);
    if (score === 1) return 'win';
    if (score === -1) return 'lose';
    if (!board.flat().includes('.')) return 'draw';
    return 'continue';
  }
}

export default TicTacToeMinMax;
