import BaseApplication from '@base/BaseApplication';
import { type AppName } from '@type/ApplicationTypes';
import { PROMPT_PARAM_INVALID } from './snippets';
import TextRaw from '@components/TextRaw';

class AppRng extends BaseApplication {
  public name: AppName = 'rng';

  private printUsage() {
    this.print(
      <>
        <p>Usage:</p>
        <p>
          <TextRaw text="  -" />
          <TextRaw text={`${this.args[0]} `} className="gl-color-text-calm" />
        </p>
        <p>
          <p>
            <TextRaw text="  -" />
            <TextRaw text={`${this.args[0]} `} className="gl-color-text-calm" />
            <span>[max range]</span>
          </p>
        </p>
      </>
    );
  }

  protected validate(): boolean {
    switch (this.args.length) {
      case 2:
        return (() => {
          const option = this.args[1];
          if (!isNaN(Number(option))) return true;

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

  private getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  private getRandomDefault() {
    return Math.floor(Math.random() * 100);
  }

  protected run(): void {
    if (this.args.length === 1) {
      this.print(<p>{this.getRandomDefault()}</p>);
      this.stop();
      return;
    }

    const max = Number(this.args[1]);
    this.print(<p>{this.getRandom(max)}</p>);
    this.stop();
  }

  protected cleanup() {}
}

export default AppRng;
