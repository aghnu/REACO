import TextLink from '@components/TextLink';
import TextSplit from '@components/TextSplit';
import TextButton from '@components/TextButton';
import textStyle from '@styles/modules/text.module.scss';

export const PROMPT_SEP = (
  <>
    <br />
    <p className={textStyle.noselect}>* * *</p>
    <br />
  </>
);

export const PROMPT_RESUME = (
  <>
    <TextSplit
      left={<p>Resume</p>}
      right={
        <TextLink link="https://aghnu.me/resume">resume_gengyuan.pdf</TextLink>
      }
    />
  </>
);

export const PROMPT_CMD_HELP = (
  <>
    <TextSplit
      left={<TextButton>Help</TextButton>}
      right={<p>list all the commands that aghnu.me currently supports</p>}
    />
  </>
);
