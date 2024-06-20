export interface Item{
    id: number,
    title: string,
    price: string,
    description: string, 
    category: string,
    image: string,
    sold: boolean,
    dateofSale: string
}

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