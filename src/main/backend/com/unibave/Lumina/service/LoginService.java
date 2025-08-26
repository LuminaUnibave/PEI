package com.unibave.Lumina.service;

import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
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
        if (email.equals(usuarioRepository.findByEmail(email).get().getEmail()) && passwordEncoder.matches(senha, usuarioRepository.findByEmail(email).get().getSenha())) {
          return usuarioRepository.findByEmail(email);
        }else {
            return Optional.empty();
        }
    }
}
