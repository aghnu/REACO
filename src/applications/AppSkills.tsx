import BaseApplication from '@base/BaseApplication';
import { type AppName } from '@type/ApplicationTypes';
import { skills } from '@data/skills.json';
import TextSkill from '@components/TextSkill';

class AppSkills extends BaseApplication {
  public name: AppName = 'skills';

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run(): void {
    skills.forEach((s) => {
      this.print(<br />);
      this.print(<TextSkill data={s} />);
    });
    this.stop();
  }

  protected cleanup(): void {}
}

export default AppSkills;
