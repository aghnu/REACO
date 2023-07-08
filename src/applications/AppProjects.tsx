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
    // past
    this.print(<br />);
    this.print(<p className="gl-color-text-desc">Past Projects: </p>);
    for (let i = past.length - 1; i >= 0; i--) {
      this.print(<br />);
      this.print(<TextProject data={past[i]} />);
    }

    // recent
    this.print(<br />);
    this.print(<p className="gl-color-text-desc">Recent Projects: </p>);
    for (let i = recent.length - 1; i >= 0; i--) {
      this.print(<br />);
      this.print(<TextProject data={recent[i]} />);
    }

    this.stop();
  }

  protected cleanup(): void {}
}

export default AppProjects;
