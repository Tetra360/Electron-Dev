import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableTab = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Table>
        <TableCaption>最近の請求書の一覧です。</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">請求書</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>方法</TableHead>
            <TableHead className="text-right">金額</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>支払い済み</TableCell>
            <TableCell>クレジットカード</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableTab;
