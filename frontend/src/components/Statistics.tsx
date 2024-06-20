import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Data, Months } from "@/lib/types";

type statisticsProps = {
  data: Data["statisticsData"];
  month: Months
};

export const Statistics = ({ data, month }: statisticsProps) => {
  return (
    <Card className="border-2 border-orange-600 w-[40vw] text-center">
      {data ? (
        <>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription className="text-bold">Overall Stats of the month: {month}</CardDescription>
          </CardHeader>
          <CardContent>
            <p> Total Sale ➡️ 💲{data.totalRevenue} </p>
          </CardContent>
          <CardContent>
            <p>Total sold item ➡️ {data.totalSoldItems} </p>
          </CardContent>
          <CardContent>
            <p>Total not sole items ➡️ {data.totalUnsoldItems} </p>
          </CardContent>
        </>
      ) : (
        <p> Fetching...</p>
      )}
    </Card>
  );
};
