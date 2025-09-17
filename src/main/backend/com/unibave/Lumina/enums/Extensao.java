package com.unibave.Lumina.enums;

import com.unibave.Lumina.model.entidades.Arquivo;
import lombok.Getter;

@Getter
public enum Extensao {
    ERRO("ERRO"),
    PDF("application/pdf"),
    TXT("text/plain"),
    DOC("application/msword"),
    JPG("image/jpeg"),
    JPEG("image/jpeg");

    private final String mimeType;

    Extensao(String mimeType) {
        this.mimeType = mimeType;
    }
}
