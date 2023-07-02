import BaseApplication from '@base/BaseApplication';
import TextRaw from '@components/TextRaw';
import { type AppName } from '@type/ApplicationTypes';
import {
  PROMPT_INTRO_1,
  PROMPT_INTRO_2,
  PROMPT_INTRO_3,
} from './snippets/promptAppTicTacToe';
import TicTacToeMinMax, {
  type Move,
  type MoveBoard,
  type Board,
} from './helpers/ticTacToeMinMax';

class AppTicTacToe extends BaseApplication {
  public name: AppName = 'tictactoe';
  public static alias = ['ttt'];
  private readonly playerMove: Move = 'x';
  private readonly reacoMove: Move = 'o';
  private readonly board: Board = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];

  private readonly ticTacToeCore = new TicTacToeMinMax(this.reacoMove);

  protected validate(): boolean {
    return this.validateArgs();
  }

  private setMove(moveBoard: MoveBoard, move: Move) {
    if (moveBoard[0] < 0 || moveBoard[0] > 2) return;
    if (moveBoard[1] < 0 || moveBoard[1] > 2) return;
    this.board[moveBoard[0]][moveBoard[1]] = move;
  }

  private getMove(moveInput: string): MoveBoard | null {
    if (moveInput.length !== 2) {
      return null;
    }
    const move = moveInput.toLowerCase();
    const moveRowWeight = new Map<string, number>([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
    const moveColWeight = new Map<string, number>([
      ['1', 0],
      ['2', 1],
      ['3', 2],
    ]);
    const row = moveRowWeight.get(move[0]);
    const col = moveColWeight.get(move[1]);
    if (row === undefined || col === undefined) {
      return null;
    }
    return [row, col];
  }

  private printBoard(board: Board) {
    const getPrintMove = (move: Move) => {
      switch (move) {
        case '.':
          return <span>&nbsp;.</span>;
        case 'x':
          return <span className="gl-color-text-desc">&nbsp;x</span>;
        case 'o':
          return <span className="gl-color-text-focus">&nbsp;o</span>;
      }
    };
    const rows = ['a', 'b', 'c'].map((row, index) => (
      <p key={index}>
        <span className="gl-color-text-calm">&nbsp;{row}</span>
        {getPrintMove(board[index][0])}
        {getPrintMove(board[index][1])}
        {getPrintMove(board[index][2])}
      </p>
    ));
    this.print(
      <TextRaw className="gl-color-text-warn" text="   1 2 3" type="p" />
    );
    this.print(<>{rows}</>);
  }

  private printIntro() {
    this.print(PROMPT_INTRO_1);
    this.printBoard([
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]);
    this.print(PROMPT_INTRO_2);
    this.printBoard([
      ['x', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]);
    this.print(PROMPT_INTRO_3);
  }

  private printInput(input: string) {
    this.print(
      <p>
        <span className="gl-color-text-desc">&gt;&nbsp;</span>
        <TextRaw text={input} />
      </p>
    );
  }

  private checkEndGame(winner: Move): boolean {
    // reaco
    const gameResult = this.ticTacToeCore.getGameResult(this.board, winner);
    if (gameResult === 'continue') return false;
    this.print(<br />);
    if (gameResult === 'draw') {
      this.print(<p>It is a draw. Here is the result: </p>);
    } else {
      if (winner === this.reacoMove && gameResult === 'win')
        this.print(<p>You lost. Here is the result: </p>);
      else this.print(<p>You won. Here is the result: </p>);
    }
    this.print(<br />);
    this.printBoard(this.board);
    this.print(<br />);
    this.print(<p>{'Thanks for playing!'}</p>);
    this.print(<br />);
    return true;
  }

  private handleInput(input: string) {
    this.printInput(input);
    if (input === 'exit') {
      this.print(<p>{'Thanks for playing!'}</p>);
      this.stop();
      return;
    }
    const moveBoard: MoveBoard | null = this.getMove(input);
    if (moveBoard === null) {
      this.print(<p>{'Please enter a valid move, for example "a1"'}</p>);
      return;
    }
    const move: Move = this.board[moveBoard[0]][moveBoard[1]];
    if (move !== '.') {
      this.print(<p>{'The move is occupied. Please enter a valid move.'}</p>);
      return;
    }

    // player
    this.print(<br />);
    this.setMove(moveBoard, this.playerMove);
    this.print(<p>You made a move. Here is the updated board: </p>);
    this.print(<br />);
    this.printBoard(this.board);
    this.print(<br />);

    // reaco
    if (this.checkEndGame(this.playerMove)) {
      this.stop();
      return;
    }
    this.setMove(this.ticTacToeCore.getBestMove(this.board), this.reacoMove);
    this.print(<p>Now it is my turn. Here is the updated board: </p>);
    this.print(<br />);
    this.printBoard(this.board);
    if (this.checkEndGame(this.reacoMove)) {
      this.stop();
      return;
    }
    this.print(<br />);
    this.print(<p>Please make your next move. </p>);
    this.print(<br />);
  }

  private startGame() {
    this.updateAppPrompt({
      inputListener: (input) => {
        this.handleInput(input);
      },
    });
    this.printIntro();
  }

  private initPrompt() {
    this.initAppPrompt((input: string) => {
      switch (input.toLowerCase()) {
        case 'y':
          this.printInput(input);
          this.startGame();
          break;
        case '':
          this.startGame();
          break;
        case 'n':
          this.printInput(input);
          this.stop();
          break;
        default:
          this.print(
            <p className="gl-word-break-normal">
              {"Please enter a valid response 'y' or 'n'"}
            </p>
          );
          break;
      }
    });
    this.print(
      <p className="gl-word-break-normal">
        Do you wish to play Tic Tac Toe with me? (Y/n)
      </p>
    );
  }

  protected run(): void {
    if (this.lock()) {
      this.initPrompt();
    } else {
      this.print(<p>ERROR: Cannot lock process.</p>);
      this.stop();
    }
  }

  protected cleanup(): void {
    this.unlock();
  }
}

export default AppTicTacToe;
