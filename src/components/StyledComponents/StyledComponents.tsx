import styled from "@emotion/styled";

export const TableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  padding-top: 24px;
  border-radius: 16px 16px 0px 0px;
`;

export const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  background: var(--color-white);
  border-radius: 16px 16px 0px 0px;
  overflow: hidden;
  min-width: 50rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);
`;

export const TableHeader = styled.th`
  background: var(--color-brand-teal);
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-primary-contrast);
  border-bottom: 2px solid var(--color-grey-200);
  cursor: grab;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-brand-teal-hover);
  }

  &:active {
    cursor: grabbing;
  }

  &:first-of-type {
    border-top-left-radius: 16px;
  }

  &:last-of-type {
    border-top-right-radius: 16px;
  }

  &:not(:last-of-type) {
    border-right: 1px solid var(--color-grey-200);
  }
`;

export const TableCell = styled.td<{
  isEdited?: boolean;
  isEmptied?: boolean;
  colSpan?: number;
  minWidth?: string | null;
}>`
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-grey-100);
  background: ${({ isEmptied, isEdited }) =>
    isEmptied
      ? "var(--color-cell-emptied)"
      : isEdited
      ? "var(--color-cell-edited)"
      : "var(--color-bg-paper)"};
  text-align: center;
  min-width: ${({ minWidth }) => minWidth || "auto"};
  transition: all 0.3s ease;
  position: relative;

  &:not(:last-of-type) {
    border-right: 1px solid var(--color-grey-100);
  }

  tr:last-child & {
    border-bottom: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  font-size: 0.875rem;
  background: var(--color-white);
  color: var(--color-text-primary);
  margin-top: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary-main);
    box-shadow: 0 0 0 3px var(--color-primary-shadow);
  }

  &:hover {
    border-color: var(--color-grey-300);
  }

  &::placeholder {
    color: var(--color-grey-400);
    font-size: 0.8rem;
  }
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  background: var(--gradient-teal);
  color: var(--color-white);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  min-width: 160px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    background: var(--gradient-teal-hover);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  &:disabled {
    background: var(--gradient-disabled);
    color: var(--color-grey-disabled-text);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const InputCell = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  padding: 8px 12px;
  font-size: 0.9rem;
  color: var(--color-text-primary);
  outline: none;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:focus {
    outline: 2px solid var(--color-primary-main);
    outline-offset: -2px;
    background: var(--color-primary-alpha-light);
  }

  &:hover {
    background: var(--color-primary-alpha-medium);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;
