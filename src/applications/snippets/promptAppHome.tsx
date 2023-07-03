import TextRaw from '@components/TextRaw';

export const HOME_WELCOME = (
  <p>
    Hello stranger! Welcome to my homepage. My name is
    <span className="gl-color-text-focus"> Gengyuan Huang</span>, a software
    developer...
  </p>
);

export const HOME_WELCOME_COWSAY_FRAME_1 = (
  <>
    <span className="gl-color-text-desc">
      {/* eslint-disable prettier/prettier */}
      <TextRaw className='gl-nowrap' type="p" text="  _________________________" />
      <TextRaw className='gl-nowrap' type="p" text="       \" />
      <TextRaw className='gl-nowrap' type="p" text="        \   ^__^" />
      <TextRaw className='gl-nowrap' type="p" text="         \  (oo)\_______" />
      <TextRaw className='gl-nowrap' type="p" text="            (__)\       )\/\" />
      <TextRaw className='gl-nowrap' type="p" text="                ||----w |" />
      <TextRaw className='gl-nowrap' type="p" text="                ||     ||" />
      {/* eslint-enable prettier/prettier */}
    </span>
  </>
);

export const HOME_WELCOME_COWSAY_FRAME_2 = (
  <>
    <span className="gl-color-text-desc">
      {/* eslint-disable prettier/prettier */}
      <TextRaw className='gl-nowrap' type="p" text="  _________________________" />
      <TextRaw className='gl-nowrap' type="p" text="       \" />
      <TextRaw className='gl-nowrap' type="p" text="        \   ^__^" />
      <TextRaw className='gl-nowrap' type="p" text="         \  (--)\_______" />
      <TextRaw className='gl-nowrap' type="p" text="            (__)\       )\/\" />
      <TextRaw className='gl-nowrap' type="p" text="                ||----w |" />
      <TextRaw className='gl-nowrap' type="p" text="                ||     ||" />
      {/* eslint-enable prettier/prettier */}
    </span>
  </>
);
