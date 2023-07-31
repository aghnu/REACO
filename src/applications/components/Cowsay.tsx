import { useEffect, useState } from 'react';
import {
  HOME_WELCOME_COWSAY_FRAME_1,
  HOME_WELCOME_COWSAY_FRAME_2,
} from '@applications/snippets';

type CowsayFrames = JSX.Element[];

const cowsayFramesCow: CowsayFrames = [
  ...Array(2).fill(HOME_WELCOME_COWSAY_FRAME_1),
  ...Array(1).fill(HOME_WELCOME_COWSAY_FRAME_2),
];

const Cowsay = () => {
  const [frame, setFrame] = useState<JSX.Element>(cowsayFramesCow[0]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const selectedFrame =
        cowsayFramesCow[Math.floor(Math.random() * cowsayFramesCow.length)];
      setFrame(selectedFrame);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  });

  return <>{frame}</>;
};

export default Cowsay;
