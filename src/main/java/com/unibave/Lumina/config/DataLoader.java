package com.unibave.Lumina.config;

import com.unibave.Lumina.enums.TpUsuario;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        criarUsuarioAdministrador();
        criarUsuarioVisitante();
    }

    private void criarUsuarioAdministrador() {
        String emailAdmin = "admin@lumina.com";

        // Verificar se o admin já existe
        if (usuarioRepository.findByEmail(emailAdmin).isEmpty()) {
            Usuario admin = Usuario.builder()
                    .nome("Administrador")
                    .email(emailAdmin)
                    .senha(passwordEncoder.encode("admin"))
                    .tpUsuario(TpUsuario.ADMINISTRADOR)
                    .build();

            usuarioRepository.save(admin);
            log.info("Usuário administrador criado com sucesso!");
            log.info("Email: {}", emailAdmin);
            log.info("Senha: admin");
        } else {
            log.info("Usuário administrador já existe no sistema");
        }
    }

    private void criarUsuarioVisitante() {
        String emailVisitante = "visitante@lumina.com";

        // Verificar se o admin já existe
        if (usuarioRepository.findByEmail(emailVisitante).isEmpty()) {
            Usuario admin = Usuario.builder()
                    .nome("Visitante")
                    .email(emailVisitante)
                    .senha(passwordEncoder.encode("@@@@@"))
                    .tpUsuario(TpUsuario.VISITANTE)
                    .build();

            usuarioRepository.save(admin);
            log.info("Usuário visitante criado com sucesso!");
            log.info("Email: {}", emailVisitante);
            log.info("Senha: @@@@@");
        } else {
            log.info("Usuário visitante já existe no sistema");
        }
    }
}