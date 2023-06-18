import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { THEME_PARAM_PROMPT } from './snippets/promptAppTheme';
import { type DisplayThemeMode } from '@type/GlobalStyleTypes';
import { PROMPT_PARAM_INVALID } from './snippets';
import { globalStyleState } from '@store/index';

class AppTheme extends BaseApplication {
  public name: AppName = 'theme';
  protected themeModes: DisplayThemeMode[] = ['dark', 'light'];

  private printThemeList() {
    this.print(<p>Options:</p>);
    this.themeModes.forEach((name) => {
      this.print(<p>&nbsp;&nbsp;-&nbsp;{name}</p>);
    });
    this.print(<br />);
  }

  protected validate(): boolean {
    const isValid = this.validateArgs({
      expectedArgsLength: 2,
      validationFunction: () => {
        const option = this.args[1];
        if ((this.themeModes as string[]).includes(option)) {
          return true;
        }
        this.print(PROMPT_PARAM_INVALID);
        return false;
      },
    });
    if (!isValid) {
      this.print(THEME_PARAM_PROMPT);
      this.print(<br />);
      this.printThemeList();
    }

    return isValid;
  }

  protected run() {
    const option = this.args[1];
    const searchIndex = (this.themeModes as string[]).indexOf(option);
    if (searchIndex === -1) {
      this.print(<p>Cannot change theme</p>);
      this.print(<br />);
      this.stop();
      return;
    }
    this.storeSetAtom(
      globalStyleState.displayThemeMode,
      this.themeModes[searchIndex]
    );
    this.print(<p>Change theme to {this.themeModes[searchIndex]}</p>);
    this.print(<br />);
    this.stop();
  }

  protected cleanup() {}
}

export default AppTheme;
