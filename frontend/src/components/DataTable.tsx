import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Item } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type TableProps = {
  data?: {
    response: Item[];
    page: number;
  };
};

export const DataTable = ({ data }: TableProps) => {
  const headings: (keyof Item)[] = data?.response.length ? Object.keys(data.response[0]) as (keyof Item)[] : [];

  return (
    <ScrollArea className="w-[80vw] h-[85vh] border-2 overflow-hidden border-orange-600 rounded-2xl">
      <Table>
        <TableCaption>List of all the products.</TableCaption>
        {data?.response.length ? (
          <>
            <TableHeader>
              <TableRow>
                {headings.map((heading) => (
                  <TableHead key={heading} className="w-[100px]">
                    {String(heading)}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.response.map((item) => (
                <TableRow key={item.id}>
                  {headings.map((heading) => (
                    <TableCell key={heading} className="font-medium">
                      {heading === "image" ? (
                        <img src={item[heading] as string} alt={`Product ${item.id}`} />
                      ) : heading === "sold" ? (
                        item[heading] ? "Yes" : "No"
                      ) : (
                        String(item[heading])
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </>
        ) : (
          <TableRow>
            <TableCell colSpan={headings.length} className="text-center font-extrabold text-4xl">
              {data?.response.length === 0 ? "No Content Found" : "Loading"}
            </TableCell>
          </TableRow>
        )}
      </Table>
    </ScrollArea>
  );
};