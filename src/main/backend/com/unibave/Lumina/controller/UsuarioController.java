package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Usuario.UsuarioDto;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.Usuario;
import com.unibave.Lumina.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    //GETS
    @GetMapping("/buscar/id")
    public ResponseEntity<UsuarioDto> buscarPorId(@RequestParam Long id) {
        return ResponseEntity.ok(usuarioService.buscarPorId(id));
    }

    @GetMapping("/buscar/nome")
    public ResponseEntity<List<UsuarioDto>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(usuarioService.buscarPorNome(nome));
    }

    @GetMapping("/buscar/situacao")
    public ResponseEntity<List<UsuarioDto>> buscarPorSituacao(@RequestParam Situacao situacao) {
        return ResponseEntity.ok(usuarioService.buscarPorSituacao(situacao));
    }

    @GetMapping("/buscar/email")
    public ResponseEntity<List<UsuarioDto>> buscarPorEmail(@RequestParam String email) {
        return ResponseEntity.ok(usuarioService.buscarPorEmail(email));
    }

    @GetMapping("/cadastro")
    public ResponseEntity<List<UsuarioDto>> buscarPorDtCadastro(@RequestParam LocalDateTime data) {
        return ResponseEntity.ok(usuarioService.buscarPorDtCadastro(data));
    }

    @GetMapping("/cadastroAntes")
    public ResponseEntity<List<UsuarioDto>> buscarPorDtCadastroAntes(@RequestParam LocalDateTime data) {
        return ResponseEntity.ok(usuarioService.buscarPorDtCadastroAntes(data));
    }

    @GetMapping("/cadastroDepois")
    public ResponseEntity<List<UsuarioDto>> buscarPorDtCadastroDepois(@RequestParam LocalDateTime data) {
        return ResponseEntity.ok(usuarioService.buscarPorDtCadastroDepois(data));
    }

    @GetMapping("/cadastroEntre")
    public ResponseEntity<List<UsuarioDto>> buscarPorDtCadastroEntre(@RequestParam LocalDateTime inicio,
                                                                     @RequestParam LocalDateTime fim) {
        return ResponseEntity.ok(usuarioService.buscarPorDtCadastroEntre(inicio, fim));
    }

    //POST

    @PostMapping("/salvar")
    public ResponseEntity<Usuario> salvar(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.salvar(usuario));
    }

    //DELETE
    @DeleteMapping("/deletar/id")
    public ResponseEntity<Void> deletar(@RequestParam Long id) {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}



