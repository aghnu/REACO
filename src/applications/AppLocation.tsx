import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import TextSplit from '@components/TextSplit';
import { location, timezoneOffsetUTC } from '@data/location.json';
import DateTime from '@applications/components/DateTime';

class AppLocation extends BaseApplication {
  public name: AppName = 'location';
  private readonly location = location;
  private readonly timezoneOffsetUTC = timezoneOffsetUTC;

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run() {
    this.print(
      <TextSplit
        left={<p className="gl-color-text-focus">Location</p>}
        right={<p className="gl-color-text-desc">{this.location}</p>}
        type="alt"
      />,
    );
    this.print(
      <TextSplit
        left={<p className={'gl-color-text-focus'}>Time</p>}
        right={
          <DateTime
            className={'gl-color-text-desc'}
            timezoneOffset={this.timezoneOffsetUTC}
          />
        }
        type="alt"
      />,
    );
    this.stop();
  }

  protected cleanup() {}
}

export default AppLocation;
