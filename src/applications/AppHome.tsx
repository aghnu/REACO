import { type AppNames } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { v4 as uuid } from 'uuid';
import {
  HOME_TITLE,
  HOME_WELCOME,
  HOME_NAV_HELP,
  HOME_WELCOME_COWSAY_FRAME_1,
  HOME_WELCOME_COWSAY_FRAME_2,
  PROMPT_SEP,
  PROMPT_RESUME,
  PROMPT_CMD_HELP,
} from './snippets';

class AppHome extends BaseApplication {
  public name: AppNames = 'home';
  public id = uuid();
  protected animationInterval: number | undefined = undefined;

  private promptInit() {
    this.displayController.print(PROMPT_SEP);
    this.displayController.print(HOME_TITLE);
    this.displayController.print(<br />);
    this.displayController.print(HOME_WELCOME);
    const cowsayId = this.displayController.print(HOME_WELCOME_COWSAY_FRAME_1);
    this.animationInterval = window.setInterval(() => {
      this.displayController.printUpdate(
        cowsayId,
        [HOME_WELCOME_COWSAY_FRAME_1, HOME_WELCOME_COWSAY_FRAME_2][
          Math.floor(Math.random() * 1.35)
        ]
      );
    }, 500);
    this.displayController.print(PROMPT_SEP);
    this.displayController.print(PROMPT_RESUME);
    this.displayController.print(PROMPT_SEP);
    this.displayController.print(HOME_NAV_HELP);
    this.displayController.print(PROMPT_SEP);
    this.displayController.print(PROMPT_CMD_HELP);
    this.displayController.print(PROMPT_SEP);
  }

  private promptCleanup() {
    window.clearInterval(this.animationInterval);
  }

  public start() {
    this.addApplicationInstanceToState();
    this.promptInit();
  }

  public stop() {
    super.stop();
    this.removeApplicationInstanceFromState();
    this.promptCleanup();
  }
}

export default AppHome;
