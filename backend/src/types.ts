export enum Months {
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

// Add this line to allow string indexing
export type MonthsType = typeof Months[keyof typeof Months];