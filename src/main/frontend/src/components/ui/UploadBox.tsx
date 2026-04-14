import { ArquivoMeta } from '../../core/types';

export function UploadBox({
  arquivos,
  onUpload,
  onDelete,
}: {
  arquivos: ArquivoMeta[];
  onUpload: (file: File) => void;
  onDelete: (arquivoId: number) => void;
}) {
  return (
    <div className="upload-box">
      <label className="upload-trigger">
        Adicionar arquivo
        <input
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
          }}
          type="file"
        />
      </label>
      <ul className="file-list">
        {arquivos.map((arquivo) => (
          <li key={arquivo.id}>
            <span>{arquivo.nmArquivo}</span>
            <button className="ghost-btn danger small" onClick={() => onDelete(arquivo.id)} type="button">
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
