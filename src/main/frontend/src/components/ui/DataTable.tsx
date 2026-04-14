import { Pagination } from './Pagination';

export function DataTable({
  columns,
  rows,
  emptyText = 'Nenhum registro encontrado.',
  pagination,
}: {
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
  emptyText?: string;
  pagination?: React.ReactNode;
}) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>
      {pagination}
    </div>
  );
}

export { Pagination };
