export function monthNumberToName(monthNumber?: string | number) {
  const currentYear = new Date().getFullYear();
  const date =
    monthNumber !== undefined
      ? new Date(currentYear, Number(monthNumber), 1)
      : new Date();
  return date.toLocaleString("en-US", { month: "long" });
}

export function getMonthStartDay(date: Date) {
  const monthStartDate = new Date(date);

  monthStartDate.setDate(1);
  monthStartDate.setHours(0, 0, 0, 0);

  return monthStartDate;
}

export function getMonthLastDay(date: Date) {
  const monthEndDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1, // Add 1 to get the next month first date
    0 // Then set day to 0 to get previous month last date
  );

  monthEndDate.setHours(23, 59, 59, 999);

  return monthEndDate;
}
