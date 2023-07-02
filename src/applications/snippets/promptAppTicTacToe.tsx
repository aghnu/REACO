const TEXT_WELCOME =
  "Ok! Welcome to the Tic Tac Toe game! Here's how the game board looks like:";
const TEXT_INTRO_1 =
  "In this game, you'll be playing against me. The empty cells on the board are represented by a dot ('.'). Your moves will be represented by 'x', while my moves will be represented by 'o'. To place your move at a specific position, you need to enter the corresponding row and column.";
const TEXT_INTRO_2 =
  "For example, if you want to place your move at the top-left corner, you would enter 'a1'. Here's how the board would look after your move:";
const TEXT_INTRO_3 =
  "You can exit anytime by enter 'exit'. Game started! Enter your first move";
export const PROMPT_INTRO_1 = (
  <>
    <br />
    <p className="gl-word-break-normal">{TEXT_WELCOME}</p>
    <br />
  </>
);

export const PROMPT_INTRO_2 = (
  <>
    <br />
    <p className="gl-word-break-normal">{TEXT_INTRO_1}</p>
    <br />
    <p className="gl-word-break-normal">{TEXT_INTRO_2}</p>
    <br />
  </>
);
export const PROMPT_INTRO_3 = (
  <>
    <br />
    <p className="gl-word-break-normal">{TEXT_INTRO_3}</p>
    <br />
  </>
);
