import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import ApplicationController from './controllers/ApplicationController';
import DisplayController from './controllers/DisplayController';
import TextRaw from '@components/TextRaw';
import { PROMPT_PARAM_INVALID } from './snippets';
import HistoryController from './controllers/HistoryController';

class AppClear extends BaseApplication {
  public name: AppName = 'home';

  private printUsage() {
    this.print(
      <>
        <p>Usage:</p>
        <p>
          <TextRaw text="  -" />
          <TextRaw text={`${this.args[0]} `} className="gl-color-text-calm" />
        </p>
        <p>
          <TextRaw text="  -" />
          <TextRaw text={`${this.args[0]} `} className="gl-color-text-calm" />
          <span>[option]</span>
        </p>
      </>
    );
  }

  protected validate(): boolean {
    switch (this.args.length) {
      case 2:
        return (() => {
          const option = this.args[1];
          if (option === 'history' || option === 'h') return true;

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

  protected run() {
    if (this.args.length === 2) {
      const option = this.args[1];
      if (option === 'history' || option === 'h') {
        HistoryController.getInstance().clear();
        this.print(<p>Input history cleared</p>);
      }
      return;
    }

    ApplicationController.getInstance().clearApplications();
    DisplayController.getInstance().printClear();
    this.stop();
  }

  protected cleanup() {}
}

export default AppClear;
