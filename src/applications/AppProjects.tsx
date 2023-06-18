import BaseApplication from '@base/BaseApplication';
import { type AppName } from '@type/ApplicationTypes';
import { recent, past } from '@data/projects.json';
import TextProject from '@components/TextProject';

class AppProjects extends BaseApplication {
  public name: AppName = 'projects';

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run(): void {
    this.print(<p>Past Projects: </p>);
    this.print(<br />);
    past.forEach((d) => {
      this.print(<TextProject data={d} />);
      this.print(<br />);
    });
    this.print(<p>Recent Projects: </p>);
    this.print(<br />);
    recent.forEach((d) => {
      this.print(<TextProject data={d} />);
      this.print(<br />);
    });
    this.stop();
  }

  protected cleanup(): void {}
}

export default AppProjects;
