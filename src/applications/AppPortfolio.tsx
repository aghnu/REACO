import BaseApplication from '@base/BaseApplication';
import { type AppName, type DataProject } from '@type/ApplicationTypes';
import { projects } from '@data/portfolio.json';
import TextPortfolio from '@components/TextPortfolio';

class AppPortfolio extends BaseApplication {
  public name: AppName = 'portfolio';

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run(): void {
    const datas: DataProject[] = projects;
    datas.forEach((d) => {
      this.print(<TextPortfolio data={d} />);
      this.print(<br />);
    });
  }

  protected cleanup(): void {}
}

export default AppPortfolio;
