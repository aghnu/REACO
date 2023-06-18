import TextLink from '@components/TextLink';
import TextSplit from '@components/TextSplit';
import TextIcon from '@components/TextIcon';
import textStyle from '@styles/modules/text.module.scss';
import { icon } from '@utils/svgFactory';
import TextLabel from '@components/TextLabel';

export const PROMPT_SEP = (
  <>
    <br />
    <p className={textStyle.noselect}>* * *</p>
    <br />
  </>
);

export const PROMPT_PARAM_INVALID = <TextLabel text="Invalid Parameters" />;

export const PROMPT_CONTACT_EMAIL = (
  <TextSplit
    left={
      <div className="global-d-flex global-gap-25">
        <TextIcon iconElement={icon.email('var(--color-focus)', '100%')} />
        <p className={textStyle.focus}>Email</p>
      </div>
    }
    right={
      <TextLink link={'mailto:gengyuan@ualberta.ca'}>
        gengyuan@ualberta.ca
      </TextLink>
    }
  />
);

export const PROMPT_CONTACT_GITHUB = (
  <TextSplit
    left={
      <div className="global-d-flex global-gap-25">
        <TextIcon iconElement={icon.github('var(--color-focus)', '100%')} />
        <p className={textStyle.focus}>GitHub</p>
      </div>
    }
    right={
      <TextLink link={'https://github.com/aghnu'}>github.com/aghnu</TextLink>
    }
  />
);

export const PROMPT_CONTACT_LINKEDIN = (
  <TextSplit
    left={
      <div className="global-d-flex global-gap-25">
        <TextIcon iconElement={icon.linkedin('var(--color-focus)', '100%')} />
        <p className={textStyle.focus}>LinkedIn</p>
      </div>
    }
    right={
      <TextLink link={'https://www.linkedin.com/in/gengyuanh'}>
        Gengyuan Huang
      </TextLink>
    }
  />
);

export const PROMPT_RESUME = (
  <TextSplit
    left={
      <div className="global-d-flex global-gap-25">
        <TextIcon iconElement={icon.link('var(--color-focus)', '100%')} />
        <p className={textStyle.focus}>Resume</p>
      </div>
    }
    right={
      <TextLink link="https://aghnu.me/resume">resume_gengyuan.pdf</TextLink>
    }
  />
);
