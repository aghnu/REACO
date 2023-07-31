import Cowsay from '@applications/components/Cowsay';
import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { HOME_WELCOME, HELP_DESC, PROMPT_SEP, PROMPT_RESUME } from './snippets';

class AppHome extends BaseApplication {
  public name: AppName = 'home';

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run() {
    this.print(HOME_WELCOME);
    this.print(<Cowsay />);
    this.print(PROMPT_RESUME);
    this.print(PROMPT_SEP);
    this.print(HELP_DESC);
    this.print(<br />);
    this.runSubProcess('help', ['help']);
    this.runSubProcess('help', ['portfolio']);
    this.runSubProcess('help', ['skills']);
    this.print(PROMPT_SEP);
    this.runSubProcess('contact');
    this.stop();
  }

  protected cleanup() {}
}

export default AppHome;
