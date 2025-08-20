package com.unibave.Lumina.service;

import com.unibave.Lumina.DTOs.Agendamento.AgendamentoDto;
import com.unibave.Lumina.DTOs.Usuario.UsuarioDto;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.Usuario;
import com.unibave.Lumina.repository.AnexoRepository;
import com.unibave.Lumina.repository.UsuarioRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public UsuarioDto buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .map(UsuarioDto::fromEntity)
                .orElseThrow(() -> new ResolutionException("Usuário não encontrado com ID" + id));
    }

    // Buscar por nome (retorna lista)
    @Transactional(readOnly = true)
    public List<UsuarioDto> buscarPorNome(String nome) {
        return usuarioRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(UsuarioDto::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar por situação
    @Transactional(readOnly = true)
    public List<UsuarioDto> buscarPorSituacao(Situacao situacao) {
        return usuarioRepository.findBySituacao(situacao)
                .stream()
                .map(UsuarioDto::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar por email (pode haver mais de 1 usuário com o mesmo email em casos estranhos → lista)
    @Transactional(readOnly = true)
    public List<UsuarioDto> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .stream()
                .map(UsuarioDto::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar por data de cadastro (exata)
    @Transactional(readOnly = true)
    public List<UsuarioDto> buscarPorDtCadastro(LocalDateTime dtCadastro) {
        return usuarioRepository.findByDtCadastro(dtCadastro)
                .stream()
                .map(UsuarioDto::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar usuários cadastrados antes de uma data
    @Transactional(readOnly = true)
    public List<UsuarioDto> buscarPorDtCadastroAntes(LocalDateTime dtCadastroBefore) {
        return usuarioRepository.findByDtCadastroBefore(dtCadastroBefore)
                .stream()
                .map(UsuarioDto::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar usuários cadastrados depois de uma data
    @Transactional(readOnly = true)
    public List<UsuarioDto> buscarPorDtCadastroDepois(LocalDateTime dtCadastroAfter) {
        return usuarioRepository.findByDtCadastroAfter(dtCadastroAfter)
                .stream()
                .map(UsuarioDto::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar usuários cadastrados entre duas datas
    @Transactional(readOnly = true)
    public List<UsuarioDto> buscarPorDtCadastroEntre(LocalDateTime dtCadastroAfter, LocalDateTime dtCadastroBefore) {
        return usuarioRepository.findByDtCadastroBetween(dtCadastroAfter, dtCadastroBefore)
                .stream()
                .map(UsuarioDto::fromEntity)
                .collect(Collectors.toList());
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
