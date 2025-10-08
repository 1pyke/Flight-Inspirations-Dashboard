import {
  COLUMN_MIN_WIDTHS,
  OBJECT_VALUE_SEPARATOR,
  PRICE_FIELD,
  TOTAL_FIELD,
} from "../constants";
import { TableData } from "../types/tableTypes";

export const getTableCellDisplayValue = (
  row: TableData,
  columnKey: string
): string => {
  const cellValue = row[columnKey as keyof TableData];

  if (typeof cellValue === "string") {
    return cellValue;
  }

  if (typeof cellValue === "object" && cellValue !== null) {
    if (columnKey === PRICE_FIELD && TOTAL_FIELD in cellValue) {
      return cellValue.total;
    }

    const objectValues = Object.values(cellValue).map((value) => String(value));
    return objectValues.join(OBJECT_VALUE_SEPARATOR);
  }

  return String(cellValue);
};


export const formatColumnHeaderText = (text: string): string => {
  return text
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatNameToTitleCase = (name: string): string => {
  return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getColumnMinimumWidth = (columnKey: string): string => {
  return COLUMN_MIN_WIDTHS[columnKey as keyof typeof COLUMN_MIN_WIDTHS];
};

export const isTableCellEmpty = (row: TableData, columnKey: string): boolean => {
  return getTableCellDisplayValue(row, columnKey).trim() === "";
};

export const hasAnyEmptyCells = (
  data: TableData[],
  columns: string[]
): boolean => {
  return data.some((row) => columns.some((column) => isTableCellEmpty(row, column)));
};

export const getTableColumnKeys = (
  data: TableData[],
  excludeColumns: string[] = ["originalIndex"]
): string[] => {
  if (data.length === 0) return [];

  return Object.keys(data[0]).filter((key) => !excludeColumns.includes(key));
};

export type ColumnKey = keyof typeof COLUMN_MIN_WIDTHS;
export type TableUtilsConfig = {
  priceField: string;
  totalField: string;
  separator: string;
};

export const TABLE_UTILS_CONFIG: TableUtilsConfig = {
  priceField: PRICE_FIELD,
  totalField: TOTAL_FIELD,
  separator: OBJECT_VALUE_SEPARATOR,
};
