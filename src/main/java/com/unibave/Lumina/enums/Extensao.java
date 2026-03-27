package com.unibave.Lumina.enums;

import lombok.Getter;

@Getter
public enum Extensao {
    ERRO("ERRO", "application/octet-stream"),
    PDF("PDF", "application/pdf"),
    TXT("TXT", "text/plain"),
    DOC("DOC", "application/msword"),
    DOCX("DOCX", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
    JPG("JPG", "image/jpeg"),
    JPEG("JPEG", "image/jpeg"),
    PNG("PNG", "image/png"),
    GIF("GIF", "image/gif"),
    ZIP("ZIP", "application/zip"),
    RAR("RAR", "application/vnd.rar"),
    XLS("XLS", "application/vnd.ms-excel"),
    XLSX("XLSX", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
    MP4("MP4", "video/mp4"),
    AVI("AVI", "video/x-msvideo"),
    MP3("MP3", "audio/mpeg");

    private final String extensao;
    private final String mimeType;

    Extensao(String extensao, String mimeType) {
        this.extensao = extensao;
        this.mimeType = mimeType;
    }

    /**
     * Obtém a extensão a partir do nome do arquivo
     */
    public static Extensao fromNomeArquivo(String nomeArquivo) {
        if (nomeArquivo == null || nomeArquivo.trim().isEmpty()) {
            return ERRO;
        }

        int index = nomeArquivo.lastIndexOf(".");
        if (index <= 0) {
            return ERRO;
        }

        String extensaoStr = nomeArquivo.substring(index + 1).toUpperCase();

        try {
            return Extensao.valueOf(extensaoStr);
        } catch (IllegalArgumentException e) {
            return ERRO;
        }
    }

    /**
     * Verifica se a extensão é de imagem
     */
    public boolean isImagem() {
        return this == JPG || this == JPEG || this == PNG || this == GIF;
    }

    /**
     * Verifica se a extensão é de documento
     */
    public boolean isDocumento() {
        return this == PDF || this == TXT || this == DOC || this == DOCX ||
                this == XLS || this == XLSX;
    }

    /**
     * Verifica se a extensão é de áudio/vídeo
     */
    public boolean isMidia() {
        return this == MP4 || this == AVI || this == MP3;
    }

    /**
     * Verifica se a extensão é de arquivo compactado
     */
    public boolean isCompactado() {
        return this == ZIP || this == RAR;
    }
}