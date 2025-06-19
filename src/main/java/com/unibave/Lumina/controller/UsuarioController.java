package com.unibave.Lumina.controller;

import com.unibave.Lumina.model.Usuario;
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

    //GETS
    @GetMapping("/buscar/nome")
    public List<Usuario> buscarPorNome(@RequestParam("nome") String nome) {
        return usuarioService.buscarPorNome(nome);
    }
    @GetMapping("/buscar/id") // /usuario/{id}
    public Optional<Usuario> buscarPorId(@RequestParam("id") Long id) {
        return usuarioService.buscarPorId(id);
    }

    // POST
    @PostMapping("/salvar")
    public Usuario salvar(@RequestBody Usuario usuario) {
        return usuarioService.salvar(usuario);
    }

    // DELETE /usuario/{id}
    @DeleteMapping("deletar/id")
    public void deletar(@RequestParam("id") Long id) {
        usuarioService.deletar(id);
    }
}
