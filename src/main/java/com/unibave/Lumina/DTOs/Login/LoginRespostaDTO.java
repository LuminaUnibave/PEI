package com.unibave.Lumina.DTOs.Login;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRespostaDTO {
    private String token;
    private String tipo;
    private Long usuarioId;
    private String email;
    private String nome;

    public LoginRespostaDTO(String token, Long usuarioId, String email, String nome) {
        this.token = token;
        this.tipo = "Bearer";
        this.usuarioId = usuarioId;
        this.email = email;
        this.nome = nome;
    }
}