package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Login.LoginRespostaDTO;
import com.unibave.Lumina.DTOs.Usuario.UsuarioLoginDTO;
import com.unibave.Lumina.DTOs.Usuario.UsuarioMapper;
import com.unibave.Lumina.DTOs.Usuario.UsuarioRespostaDTO;
import com.unibave.Lumina.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticação", description = "Endpoints para autenticação de usuários")
@Slf4j
public class LoginController {

    private final LoginService loginService;
    private final UsuarioMapper usuarioMapper;

    public LoginController(LoginService loginService, UsuarioMapper usuarioMapper) {
        this.loginService = loginService;
        this.usuarioMapper = usuarioMapper;
    }

    @PostMapping("/login")
    @Operation(summary = "Realizar login", description = "Autentica um usuário no sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas"),
            @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos")
    })
    public ResponseEntity<LoginRespostaDTO> login(@Valid @RequestBody UsuarioLoginDTO usuarioLoginDTO) {

        return loginService.login(usuarioLoginDTO.getEmail(), usuarioLoginDTO.getSenha())
                .map(resposta -> ResponseEntity.ok(resposta))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}