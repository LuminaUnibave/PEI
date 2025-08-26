package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Usuario.UsuarioMapper;
import com.unibave.Lumina.DTOs.Usuario.UsuarioRequisicaoDTO;
import com.unibave.Lumina.DTOs.Usuario.UsuarioRespostaDTO;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final UsuarioMapper usuarioMapper;

    @Autowired
    public UsuarioController(UsuarioService usuarioService, UsuarioMapper usuarioMapper) {
        this.usuarioService = usuarioService;
        this.usuarioMapper = usuarioMapper;
    }

    //GETS
    @GetMapping("/buscar/id")
    @Operation(summary = "Buscar usuário por ID", description = "Retorna o usuário pelo seu identificador único")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "usuário encontrado"),
            @ApiResponse(responseCode = "404", description = "usuário não encontrado")
    })
    public ResponseEntity<Optional<UsuarioRespostaDTO>> buscarPorId(@RequestParam("id") Long id) {
        Usuario usuario = usuarioService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return ResponseEntity.ok(Optional.ofNullable(usuarioMapper.toDto(usuario)));
    }

    @GetMapping("/buscar/nome")
    @Operation(summary = "Buscar usuário(s) por nome", description = "Retorna o(s) usuário(s) pelo nome")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "usuário(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "usuário(s) não encontrado(s)")
    })
    public ResponseEntity<List<UsuarioRespostaDTO>> buscarPorNome(@RequestParam("nome") String nome) {
        List<Usuario> usuario = usuarioService.buscarPorNome(nome);
        return ResponseEntity.ok(Collections.singletonList(usuarioMapper.toDto((Usuario) usuario)));
    }

    @GetMapping("/buscar/situacao")
    @Operation(summary = "Buscar usuário(s) por situacao", description = "Retorna o(s) usuário(s) pela situação")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "usuário(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "usuário(s) não encontrado(s)")
    })
    public ResponseEntity<List<UsuarioRespostaDTO>> buscarPorSituacao(@RequestParam("situacao") Situacao situacao) {
        List<Usuario> usuario = usuarioService.buscarPorSituacao(situacao);
        return ResponseEntity.ok(Collections.singletonList(usuarioMapper.toDto((Usuario) usuario)));
    }

    @GetMapping("/buscar/email")
    @Operation(summary = "Buscar usuário(s) por email", description = "Retorna o(s) usuário(s) pelo email")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "usuário(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "usuário(s) não encontrado(s)")
    })
    public ResponseEntity<List<UsuarioRespostaDTO>> buscarPorEmail(@RequestParam("email") String email) {
        List<Usuario> usuario = usuarioService.buscarPorEmail(email);
        return ResponseEntity.ok(Collections.singletonList(usuarioMapper.toDto((Usuario) usuario)));
    }

    @GetMapping("/dtCadastro")
    @Operation(summary = "Buscar usuário(s) por data de cadastro", description = "Retorna o(s) usuário(s) pela data de cadastro")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "usuário(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "usuário(s) não encontrado(s)")
    })
    public ResponseEntity<List<UsuarioRespostaDTO>> buscarPorDtCadastro(@RequestParam("dtCadastro") LocalDateTime dtCadastro) {
        List<Usuario> usuario = usuarioService.buscarPorDtCadastro(dtCadastro);
        return ResponseEntity.ok(Collections.singletonList(usuarioMapper.toDto((Usuario) usuario)));
    }

    @GetMapping("/dtCadastro/antes")
    @Operation(summary = "Buscar usuário(s) por data de cadastro antes do período", description = "Retorna o(s) usuário(s) pela data de cadastro antes do período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "usuário(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "usuário(s) não encontrado(s)")
    })
    public ResponseEntity<List<UsuarioRespostaDTO>> buscarPorDtCadastroAntes(@RequestParam("antes") LocalDateTime antes) {
        List<Usuario> usuario = usuarioService.buscarPorDtCadastroAntes(antes);
        return ResponseEntity.ok(Collections.singletonList(usuarioMapper.toDto((Usuario) usuario)));
    }

    @GetMapping("/dtCadastro/depois")
    @Operation(summary = "Buscar usuário(s) por data de cadastro depois do período", description = "Retorna o(s) usuário(s) pela data de cadastro depois do período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "usuário(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "usuário(s) não encontrado(s)")
    })
    public ResponseEntity<List<UsuarioRespostaDTO>> buscarPorDtCadastroDepois(@RequestParam("depois")  LocalDateTime depois) {
        List<Usuario> usuario = usuarioService.buscarPorDtCadastroDepois(depois);
        return ResponseEntity.ok(Collections.singletonList(usuarioMapper.toDto((Usuario) usuario)));
    }

    @GetMapping("/dtCadastro/entre")
    @Operation(summary = "Buscar usuário(s) por data de cadastro dentre um período", description = "Retorna o(s) usuário(s) pela data de cadastro dentre um período")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "usuário(s) encontrado(s)"),
            @ApiResponse(responseCode = "404", description = "usuário(s) não encontrado(s)")
    })
    public ResponseEntity<List<UsuarioRespostaDTO>> buscarPorDtCadastroEntre(@RequestParam("depois") LocalDateTime depois, @RequestParam("antes") LocalDateTime antes) {
        List<Usuario> usuario = usuarioService.buscarPorDtCadastroEntre(depois, antes);
        return ResponseEntity.ok(Collections.singletonList(usuarioMapper.toDto((Usuario) usuario)));
    }

    //POST

    @PostMapping("/salvar")
    @Operation(summary = "Salvar usuário", description = "Salva o usúario")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuário salvo"),
            @ApiResponse(responseCode = "404", description = "Usuário não salvo")
    })
    public ResponseEntity<UsuarioRespostaDTO> salvar(@RequestBody UsuarioRequisicaoDTO usuarioRequisicaoDTO) {
        Usuario usuario = usuarioMapper.toEntity(usuarioRequisicaoDTO);
        usuario = usuarioService.salvar(usuario);
        return ResponseEntity.ok(usuarioMapper.toDto(usuario));
    }

    //DELETE
    @DeleteMapping("/deletar/id")
    @Operation(summary = "Deletar usuário", description = "Deleta o usúario")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuário deletado"),
            @ApiResponse(responseCode = "404", description = "Usuário não deletado")
    })
    public ResponseEntity<UsuarioRespostaDTO> deletar(@RequestParam("id") Long id) {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}



