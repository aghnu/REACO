import TextRaw from '@components/TextRaw';
import textStyle from '@styles/modules/text.module.scss';
import { getClassName } from '@utils/helpers';

export const HOME_TITLE = (
  <>
    <p
      className={getClassName([
        textStyle.double,
        textStyle.desc,
        textStyle.spread,
      ])}
    >
      REACO
    </p>
    <p className={textStyle.focus}>{"Gengyuan Huang's Homepage"}</p>
  </>
);

export const HOME_WELCOME = (
  <p>
    Hello stranger! Welcome to my homepage. My name is Gengyuan Huang, a
    software developer...
  </p>
);

export const HOME_NAV_HELP = (
  <p>
    To navigate the site, you can either type commands into the console or click
    on the highlighted elements. Here are some useful commands:
  </p>
);

export const HOME_WELCOME_COWSAY_FRAME_1 = (
  <>
    {/* eslint-disable prettier/prettier */}
    <TextRaw className={textStyle.nowrap} type="p" text="        \   ^__^" />
    <TextRaw className={textStyle.nowrap} type="p" text="         \  (oo)\_______" />
    <TextRaw className={textStyle.nowrap} type="p" text="            (__)\       )\/\" />
    <TextRaw className={textStyle.nowrap} type="p" text="                ||----w |" />
    <TextRaw className={textStyle.nowrap} type="p" text="                ||     ||" />
    {/* eslint-enable prettier/prettier */}
  </>
);

export const HOME_WELCOME_COWSAY_FRAME_2 = (
  <>
    {/* eslint-disable prettier/prettier */}
    <TextRaw className={textStyle.nowrap} type="p" text="        \   ^__^" />
    <TextRaw className={textStyle.nowrap} type="p" text="         \  (--)\_______" />
    <TextRaw className={textStyle.nowrap} type="p" text="            (__)\       )\/\" />
    <TextRaw className={textStyle.nowrap} type="p" text="                ||----w |" />
    <TextRaw className={textStyle.nowrap} type="p" text="                ||     ||" />
    {/* eslint-enable prettier/prettier */}
  </>
);
