import BaseApplication from '@base/BaseApplication';
import { type AppName } from '@type/ApplicationTypes';
import TextLink from '@components/TextLink';
import { getClassName } from '@utils/helpers';
import { PROMPT_SEP } from './snippets';

class AppAbout extends BaseApplication {
  public name: AppName = 'about';

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run(): void {
    this.print(<p className="gl-double-double">R E A C O</p>);
    this.print(
      <p className="gl-color-text-desc">{"Gengyuan Huang's Homepage"}</p>
    );
    this.print(PROMPT_SEP);
    this.runSubProcess('sitemap');
    this.print(<br />);
    this.print(<p>To know more about this website:</p>);
    this.print(<br />);
    this.print(
      <TextLink
        className={getClassName(['gl-d-block', 'gl-color-text-desc'])}
        link="https://github.com/aghnu/REACO"
      >
        https://github.com/aghnu/REACO
      </TextLink>
    );
    this.print(<br />);
    this.runSubProcess('contact');
    this.print(PROMPT_SEP);
    this.print(<p>Designed & Built by Gengyuan Huang</p>);
  }

  protected cleanup(): void {}
}

export default AppAbout;
