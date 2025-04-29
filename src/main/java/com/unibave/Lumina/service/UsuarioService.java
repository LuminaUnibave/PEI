package com.unibave.Lumina.service;

import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.model.Usuario;
import com.unibave.Lumina.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    //!Aviso!
    // Adicionar mais metodos para demais funcionalidades
    //!Aviso!

    // Método para buscar produto por ID
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    // Metodo para buscar pelo nome
    public Optional<Usuario> buscarNome(String nome){
        return usuarioRepository.findByNome(nome);
    }
    // Método para salvar um novo produto (ou atualizar, se já existir)
    public Usuario salvar(Usuario usuario){
        return usuarioRepository.save(usuario);
    }
    // Método para deletar produto por ID
    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }
}
