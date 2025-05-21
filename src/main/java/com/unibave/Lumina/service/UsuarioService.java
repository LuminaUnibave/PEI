package com.unibave.Lumina.service;

import com.unibave.Lumina.model.Usuario;
import com.unibave.Lumina.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // <!> Adicionar mais metodos para demais funcionalidades <!>

    // Método para buscar usuario por ID
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    // Metodo para buscar pelo nome
    public List<Usuario> buscarNome(String nome){
        return usuarioRepository.findByNomeContainingIgnoreCase(nome);
    }
    // Método para salvar um novo usuario (ou atualizar, se já existir)
    public Usuario salvar(Usuario usuario){
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        System.out.println(STR."\nUsuario salvo: \{usuario}\n");
        return usuarioRepository.save(usuario);
    }
    // Método para deletar usuario por ID
    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }
}
