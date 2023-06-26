import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import TextSplit from '@components/TextSplit';
import {
  getCurrentDateInfoWithTimeOffset,
  getDateParsedString,
} from '@utils/date';

class AppLocation extends BaseApplication {
  public name: AppName = 'location';
  protected animationInterval: number | undefined = undefined;
  private readonly location = 'Calgary, AB, Canada';
  private readonly timezoneOffsetUTC = 6;

  private getDateElement(): JSX.Element {
    const dateParsedString = getDateParsedString(
      getCurrentDateInfoWithTimeOffset(this.timezoneOffsetUTC)
    );

    return (
      <TextSplit
        left={<p className={'gl-color-text-docus'}>Time</p>}
        right={<p className={'gl-color-text-desc'}>{dateParsedString}</p>}
        type="alt"
      />
    );
  }

  protected validate(): boolean {
    return this.validateArgs();
  }

  protected run() {
    this.print(
      <TextSplit
        left={<p className="gl-color-text-focus">Location</p>}
        right={<p className="gl-color-text-desc">{this.location}</p>}
        type="alt"
      />
    );
    const timeElementId = this.print(this.getDateElement());
    this.animationInterval = window.setInterval(() => {
      this.printUpdate(timeElementId, this.getDateElement());
    }, 1000);
  }

  protected cleanup() {
    window.clearInterval(this.animationInterval);
  }
}

export default AppLocation;
