import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { resetStorage } from '@vanilla/storageManagement';
import { stopApplication } from './controllers';

class AppReset extends BaseApplication {
  public name: AppName = 'reset';

  protected validate() {
    return this.validateArgs();
  }

  protected run() {
    // produce event for reset after a short delay
    window.setTimeout(() => {
      stopApplication();
      resetStorage();
      window.history.replaceState(null, '', window.location.pathname);
      location.reload();
    }, 100);
    this.stop();
  }

  protected cleanup() {}
}

export default AppReset;
