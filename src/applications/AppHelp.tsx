import BaseApplication from '@base/BaseApplication';
import { type AppName } from '@type/ApplicationTypes';
import APPLICATION_INDEX, {
  APPLICATION_CATE_FUN,
  APPLICATION_CATE_CORE,
  APPLICATION_CATE_INFO,
} from '.';
import { PROMPT_PARAM_INVALID, HELP_DESC, PROMPT_SEP } from './snippets';
import TextSplit from '@components/TextSplit';
import TextButton from '@components/TextButton';
import ApplicationController from './controllers/ApplicationController';

class AppHelp extends BaseApplication {
  public name: AppName = 'help';

  private printUsage() {
    this.print(
      <>
        <p>Usage:</p>
        <p>
          &nbsp;&nbsp;-&nbsp;<span className="gl-color-text-calm">help</span>
        </p>
        <p>
          &nbsp;&nbsp;-&nbsp;<span className="gl-color-text-calm">help</span>
          &nbsp;<span>[command name]</span>
        </p>
      </>
    );
  }

  private printHelpCmd(name: AppName) {
    this.print(
      <TextSplit
        left={
          <TextButton
            className="gl-color-text-desc"
            onClick={() => {
              ApplicationController.getInstance().runApplicationFromArgs([
                name,
              ]);
            }}
          >
            <p className="gl-word-break-normal">{name}</p>
          </TextButton>
        }
        right={
          <p className="gl-word-break-normal">{APPLICATION_INDEX[name].desc}</p>
        }
      />
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
          return false;
        })();
      case 1:
        return true;
      default:
        this.print(PROMPT_PARAM_INVALID);
        return false;
    }
  }

  private printHelpSingle() {
    const option = this.args[1] as AppName;
    this.printHelpCmd(option);
    this.stop();
  }

  private printHelpAll() {
    const cmdsFun = [...APPLICATION_CATE_FUN];
    const cmdsInfo = [...APPLICATION_CATE_INFO];
    const cmdsCore = [...APPLICATION_CATE_CORE];

    this.print(HELP_DESC);
    this.print(PROMPT_SEP);
    this.print(<p className="gl-color-text-focus">Fun: </p>);
    cmdsFun.forEach((cmd) => {
      this.print(<br />);
      this.printHelpCmd(cmd);
    });

    this.print(PROMPT_SEP);
    this.print(<p className="gl-color-text-focus">Info: </p>);
    cmdsInfo.forEach((cmd) => {
      this.print(<br />);
      this.printHelpCmd(cmd);
    });

    this.print(PROMPT_SEP);
    this.print(<p className="gl-color-text-focus">Core: </p>);
    cmdsCore.forEach((cmd) => {
      this.print(<br />);
      this.printHelpCmd(cmd);
    });

    this.stop();
  }

  protected run(): void {
    if (this.args.length === 2) {
      this.printHelpSingle();
      return;
    }
    this.printHelpAll();
  }

  protected cleanup(): void {}
}

export default AppHelp;
