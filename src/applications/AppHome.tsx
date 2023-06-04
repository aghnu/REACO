import { type AppNames } from '@type/ApplicationTypes';
import BaseApplication from './base/BaseApplication';
import { v4 as uuid } from 'uuid';

class AppHome extends BaseApplication {
  name: AppNames = 'home';
  id = uuid();
}

export default AppHome;
