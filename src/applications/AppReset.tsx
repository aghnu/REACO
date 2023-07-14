import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { resetStorage } from '@vanilla/storageManagement';

class AppReset extends BaseApplication {
  public name: AppName = 'reset';

  protected validate() {
    return this.validateArgs();
  }

  protected run() {
    resetStorage();
    window.history.replaceState(null, '', window.location.pathname);
    location.reload();
    this.stop();
  }

  protected cleanup() {}
}

export default AppReset;
