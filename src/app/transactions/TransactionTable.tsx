import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

export function TransactionTable(){
    return(
        <Table>
            <TableRow>
                <TableHead className="text-secondary">Typ</TableHead>
                <TableHead className="text-secondary">Kategori</TableHead>
                <TableHead className="text-secondary">Kostnad</TableHead>
                <TableHead className="text-secondary">Datum</TableHead>
            </TableRow>
        </Table>
    )
}