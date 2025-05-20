package com.unibave.Lumina.service;

import com.unibave.Lumina.model.Paciente;
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

    //!Aviso!
    // Adicionar mais metodos para demais funcionalidades
    //!Aviso!

    // Método para buscar produto por ID
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    // Metodo para buscar pelo nome
    public List<Usuario> buscarNome(String nome){
        return usuarioRepository.findByNomeContainingIgnoreCase(nome);
    }
    // Método para salvar um novo produto (ou atualizar, se já existir)
    public Usuario salvar(Usuario usuario){
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        System.out.println("Usuario salvo: "+ usuario.toString());
        return usuarioRepository.save(usuario);
    }
    // Método para deletar produto por ID
    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }
}
