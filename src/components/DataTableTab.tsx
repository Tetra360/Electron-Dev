import db from "../../data/db.json";
import { DataTable } from "./data-table/DataTable";
import { columns, Order } from "./data-table/columns";

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
