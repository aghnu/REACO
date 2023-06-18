import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import {
  PROMPT_CONTACT_EMAIL,
  PROMPT_CONTACT_GITHUB,
  PROMPT_CONTACT_LINKEDIN,
} from './snippets';

class AppContact extends BaseApplication {
  public name: AppName = 'contact';

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run() {
    this.print(<p>To contact me:</p>);
    this.print(<br />);
    this.runSubProcess('location');
    this.print(<br />);
    this.print(PROMPT_CONTACT_EMAIL);
    this.print(PROMPT_CONTACT_GITHUB);
    this.print(PROMPT_CONTACT_LINKEDIN);
  }

  public cleanup() {}
}

export default AppContact;
