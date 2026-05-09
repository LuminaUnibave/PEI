import { ReactNode } from 'react';

type FeatureTableRow = {
  key: string | number;
  cells: ReactNode[];
};

type FeatureTableProps = {
  columns: string[];
  rows: FeatureTableRow[];
  carregando: boolean;
  loadingText: string;
  emptyText: string;
};

export function FeatureTable({
  columns,
  rows,
  carregando,
  loadingText,
  emptyText,
}: FeatureTableProps) {
  if (carregando) {
    return <p>{loadingText}</p>;
  }

  if (!rows.length) {
    return <p>{emptyText}</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              {row.cells.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
