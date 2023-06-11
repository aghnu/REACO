import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { v4 as uuid } from 'uuid';
import { systemState } from '@store/index';

class AppKeyboard extends BaseApplication {
  public name: AppName = 'keyboard';
  public id = uuid();

  private toggleKeyboard() {
    this.storeSetAtom(
      systemState.isVirtualKeyboardEnabledAtom,
      !this.storeGetAtom(systemState.isVirtualKeyboardEnabledAtom)
    );
  }

  public start() {
    this.toggleKeyboard();
  }
}

export default AppKeyboard;
