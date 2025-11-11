package com.unibave.Lumina.service;

import com.unibave.Lumina.DTOs.Login.LoginRespostaDTO;
import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.entidades.Usuario;
import com.unibave.Lumina.repository.UsuarioRepository;
import com.unibave.Lumina.config.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
public class LoginService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public LoginService(UsuarioRepository usuarioRepository,
                        PasswordEncoder passwordEncoder,
                        JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Realiza o login de um usuário com autenticação JWT
     * @param email Email do usuário
     * @param senha Senha do usuário
     * @return Optional contendo LoginRespostaDTO se login for bem-sucedido, Optional.empty() caso contrário
     */
    @Transactional(readOnly = true)
    public Optional<LoginRespostaDTO> login(String email, String senha) {
        try {
            Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email.toLowerCase().trim());

            if (usuarioOpt.isEmpty() || !isUsuarioAtivo(usuarioOpt.get())) {
                log.warn("Tentativa de login com usuário não encontrado ou inativo: {}", email);
                return Optional.empty();
            }

            Usuario usuario = usuarioOpt.get();

            if (passwordEncoder.matches(senha, usuario.getSenha())) {
                // Gerar token JWT
                String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getId());

                // Criar resposta com token
                LoginRespostaDTO resposta = new LoginRespostaDTO(
                        token,
                        usuario.getId(),
                        usuario.getEmail(),
                        getNomeUsuario(usuario) // Método seguro para obter nome
                );

                log.info("Login realizado com sucesso para usuário ID: {}", usuario.getId());
                return Optional.of(resposta);
            } else {
                log.warn("Senha incorreta para o usuário: {}", email);
                return Optional.empty();
            }

        } catch (Exception e) {
            log.error("Erro durante o processo de login para o email: {}", email, e);
            return Optional.empty();
        }
    }

    /**
     * Verifica se um usuário está ativo baseado na situação
     * @param usuario Usuário a ser verificado
     * @return true se o usuário está ativo, false caso contrário
     */
    private boolean isUsuarioAtivo(Usuario usuario) {
        return usuario.getSituacao() == Situacao.ATIVO;
    }

    /**
     * Obtém o nome do usuário de forma segura (evita NullPointerException)
     * @param usuario Usuário
     * @return Nome do usuário ou string vazia se não existir
     */
    private String getNomeUsuario(Usuario usuario) {
        // Adapte conforme os campos existentes na sua entidade Usuario
        if (usuario.getNome() != null) {
            return usuario.getNome();
        } else if (usuario.getEmail() != null) {
            return usuario.getEmail().split("@")[0]; // Pega a parte antes do @
        } else {
            return "Usuário";
        }
    }

    /**
     * Verifica se as credenciais são válidas sem realizar o login completo
     * @param email Email do usuário
     * @param senha Senha do usuário
     * @return true se as credenciais são válidas, false caso contrário
     */
    public boolean credenciaisValidas(String email, String senha) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email.toLowerCase().trim());

        return usuarioOpt.isPresent() &&
                isUsuarioAtivo(usuarioOpt.get()) &&
                passwordEncoder.matches(senha, usuarioOpt.get().getSenha());
    }

    /**
     * Verifica se um usuário existe e está ativo pelo email
     * @param email Email do usuário
     * @return true se o usuário existe e está ativo, false caso contrário
     */
    public boolean usuarioAtivoExiste(String email) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email.toLowerCase().trim());
        return usuarioOpt.isPresent() && isUsuarioAtivo(usuarioOpt.get());
    }

    /**
     * Busca usuário por email
     * @param email Email do usuário
     * @return Optional contendo o usuário se encontrado
     */
    public Optional<Usuario> buscarUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email.toLowerCase().trim());
    }
}