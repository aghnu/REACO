import BaseApplication from '@base/BaseApplication';
import { type AppName } from '@type/ApplicationTypes';

class AppAbout extends BaseApplication {
  public name: AppName = 'about';

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run(): void {
    this.print(<p className="gl-double">R E A C O</p>);
    this.print(
      <p className="gl-color-text-desc">{"Gengyuan Huang's Homepage"}</p>
    );
    this.print(<br />);
    this.runSubProcess('sitemap');
  }

  protected cleanup(): void {}
}

export default AppAbout;
