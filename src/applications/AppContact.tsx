import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { v4 as uuid } from 'uuid';
import {
  PROMPT_CONTACT_EMAIL,
  PROMPT_CONTACT_GITHUB,
  PROMPT_CONTACT_LINKEDIN,
} from './snippets';

class AppContact extends BaseApplication {
  public name: AppName = 'contact';
  public id = uuid();

  private promptInit() {
    this.displayController.print(<p>To contact me:</p>);
    this.displayController.print(<br />);
    this.applicationController.runApplication('location', false);
    this.displayController.print(<br />);
    this.displayController.print(PROMPT_CONTACT_EMAIL);
    this.displayController.print(PROMPT_CONTACT_GITHUB);
    this.displayController.print(PROMPT_CONTACT_LINKEDIN);
  }

  public start() {
    this.addApplicationInstanceToState();
    this.promptInit();
  }

  public stop() {
    super.stop();
    this.removeApplicationInstanceFromState();
  }
}

export default AppContact;
