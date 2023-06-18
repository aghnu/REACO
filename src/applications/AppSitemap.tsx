import BaseApplication from '@base/BaseApplication';
import TextLink from '@components/TextLink';
import { origin, paths } from '@data/sitemap.json';
import { type AppName } from '@type/ApplicationTypes';
import { getClassName } from '@utils/helpers';
import textStyle from '@styles/modules/text.module.scss';

class AppSitemap extends BaseApplication {
  public name: AppName = 'sitemap';

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run(): void {
    paths.forEach((p) => {
      const link = origin + p.path;
      this.print(
        <TextLink
          className={getClassName(['global-d-block', textStyle.desc])}
          link={link}
        >
          {link}
        </TextLink>
      );
    });
    this.stop();
  }

  protected cleanup(): void {}
}

export default AppSitemap;
