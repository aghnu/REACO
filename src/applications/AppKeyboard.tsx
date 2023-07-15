import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { systemState } from '@store/index';

class AppKeyboard extends BaseApplication {
  public name: AppName = 'keyboard';

  private toggleKeyboard() {
    this.storeSetAtom(
      systemState.isVirtualKeyboardEnabledAtom,
      !this.storeGetAtom(systemState.isVirtualKeyboardEnabledAtom),
    );
  }

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run() {
    this.toggleKeyboard();
    this.stop();
  }

  protected cleanup() {}
}

export default AppKeyboard;
