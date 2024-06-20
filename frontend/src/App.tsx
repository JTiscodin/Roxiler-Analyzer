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
import { Item, Months } from "./lib/types";

function App() {
  const [search, setSearch] = useState<string>("");

  const [data, setData] = useState<{ page: number; response: Item[] }>();

  const [month, setMonth] = useState(Months.March);

  const [page, setPage] = useState<string>("1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/statistics?page=" +
            page +
            "&search=" +
            search +
            "&month=" +
            month
        );
        const data = await response.json();
        setData(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [search, month, page]);

  return (
    <div className="min-h-screen w-screen gap-10 flex items-center justify-center flex-col">
      <h1 className="text-green-700"> Hello there </h1>
      <div className="flex justify-evenly w-[80vw]">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[20vw]"
          placeholder="Search"
        />
        <Select defaultValue={month} onValueChange={(month) => setMonth(month)}>
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
      <DataTable data={data} />
    </div>
  );
}

export default App;
