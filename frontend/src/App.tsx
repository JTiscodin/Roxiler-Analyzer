import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "./App.css";
import { Input } from "./components/ui/input";
import { DataTable } from "./components/DataTable";
import { Data, Months } from "./lib/types";
import { BarChart } from "./components/BarChart";
import { PieChart } from "./components/PieChart";
import { useDebounce } from "./hooks/DebounceHook";
import { Statistics } from "./components/Statistics";
function App() {
  const BACKEND_URL : string = import.meta.env.VITE_BACKEND_URL

  const [search, setSearch] = useState<string>("");
  
  const [data, setData] = useState<Data>();
  
  const [month, setMonth] = useState<Months>(Months.March);
  
  const [page] = useState<string>("1");
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        BACKEND_URL +
        page +
        "&search=" +
        search +
        "&month=" +
        month
      );
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };
  
  const debouncedFetch = useDebounce(fetchData, 200);
  
  useEffect(() => {
    debouncedFetch();
    console.log(import.meta.env);
  }, [search, month, page]);

  return (
    <div className="min-h-screen w-screen gap-10 flex items-center justify-center flex-col">
      <h1 className="text-4xl mt-6 bg-orange-700 text-white p-6 rounded-3xl">
        {" "}
        Transaction Dashboard{" "}
      </h1>
      <div className="flex justify-evenly w-[80vw]">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[20vw]"
          placeholder="Search"
        />
        <Select defaultValue={month} onValueChange={(month:Months) => setMonth(month)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(Months).map(([key, value]) => (
              <SelectItem key={value} value={value}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTable data={data?.filteredData} />
      <div className="flex gap-6">
        <BarChart data={data?.barChartData} month={month} />
        <PieChart data={data?.pieChartData} month={month} />
      </div>
      <Statistics data={data?.statisticsData} month={month} />
    </div>
  );
}

export default App;
