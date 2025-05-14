package com.unibave.Lumina.controller;

import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.model.Usuario;
import com.unibave.Lumina.service.PacienteService;
import com.unibave.Lumina.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> buscarNome(@RequestParam("nome") String nome) {
        return usuarioService.buscarNome(nome);
    }

    // GET /paciente/{id}
    @GetMapping("/{id}")
    public Optional<Usuario> buscarPorId(@PathVariable("id") Long id) {
        return usuarioService.buscarPorId(id);
    }

    // POST
    @PostMapping
    public Usuario salvar(@RequestBody Usuario usuario) {
        return usuarioService.salvar(usuario);
    }

    // DELETE /paciente/{id}
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable("id") Long id) {
        usuarioService.deletar(id);
    }
}
