import { format } from 'date-fns';

// https://stackoverflow.com/questions/48172772/time-zone-issue-involving-date-fns-format
const formatDate = (dateStr, formatStr) => {
  const dt = new Date(dateStr);
  const dtDateOnly = new Date(
    dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
  );
  return format(dtDateOnly, formatStr);
};

export { formatDate };
