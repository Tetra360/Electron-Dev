import { columns, Order } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/DataTable";
import db from "../../data/db.json";

async function getData(): Promise<Order[]> {
  // db.jsonの内容を返す
  return db;
}

import { useEffect, useState } from "react";

const DataTableTab = () => {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DataTableTab;
