import type { GridColDef } from "@mui/x-data-grid";
import type { MdlChangeEvent } from "./data.model";

import {
  randomAddress,
  randomCountry,
  randomCreatedDate,
  randomInt,
  randomTaxCode,
  randomTraderName,
} from "@mui/x-data-grid-generator";

export const DG_COLUMNS_VIEWER: GridColDef[] = [
  {
    headerName: "ID",
    field: "id",
    type: "number",
    width: 80,
    filterable: false,
  },
  {
    headerName: "Region",
    field: "region",
    type: "string",
    width: 120,
    filterable: false,
  },
  {
    headerName: "Site",
    field: "site",
    type: "string",
    width: 120,
    filterable: false,
  },
  { headerName: "Industry", field: "industry", type: "string", width: 120 },
  { headerName: "Method", field: "method", type: "string", width: 120 },
  {
    headerName: "Customer Id",
    field: "customer_id",
    type: "number",
    width: 100,
    filterable: false,
  },
  {
    headerName: "Customer Name",
    field: "customer_name",
    type: "string",
    width: 200,
  },
  {
    headerName: "Customer Legal Name",
    field: "customer_legal_name",
    type: "string",
    width: 200,
  },
  {
    headerName: "GID",
    field: "gid",
    type: "number",
    width: 100,
    filterable: false,
  },
  {
    headerName: "GRID",
    field: "grid",
    type: "number",
    width: 100,
    filterable: false,
  },
  {
    headerName: "Default Date",
    field: "default_date",
    type: "date",
    width: 120,
    editable: true,
  },
  {
    headerName: "Resolution Date",
    field: "resolution_date",
    type: "date",
    width: 120,
    editable: true,
  },
  {
    headerName: "Default Reason",
    field: "grp_default_reason_desc",
    type: "string",
    width: 120,
    editable: true,
  },
  {
    headerName: "Default Resolution Status",
    field: "grp_resolution_status_desc",
    type: "string",
    width: 120,
    editable: true,
  },
];

export const generateViewerData = () => {
  let columns: MdlChangeEvent[] = [];

  for (let index = 1; index <= 10; index++) {
    const name = randomTraderName();
    columns.push({
      id: index,
      region: randomCountry().label,
      site: randomAddress(),
      industry: "Industry " + index,
      method: "Method " + index,
      customer_name: name,
      customer_id: randomInt(1, 1000),
      customer_legal_name: name,
      gid: randomInt(1, 1000),
      grid: randomInt(1, 1000),
      default_date: randomCreatedDate(),
      resolution_date: randomCreatedDate(),
      grp_default_reason_desc: randomTaxCode(),
      grp_resolution_status_desc: randomTaxCode(),
    });
  }

  return columns;
};
