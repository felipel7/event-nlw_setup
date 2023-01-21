import dayjs from 'dayjs';

function generateDateRange() {
  const firstDay = dayjs().startOf('year');
  const today = new Date();

  const dates = [];

  let compareDate = firstDay;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dates;
}

export { generateDateRange };
