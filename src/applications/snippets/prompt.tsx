import TextSplit from '@components/TextSplit';

export const PROMPT_SEP = (
  <>
    <br />
    <p>* * *</p>
    <br />
  </>
);

export const PROMPT_RESUME = (
  <>
    <TextSplit left={<p>Resume</p>} right={<p>resume_gengyuan.pdf</p>} />
  </>
);

export const PROMPT_CMD_HELP = (
  <>
    <TextSplit
      left={<p>Help</p>}
      right={<p>list all the commands that aghnu.me currently supports</p>}
    />
  </>
);
