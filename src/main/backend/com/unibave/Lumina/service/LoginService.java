package com.unibave.Lumina.service;

import com.unibave.Lumina.exception.http.ResourceNotFoundException;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.repository.UsuarioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Slf4j
public class LoginService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //LOGIN
    public Optional<Usuario> login(String email, String senha) {
        try{
            Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
            if (usuario.get().getEmail().equals(email) && passwordEncoder.matches(senha, usuario.get().getSenha())) {
                log.info("Sucesso no login usuario de ID: {}", usuario.get().getId());
                return usuario;
            }else {
                log.info("Erro no login: email e/ou senha incorrto(s)");
                return Optional.empty();
            }
        } catch (ResourceNotFoundException e) {
            log.info("Erro no login: ResourceNotFoundException");
            return Optional.empty();
        }
    }
}
