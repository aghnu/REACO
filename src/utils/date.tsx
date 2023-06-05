interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export function getCurrentDateInfoWithTimeOffset(
  offsetHours: number
): DateInfo {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const offset = offsetHours * 60 * 60 * 1000;
  const dateWithOffset = new Date(utc + offset);

  return {
    year: dateWithOffset.getFullYear(),
    month: dateWithOffset.getMonth() + 1,
    day: dateWithOffset.getDate(),
    hour: dateWithOffset.getHours(),
    minute: dateWithOffset.getMinutes(),
    second: dateWithOffset.getSeconds(),
  };
}

export function getDateParsedString(dateInfo: DateInfo) {
  const hour12 = dateInfo.hour > 12 ? dateInfo.hour - 12 : dateInfo.hour;
  const secondStr =
    dateInfo.second < 10 ? `0${dateInfo.second}` : dateInfo.second;
  const ampm = dateInfo.hour >= 12 ? 'PM' : 'AM';

  return `${dateInfo.month}/${dateInfo.day}/${dateInfo.year} ${hour12}:${dateInfo.minute}:${secondStr} ${ampm}`;
}
