import React, { useState } from 'react';
import DataGrid from 'react-data-grid';
import * as formula from 'formulajs';

const ExcelSheet = () => {
  const [columns, setColumns] = useState([
    // Initial columns
    { key: 'A', name: 'A', editable: true },
    { key: 'B', name: 'B', editable: true },
    // Add more columns as needed
  ]);

  const [rows, setRows] = useState([
    // Initial rows
    { A: 1, B: 2 },
    { A: 3, B: 4 },
    // Add more rows as needed
  ]);

  // Function to handle cell edits
  const handleCellEdit = ({ cellKey, rowIdx, updated }) => {
    const newRows = [...rows];
    newRows[rowIdx] = { ...newRows[rowIdx], [cellKey]: updated[cellKey] };

    // Evaluate formulas in the updated row
    const updatedRow = evaluateFormulas(newRows[rowIdx], newRows);
    newRows[rowIdx] = updatedRow;

    setRows(newRows);
  };

  // Function to evaluate formulas in a row
  const evaluateFormulas = (row, allRows) => {
    const updatedRow = { ...row };

    columns.forEach((column) => {
      if (column.formula) {
        const formulaResult = evaluateFormula(column.formula, updatedRow, allRows);
        updatedRow[column.key] = formulaResult;
      }
    });

    return updatedRow;
  };

  // Function to evaluate a single formula
  const evaluateFormula = (formulaString, row, allRows) => {
    formula.Parser.setVariable('row', row);
    formula.Parser.setVariable('rows', allRows);

    const result = formula.Evaluator.evaluate(formulaString);
    return result;
  };

  // Function to add a new column
  const addColumn = () => {
    const newColumns = [
      ...columns,
      { key: String.fromCharCode(columns.length + 65), name: String.fromCharCode(columns.length + 65), editable: true },
    ];
    setColumns(newColumns);
  };

  // Function to add a new row
  const addRow = () => {
    const newRow = columns.reduce((acc, column) => ({ ...acc, [column.key]: 0 }), {});
    const newRows = [...rows, newRow];
    setRows(newRows);
  };

  return (
    <div>
      <button onClick={addColumn}>Add Column</button>
      <button onClick={addRow}>Add Row</button>
      <DataGrid
        columns={columns}
        rows={rows}
        onCellEdit={handleCellEdit}
      />
    </div>
  );
};

export default ExcelSheet;
