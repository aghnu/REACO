import {
  getCurrentDateInfoWithTimeOffset,
  getDateParsedString,
} from '@utils/date';
import { useEffect, useState } from 'react';

const getDateString = (timezoneOffset: number) => {
  return getDateParsedString(getCurrentDateInfoWithTimeOffset(timezoneOffset));
};

const DateTime = ({
  timezoneOffset,
  className,
}: {
  timezoneOffset: number;
  className?: string;
}) => {
  const [dateParsedString, setDateParsedString] = useState(
    getDateString(timezoneOffset),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDateParsedString(getDateString(timezoneOffset));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [timezoneOffset]);

  return <p className={className}>{dateParsedString}</p>;
};

export default DateTime;
