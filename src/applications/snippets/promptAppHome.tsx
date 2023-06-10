import TextRaw from '@components/TextRaw';
import textStyle from '@styles/modules/text.module.scss';

export const HOME_WELCOME = (
  <p>
    Hello stranger! Welcome to my homepage. My name is
    <span className={textStyle.focus}> Gengyuan Huang</span>, a software
    developer...
  </p>
);

export const HOME_NAV_HELP = (
  <p>
    To navigate the site, you can either type commands into the console or click
    on the <span className={textStyle.underline}>underlined</span> elements.
    Here are some useful commands:
  </p>
);

export const HOME_WELCOME_COWSAY_FRAME_1 = (
  <>
    <span className={textStyle.desc}>
      {/* eslint-disable prettier/prettier */}
      <TextRaw className={textStyle.nowrap} type="p" text="  _________________________" />
      <TextRaw className={textStyle.nowrap} type="p" text="       \" />
      <TextRaw className={textStyle.nowrap} type="p" text="        \   ^__^" />
      <TextRaw className={textStyle.nowrap} type="p" text="         \  (oo)\_______" />
      <TextRaw className={textStyle.nowrap} type="p" text="            (__)\       )\/\" />
      <TextRaw className={textStyle.nowrap} type="p" text="                ||----w |" />
      <TextRaw className={textStyle.nowrap} type="p" text="                ||     ||" />
      {/* eslint-enable prettier/prettier */}
    </span>
  </>
);

export const HOME_WELCOME_COWSAY_FRAME_2 = (
  <>
    <span className={textStyle.desc}>
      {/* eslint-disable prettier/prettier */}
      <TextRaw className={textStyle.nowrap} type="p" text="  _________________________" />
      <TextRaw className={textStyle.nowrap} type="p" text="       \" />
      <TextRaw className={textStyle.nowrap} type="p" text="        \   ^__^" />
      <TextRaw className={textStyle.nowrap} type="p" text="         \  (--)\_______" />
      <TextRaw className={textStyle.nowrap} type="p" text="            (__)\       )\/\" />
      <TextRaw className={textStyle.nowrap} type="p" text="                ||----w |" />
      <TextRaw className={textStyle.nowrap} type="p" text="                ||     ||" />
      {/* eslint-enable prettier/prettier */}
    </span>
  </>
);
