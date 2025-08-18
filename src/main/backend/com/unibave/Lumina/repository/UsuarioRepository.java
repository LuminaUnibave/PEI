package com.unibave.Lumina.repository;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //Find By IdPaciente
    Optional<Usuario> findById(Long id);
    //Find By nome
    List<Usuario>findByNomeContainingIgnoreCase(String nome);
    //Find By situacao
    List<Usuario> findBySituacao(Situacao situacao);
    //Find By email
    List<Usuario> findByEmail(String email);
    //Find By dtCadastro
    List<Usuario> findByDtCadastro(LocalDateTime dtCadastro);
    List<Usuario> findByDtCadastroBefore(LocalDateTime dtCadastroBefore);
    List<Usuario> findByDtCadastroAfter(LocalDateTime dtCadastroAfter);
    List<Usuario> findByDtCadastroBetween(LocalDateTime dtCadastroAfter, LocalDateTime dtCadastroBefore);
}
