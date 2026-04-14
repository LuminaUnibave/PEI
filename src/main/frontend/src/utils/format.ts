export function formatDate(value?: string) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('pt-BR');
}

export function formatDateTime(value?: string) {
  if (!value) return '-';
  return new Date(value).toLocaleString('pt-BR');
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const safePage = Math.max(page, 1);
  const safePageSize = Math.max(pageSize, 1);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * safePageSize;
  const end = start + safePageSize;

  return {
    pageItems: items.slice(start, end),
    currentPage,
    total,
    totalPages,
    start: total ? start + 1 : 0,
    end: Math.min(end, total),
  };
}
