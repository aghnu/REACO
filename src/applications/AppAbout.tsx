import BaseApplication from '@base/BaseApplication';
import textStyles from '@styles/modules/text.module.scss';
import { type AppName } from '@type/ApplicationTypes';

class AppAbout extends BaseApplication {
  public name: AppName = 'about';

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run(): void {
    this.print(<p className={textStyles.double}>R E A C O</p>);
    this.print(
      <p className={textStyles.desc}>{"Gengyuan Huang's Homepage"}</p>
    );
    this.print(<br />);
  }

  protected cleanup(): void {}
}

export default AppAbout;
