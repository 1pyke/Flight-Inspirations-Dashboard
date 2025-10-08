import React, { memo } from "react";
import { Box, Typography, TablePagination, Fade, Chip } from "@mui/material";
import { Save, Warning, CheckCircle, Edit } from "@mui/icons-material";
import { SaveButton } from "../StyledComponents/StyledComponents";
import { TableFooterProps } from "./TableFooter.type";
import "./TableFooter.style.css";

const TableFooter: React.FC<TableFooterProps> = ({
  editedCells,
  hasEmptyCell,
  saveChanges,
  dataLength,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Fade in={true} timeout={800}>
      <Box className="table-footer">
        <Box className="table-footer-actions">
          <SaveButton
            onClick={saveChanges}
            disabled={editedCells.size === 0 || hasEmptyCell}
          >
            {hasEmptyCell ? "Fill Cells" : "Save Changes"}
          </SaveButton>

          {hasEmptyCell && (
            <Box className="table-footer-warning">
              <Warning className="warning-icon" />
              <Typography variant="body2" className="warning-text">
                All fields are required. Please fill them in before saving.
              </Typography>
            </Box>
          )}
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          className="table-footer-pagination"
        />
      </Box>
    </Fade>
  );
};

export default memo(TableFooter);
