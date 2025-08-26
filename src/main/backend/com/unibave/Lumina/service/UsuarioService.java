package com.unibave.Lumina.service;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.repository.AnexoRepository;
import com.unibave.Lumina.repository.UsuarioRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AnexoRepository anexoRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, AnexoRepository anexoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.anexoRepository = anexoRepository;
    }

    //GET
    //USUARIO
    @Transactional(readOnly = true)
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    // Buscar por nome (retorna lista)
    @Transactional(readOnly = true)
    public List<Usuario> buscarPorNome(String nome) {
        return usuarioRepository.findByNomeContainingIgnoreCase(nome);
    }

    // Buscar por situação
    @Transactional(readOnly = true)
    public List<Usuario> buscarPorSituacao(Situacao situacao) {
        return usuarioRepository.findBySituacao(situacao);
    }

    // Buscar por email (pode haver mais de 1 usuário com o mesmo email em casos estranhos → lista)
    @Transactional(readOnly = true)
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // Buscar por data de cadastro (exata)
    @Transactional(readOnly = true)
    public List<Usuario> buscarPorDtCadastro(LocalDateTime dtCadastro) {
        return usuarioRepository.findByDtCadastro(dtCadastro);
    }

    // Buscar usuários cadastrados antes de uma data
    @Transactional(readOnly = true)
    public List<Usuario> buscarPorDtCadastroAntes(LocalDateTime dtCadastroBefore) {
        return usuarioRepository.findByDtCadastroBefore(dtCadastroBefore);
    }

    // Buscar usuários cadastrados depois de uma data
    @Transactional(readOnly = true)
    public List<Usuario> buscarPorDtCadastroDepois(LocalDateTime dtCadastroAfter) {
        return usuarioRepository.findByDtCadastroAfter(dtCadastroAfter);
    }

    // Buscar usuários cadastrados entre duas datas
    @Transactional(readOnly = true)
    public List<Usuario> buscarPorDtCadastroEntre(LocalDateTime dtCadastroAfter, LocalDateTime dtCadastroBefore) {
        return usuarioRepository.findByDtCadastroBetween(dtCadastroAfter, dtCadastroBefore);
    }

    //POST
    public Usuario salvar(Usuario usuario){
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    //DELETE
    public void deletar(Long id){
        usuarioRepository.deleteById(id);
    }
}
