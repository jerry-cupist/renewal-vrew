type DateType = string | number | Date;

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/**
 *
 * @example calculateDDay('2023-09-01', '2023-09-15') // D-14
 */
export const calculateDDay = (
  startDate: DateType,
  endDate: DateType
): string => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const targetStartDate = new Date(startDate);
  targetStartDate.setHours(0, 0, 0, 0);

  const targetEndDate = new Date(endDate);
  targetEndDate.setHours(23, 59, 59, 999);

  if (now >= targetStartDate && now <= targetEndDate) {
    return "진행 중";
  }

  const diffInMilliseconds = targetStartDate.getTime() - now.getTime();
  const diffInDays = diffInMilliseconds / DAY;

  if (diffInDays === 0) {
    return "D-Day";
  }
  if (diffInDays > 0) {
    return `D-${Math.abs(diffInDays)}`;
  }
  return "지난 모임";
};
