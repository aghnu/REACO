import BaseApplication from '@base/BaseApplication';
import TextLink from '@components/TextLink';
import { origin, paths } from '@data/sitemap.json';
import { type AppName } from '@type/ApplicationTypes';
import { getClassName } from '@utils/helpers';

class AppSitemap extends BaseApplication {
  public name: AppName = 'sitemap';
  public static alias = ['ls'];

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run(): void {
    paths.forEach((p) => {
      const link = origin + p.path;
      this.print(
        <TextLink
          className={getClassName(['gl-d-block', 'gl-color-text-desc'])}
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
