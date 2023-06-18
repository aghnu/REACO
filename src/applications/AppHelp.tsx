import BaseApplication from '@base/BaseApplication';
import { type AppName } from '@type/ApplicationTypes';
import APPLICATION_INDEX from '.';
import { PROMPT_PARAM_INVALID } from './snippets';
import textStyle from '@styles/modules/text.module.scss';
import TextSplit from '@components/TextSplit';
import { HELP_DESC } from './snippets/promptAppHelp';
import TextButton from '@components/TextButton';
import ApplicationController from './logics/ApplicationController';

class AppHelp extends BaseApplication {
  public name: AppName = 'help';

  private printUsage() {
    this.print(
      <>
        <p>Usage:</p>
        <p>
          &nbsp;&nbsp;-&nbsp;<span className={textStyle.calm}>help</span>
        </p>
        <p>
          &nbsp;&nbsp;-&nbsp;<span className={textStyle.calm}>help</span>
          &nbsp;<span>[command name]</span>
        </p>
      </>
    );
  }

  private printHelpCmd(name: AppName) {
    this.print(
      <>
        <TextSplit
          left={
            <TextButton
              onClick={() => {
                ApplicationController.getInstance().runApplicationFromArgs([
                  name,
                ]);
              }}
            >
              {name}
            </TextButton>
          }
          right={<p>{APPLICATION_INDEX[name].desc}</p>}
        />
        <br />
      </>
    );
  }

  protected validate(): boolean {
    switch (this.args.length) {
      case 2:
        return (() => {
          const option = this.args[1];
          const apps = Object.keys(APPLICATION_INDEX);
          if (apps.includes(option)) return true;

          this.print(PROMPT_PARAM_INVALID);
          this.printUsage();
          this.print(<br />);
          return false;
        })();
      case 1:
        return true;
      default:
        this.print(PROMPT_PARAM_INVALID);
        return false;
    }
  }

  protected run(): void {
    if (this.args.length === 2) {
      const option = this.args[1] as AppName;
      this.printHelpCmd(option);
      this.stop();
      return;
    }

    const cmds = Object.keys(APPLICATION_INDEX) as AppName[];
    this.print(HELP_DESC);
    this.print(<br />);
    cmds.forEach((cmd) => {
      this.printHelpCmd(cmd);
    });
    this.stop();
  }

  protected cleanup(): void {}
}

export default AppHelp;
