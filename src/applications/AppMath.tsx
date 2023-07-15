import BaseApplication from "@base/BaseApplication";
import { AppName } from "@type/ApplicationTypes";
import TextRaw from "@components/TextRaw";
import { PROMPT_PARAM_INVALID } from "./snippets";
import { produce } from "immer";

class AppMath extends BaseApplication {
  public name: AppName = 'math';

  private printUsage() {
    this.print(
      <>
        <p>Usage:</p>
        <p>
          <TextRaw text="  -" />
          <TextRaw text={` ${this.args[0]} `} className="gl-color-text-calm" />
          <span>expression</span>
        </p>
      </>
    );
  }

  protected validate(): boolean {
    if (this.args.length <= 1) {
      this.print(PROMPT_PARAM_INVALID);
      this.printUsage();
      return false;
    }
    return true;
  }

  private prettyPrint(type: 'exp' | 'result', msg: string) {
    this.print(
      <>
        <p>
          <TextRaw text={type === 'exp' ? "  - " : "  > "} />
          <TextRaw text={msg} className={type === 'exp' ? "gl-color-text-plain" : "gl-color-text-calm"} />
        </p>
      </>
    );
  }

  private compute(mathModule: typeof import('mathjs'), expression: string) {
    try {
      const result = mathModule.evaluate(expression);
      if (result === null || result === undefined) throw new Error();
      this.prettyPrint('result', String(result));
    } catch(_) {
      this.prettyPrint('result', 'invalid expression');
    }
  }


  protected run(): void {
    const expression = produce(this.args, (draft) => {
      draft.shift()
      return draft;
    }).join('');
    this.prettyPrint('exp', expression);
    import("mathjs").then((module) => {
      this.compute(module, expression)
      this.stop();
    }).catch(() => {
      this.prettyPrint('result', 'error loading module');
      this.stop();
    });
  }
  protected cleanup() {}
}

export default AppMath;