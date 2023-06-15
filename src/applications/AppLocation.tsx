import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { v4 as uuid } from 'uuid';
import TextSplit from '@components/TextSplit';
import textStyle from '@styles/modules/text.module.scss';
import {
  getCurrentDateInfoWithTimeOffset,
  getDateParsedString,
} from '@utils/date';

class AppLocation extends BaseApplication {
  public name: AppName = 'location';
  public id = uuid();
  protected animationInterval: number | undefined = undefined;
  private readonly location = 'Calgary, AB, Canada';
  private readonly timezoneOffsetUTC = 6;

  private getDateElement(): JSX.Element {
    const dateParsedString = getDateParsedString(
      getCurrentDateInfoWithTimeOffset(this.timezoneOffsetUTC)
    );

    return (
      <TextSplit
        left={<p className={textStyle.focus}>Time</p>}
        right={<p className={textStyle.desc}>{dateParsedString}</p>}
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
        left={<p className={textStyle.focus}>Location</p>}
        right={<p className={textStyle.desc}>{this.location}</p>}
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
