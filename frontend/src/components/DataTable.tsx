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
  let headings;
  if (data?.response.length > 0) headings = Object.keys(data?.response[0]);

  return (
    <ScrollArea className="w-[80vw] h-[85vh] border-2 overflow-hidden  border-orange-600 rounded-2xl">
      <Table>
        <TableCaption>List of all the products.</TableCaption>
        {data?.response.length !== 0 ? (
          <>
            <TableHeader>
              <TableRow>
                {headings
                  ? headings.map((e) => {
                      return (
                        <TableHead key={e} className="w-[100px]">
                          {e}
                        </TableHead>
                      );
                    })
                  : ""}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data ? (
                data.response.map((e) => {
                  return (
                    <TableRow key={e.id}>
                      {headings.map((heading) => (
                        <TableCell key={heading} className="font-medium">
                          {heading === "image" ? (
                            <img src={e[heading]} />
                          ) : heading === "sold" ? (
                            e[heading] ? (
                              "Yes"
                            ) : (
                              "No"
                            )
                          ) : (
                            e[heading]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>Loading</TableRow>
              )}
            </TableBody>
          </>
        ) : (
          <TableRow className="text-center font-extrabold text-4xl">No Content Found</TableRow>
        )}
      </Table>
    </ScrollArea>
  );
};
