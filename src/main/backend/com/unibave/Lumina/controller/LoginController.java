package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Usuario.UsuarioMapper;
import com.unibave.Lumina.DTOs.Usuario.UsuarioRespostaDTO;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequestMapping("/login")
class LoginController {

    @Autowired
    private final LoginService loginService;
    private final UsuarioMapper usuarioMapper;

    public LoginController(LoginService loginService, UsuarioMapper usuarioMapper) {
        this.loginService = loginService;
        this.usuarioMapper = usuarioMapper;
    }

    @GetMapping("/logar")
    @Operation(summary = "Logar no sistema", description = "Loga no sistema caso o email e senha estejam corretos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login bem sucedido"),
            @ApiResponse(responseCode = "404", description = "Login mal sucedido")
    })
    public ResponseEntity<Optional<UsuarioRespostaDTO>> Login(
            @RequestParam String email,
            @RequestParam String senha) {
            Optional<Usuario> usuario = loginService.login(email, senha);
            if (usuario.isPresent()) {
                return ResponseEntity.ok(Optional.ofNullable(usuarioMapper.toDto(usuario.orElse(null))));
            }else  {
                return ResponseEntity.status(HttpStatus.valueOf(404)).body(Optional.empty());
            }
    }
}
