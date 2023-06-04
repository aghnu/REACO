import { type AppNames } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { v4 as uuid } from 'uuid';

class AppKeyboard extends BaseApplication {
  name: AppNames = 'keyboard';
  id = uuid();
}

export default AppKeyboard;
