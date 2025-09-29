import { DataTable } from "./data-table/DataTable";
import { columns, Payment } from "./data-table/columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "2",
      amount: 250,
      status: "processing",
      email: "awtgaaf@example.com",
    },
    {
      id: "3",
      amount: 450,
      status: "success",
      email: "john.doe@example.com",
    },
    {
      id: "4",
      amount: 320,
      status: "failed",
      email: "jane.smith@example.com",
    },
    {
      id: "5",
      amount: 800,
      status: "success",
      email: "contact@company.com",
    },
    {
      id: "6",
      amount: 150,
      status: "pending",
      email: "random.user@example.com",
    },
    {
      id: "7",
      amount: 600,
      status: "processing",
      email: "sample@test.com",
    },
    {
      id: "8",
      amount: 1200,
      status: "success",
      email: "billing@corp.com",
    },
    {
      id: "9",
      amount: 90,
      status: "failed",
      email: "error.case@example.com",
    },
    {
      id: "10",
      amount: 500,
      status: "pending",
      email: "another.one@example.com",
    },
  ];
}

import { useEffect, useState } from "react";

const DataTableTab = () => {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DataTableTab;
