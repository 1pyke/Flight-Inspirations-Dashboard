import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  MouseEvent,
  ChangeEvent,
} from "react";
import { Container, Box, Typography, Fade } from "@mui/material";
import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableCell,
  SearchInput,
  InputCell,
} from "../StyledComponents/StyledComponents";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { DateCell } from "../DateCell/DateCell";
import TableFooter from "../TableFooter/TableFooter";
import {
  getTableCellDisplayValue,
  formatColumnHeaderText,
} from "../../utils/tableUtils";
import { TableProps } from "./FlightTable.type";
import "./FlightTable.style.css";

const dateCells = ["departureDate", "returnDate"];

const FlightTable = ({
  data,
  editedCells,
  updateCell,
  saveChanges,
  debouncedFilter,
}: TableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderedColumns, setOrderedColumns] = useState<string[]>(
    Object.keys(data[0] || {}).filter((key) => key !== "originalIndex")
  );

  const handleChangePage = useCallback(
    (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const handleColumnDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      setOrderedColumns((prev) => [...prev]);
      return;
    }
    setOrderedColumns((prev) => {
      const newColumns = Array.from(prev);
      const [reorderedItem] = newColumns.splice(result.source.index, 1);
      newColumns.splice(result.destination!.index, 0, reorderedItem);
      return newColumns;
    });
  }, []);

  const hasEmptyCell = useMemo(
    () =>
      data.some((row) =>
        orderedColumns.some(
          (col) => getTableCellDisplayValue(row, col).trim() === ""
        )
      ),
    [data, orderedColumns]
  );

  const handleSearchInputChange = useCallback(
    (column: string) => (e: ChangeEvent<HTMLInputElement>) => {
      debouncedFilter(column, e.target.value);
      if (page) setPage(0);
    },
    [debouncedFilter, page]
  );

  const handleDateCellChange = useCallback(
    (rowIndex: number, column: string) => (value: string) => {
      updateCell(rowIndex, column, value);
    },
    [updateCell]
  );

  const handleInputCellChange = useCallback(
    (rowIndex: number, column: string) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        updateCell(rowIndex, column, e.target.value);
      },
    [updateCell]
  );

  useEffect(() => {
    if (data.length > 0 && orderedColumns.length === 0) {
      const columns = Object.keys(data[0]).filter(
        (key) => key !== "originalIndex"
      );
      setOrderedColumns(columns);
    }
  }, [data, orderedColumns.length]);

  return (
    <>
      <Container maxWidth="xl" className="table-container-root">
        <Box className="table-header-box">
          <Box className="table-header-title-box">
            <Typography variant="h3" component="h3" className="table-title">
              Flight Results :
            </Typography>
          </Box>

          {data.length > 0 && (
            <Box className="table-chip-box">
              <Typography
                variant="body1"
                component="p"
                color="text.secondary"
                className="table-currency-text"
                sx={{ fontSize: "1.25rem", fontWeight: 600 }}
              >
                {`${data.length} Flight`}
              </Typography>
              {editedCells.size > 0 && (
                <Typography
                  variant="body2"
                  color="warning"
                  className="table-currency-text"
                >
                  {`${editedCells.size} Unsaved Changes`}
                </Typography>
              )}
            </Box>
          )}
        </Box>
        <Fade in={true} timeout={800}>
          <Box className="table-content-box">
            <TableContainer>
              <StyledTable className="table-fixed-layout">
                <DragDropContext onDragEnd={handleColumnDragEnd}>
                  <thead>
                    <Droppable
                      droppableId="table-columns"
                      direction="horizontal"
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="table-header-row"
                        >
                          {orderedColumns.map((column, index) => (
                            <Draggable
                              key={column}
                              draggableId={column}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                const columnWidth = `${
                                  100 / orderedColumns.length
                                }%`;
                                return (
                                  <TableHeader
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={
                                      snapshot.isDragging
                                        ? "dragging-header"
                                        : ""
                                    }
                                    style={{
                                      ...provided.draggableProps.style,
                                      width: columnWidth,
                                      minWidth: columnWidth,
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    {formatColumnHeaderText(column)}
                                    <SearchInput
                                      id={column}
                                      placeholder={`Search ${formatColumnHeaderText(
                                        column
                                      )}`}
                                      onChange={handleSearchInputChange(column)}
                                      aria-label={`Search ${formatColumnHeaderText(
                                        column
                                      )}`}
                                    />
                                  </TableHeader>
                                );
                              }}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </tr>
                      )}
                    </Droppable>
                  </thead>

                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <TableCell colSpan={orderedColumns.length}>
                          <Box className="table-empty-box">
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              No flights found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Try adjusting your search parameters
                            </Typography>
                          </Box>
                        </TableCell>
                      </tr>
                    ) : (
                      data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {orderedColumns.map((column, columnIndex) => {
                              const columnWidth = `${
                                100 / orderedColumns.length
                              }%`;
                              return (
                                <TableCell
                                  key={`${row.originalIndex}-${column}`}
                                  isEdited={editedCells.has(
                                    `${row.originalIndex}-${column}`
                                  )}
                                  style={{
                                    width: columnWidth,
                                    minWidth: columnWidth,
                                    maxWidth: columnWidth,
                                    boxSizing: "border-box",
                                  }}
                                  isEmptied={
                                    getTableCellDisplayValue(
                                      row,
                                      column
                                    ).trim() === ""
                                  }
                                >
                                  {dateCells.includes(column) ? (
                                    <DateCell
                                      value={getTableCellDisplayValue(
                                        row,
                                        column
                                      )}
                                      onChange={handleDateCellChange(
                                        row.originalIndex,
                                        column
                                      )}
                                      ariaLabel={`${formatColumnHeaderText(
                                        column
                                      )} for row ${rowIndex + 1}`}
                                    />
                                  ) : (
                                    <InputCell
                                      id={`${rowIndex}-${columnIndex}`}
                                      value={getTableCellDisplayValue(
                                        row,
                                        column
                                      )}
                                      onChange={handleInputCellChange(
                                        row.originalIndex,
                                        column
                                      )}
                                      aria-label={`${formatColumnHeaderText(
                                        column
                                      )} for row ${rowIndex + 1}`}
                                    />
                                  )}
                                </TableCell>
                              );
                            })}
                          </tr>
                        ))
                    )}
                  </tbody>
                </DragDropContext>
              </StyledTable>
            </TableContainer>
          </Box>
        </Fade>
        <TableFooter
          editedCells={editedCells}
          hasEmptyCell={hasEmptyCell}
          saveChanges={saveChanges}
          dataLength={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
};

export default memo(FlightTable);
