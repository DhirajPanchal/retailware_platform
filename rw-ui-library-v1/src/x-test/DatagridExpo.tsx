import { format } from "date-fns";
import type { Column } from "../v1/component/datagrid/Datagrid01";
import Datagrid01 from "../v1/component/datagrid/Datagrid01";

interface User {
  id: number;
  name: string;
  age: number;
  joined: Date;
}

export const DatagridExpo = () => {
  const data: User[] = [
    { id: 1, name: "Alice", age: 30, joined: new Date("2023-01-15") },
    { id: 2, name: "Bob", age: 25, joined: new Date("2022-11-05") },
    { id: 3, name: "Charlie", age: 35, joined: new Date("2023-03-22") },
  ];

  const columns: Column<User>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true, filterable: true },
    { key: "age", label: "Age", sortable: true, filterable: true },
    {
      key: "joined",
      label: "Date Joined",
      sortable: true,
      filterable: true,
      cellRenderer: (value) => format(value, "MMM dd, yyyy"),
    },
  ];

  return (
    <div className="p-4">
      <Datagrid01<User> data={data} columns={columns} theme={false} />
    </div>
  );
};
