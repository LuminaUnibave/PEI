export function formatarData(data?: string) {
  if (!data) return '-';

  const [ano, mes, dia] = data.slice(0, 10).split('-');

  if (!ano || !mes || !dia) return data;

  return `${dia}/${mes}/${ano}`;
}

export function formatarDataHora(data?: string) {
  if (!data) return '-';

  const dataObj = new Date(data);
  if (Number.isNaN(dataObj.getTime())) return data;

  return dataObj.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}
