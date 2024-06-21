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

export type barChartData = {
    range: string,
    count: number
}

export interface Data{
    filteredData: {
        response: Item[],
        page: number
    },
    barChartData: barChartData[],
    statisticsData: {
        totalRevenue: number,
        totalSoldItems: number,
        totalUnsoldItems: number
    },
    pieChartData: pieChartData[]
}

export type pieChartData = {
    count: number,
    category: string
}