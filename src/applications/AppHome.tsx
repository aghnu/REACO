import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { v4 as uuid } from 'uuid';
import {
  HOME_WELCOME,
  HOME_NAV_HELP,
  HOME_WELCOME_COWSAY_FRAME_1,
  HOME_WELCOME_COWSAY_FRAME_2,
  PROMPT_SEP,
  PROMPT_RESUME,
  PROMPT_CMD_HELP,
} from './snippets';

class AppHome extends BaseApplication {
  public name: AppName = 'home';
  public id = uuid();
  protected animationInterval: number | undefined = undefined;

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run() {
    this.print(HOME_WELCOME);
    const cowsayId = this.print(HOME_WELCOME_COWSAY_FRAME_1);
    this.animationInterval = window.setInterval(() => {
      this.printUpdate(
        cowsayId,
        [HOME_WELCOME_COWSAY_FRAME_1, HOME_WELCOME_COWSAY_FRAME_2][
          Math.floor(Math.random() * 1.35)
        ]
      );
    }, 500);
    this.print(PROMPT_RESUME);
    this.print(PROMPT_SEP);
    this.print(HOME_NAV_HELP);
    this.print(<br />);
    this.print(PROMPT_CMD_HELP);
    this.print(PROMPT_SEP);
    this.runSubProcess('contact');
    this.print(PROMPT_SEP);
  }

  protected cleanup() {
    window.clearInterval(this.animationInterval);
  }
}

export default AppHome;
