import React, { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItemMUI from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  type GridColumnVisibilityModel,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  FunnelIcon,
  FunnelXIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import {
  DG_COLUMNS_VIEWER,
  generateViewerData,
} from "../model/column-defination";
import type { MdlChangeEvent } from "../model/data.model";

const filterOperators = ["contains", "equals", "startsWith", "endsWith"];
const dateOperators = ["equals", "before", "after"];

function applyFilters(
  data: MdlChangeEvent[],
  filters: Record<string, { value: any; operator: string }>
) {
  return data.filter((row) =>
    Object.entries(filters).every(([field, { value, operator }]) => {
      if (value === null || value === "") return true;
      const fieldValue = row[field as keyof MdlChangeEvent];
      if (fieldValue === undefined || fieldValue === null) return false;

      const isDateField =
        Object.prototype.toString.call(fieldValue) === "[object Date]" ||
        !isNaN(Date.parse(fieldValue as any));

      if (isDateField) {
        const rowDate = new Date(fieldValue);
        const filterDate = new Date(value);
        if (isNaN(rowDate.getTime()) || isNaN(filterDate.getTime()))
          return false;

        switch (operator) {
          case "equals":
            return rowDate.toDateString() === filterDate.toDateString();
          case "before":
            return rowDate < filterDate;
          case "after":
            return rowDate > filterDate;
          default:
            return false;
        }
      }

      const valStr = String(fieldValue).toLowerCase();
      const filterStr = String(value).toLowerCase();

      switch (operator) {
        case "contains":
          return valStr.includes(filterStr);
        case "equals":
          return valStr === filterStr;
        case "startsWith":
          return valStr.startsWith(filterStr);
        case "endsWith":
          return valStr.endsWith(filterStr);
        default:
          return true;
      }
    })
  );
}

export default function MdlDataGrid01() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(
      Object.fromEntries(DG_COLUMNS_VIEWER.map((col) => [col.field, true]))
    );
  const [filters, setFilters] = useState<
    Record<string, { value: any; operator: string }>
  >({});
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const rawData = generateViewerData();
  const filteredData = applyFilters(rawData, filters);
  const totalPages = Math.ceil(filteredData.length / paginationModel.pageSize);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ height: 500, width: "100%" }}>
        {/* Top Toolbar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          {/* Filter/Settings Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton onClick={(e) => setFilterAnchorEl(e.currentTarget)}>
              <FunnelIcon />
            </IconButton>
            <IconButton onClick={() => setFilters({})}>
              <FunnelXIcon />
            </IconButton>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <SettingsIcon />
            </IconButton>
          </Box>

          {/* Pagination Controls */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton
              onClick={() =>
                setPaginationModel((prev) => ({
                  ...prev,
                  page: Math.max(0, prev.page - 1),
                }))
              }
              disabled={paginationModel.page === 0}
            >
              <ChevronLeftIcon size={18} />
            </IconButton>
            <Typography variant="body2">
              Page {paginationModel.page + 1} of {totalPages || 1}
            </Typography>
            <IconButton
              onClick={() =>
                setPaginationModel((prev) => ({
                  ...prev,
                  page: Math.min(totalPages - 1, prev.page + 1),
                }))
              }
              disabled={paginationModel.page >= totalPages - 1}
            >
              <ChevronRightIcon size={18} />
            </IconButton>
            <Select
              size="small"
              value={paginationModel.pageSize}
              onChange={(e) =>
                setPaginationModel({
                  pageSize: Number(e.target.value),
                  page: 0,
                })
              }
              sx={{ minWidth: 100 }}
            >
              {[10, 20, 1000].map((size) => (
                <MenuItemMUI key={size} value={size}>
                  {size === 1000 ? "All" : `${size} rows`}
                </MenuItemMUI>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Filter Panel */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={() => setFilterAnchorEl(null)}
          PaperProps={{ sx: { width: 500, bgcolor: "#f3f4f6", p: 2 } }}
        >
          {DG_COLUMNS_VIEWER.filter((col) => col.filterable !== false).map(
            (col) => (
              <MenuItem
                key={col.field}
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {col.type === "date" ? (
                  <>
                    <DatePicker
                      label={col.headerName}
                      value={filters[col.field]?.value || null}
                      onChange={(newValue) =>
                        setFilters((prev) => ({
                          ...prev,
                          [col.field]: {
                            value: newValue,
                            operator: prev[col.field]?.operator || "equals",
                          },
                        }))
                      }
                      slotProps={{
                        textField: { size: "small", sx: { flex: 1 } },
                      }}
                    />
                    <Select
                      size="small"
                      value={filters[col.field]?.operator || "equals"}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [col.field]: {
                            value: prev[col.field]?.value || null,
                            operator: e.target.value,
                          },
                        }))
                      }
                      sx={{ minWidth: 120 }}
                    >
                      {dateOperators.map((op) => (
                        <MenuItemMUI key={op} value={op}>
                          {op}
                        </MenuItemMUI>
                      ))}
                    </Select>
                  </>
                ) : (
                  <>
                    <TextField
                      size="small"
                      label={col.headerName}
                      value={filters[col.field]?.value || ""}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [col.field]: {
                            value: e.target.value,
                            operator: prev[col.field]?.operator || "contains",
                          },
                        }))
                      }
                      sx={{ flex: 1 }}
                    />
                    <Select
                      size="small"
                      value={filters[col.field]?.operator || "contains"}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [col.field]: {
                            value: prev[col.field]?.value || "",
                            operator: e.target.value,
                          },
                        }))
                      }
                      sx={{ minWidth: 120 }}
                    >
                      {filterOperators.map((op) => (
                        <MenuItemMUI key={op} value={op}>
                          {op}
                        </MenuItemMUI>
                      ))}
                    </Select>
                  </>
                )}
              </MenuItem>
            )
          )}
        </Menu>

        {/* Column Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {DG_COLUMNS_VIEWER.map((col) => (
            <MenuItem
              key={col.field}
              onClick={() =>
                setColumnVisibilityModel((prev) => ({
                  ...prev,
                  [col.field]: !prev[col.field],
                }))
              }
            >
              <Checkbox checked={columnVisibilityModel[col.field] !== false} />
              {col.headerName}
            </MenuItem>
          ))}
        </Menu>

        {/* DataGrid */}
        <DataGrid
          rows={filteredData}
          columns={DG_COLUMNS_VIEWER}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={setColumnVisibilityModel}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          density="compact"
          hideFooter
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
          }
          showColumnVerticalBorder
          showCellVerticalBorder
          pageSizeOptions={[10, 20, 1000]}
          sx={{
            "& .MuiDataGrid-cell--editable": {
              bgcolor: "#e0f7fa",
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
