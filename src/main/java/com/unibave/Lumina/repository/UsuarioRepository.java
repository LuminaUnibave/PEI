package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNome(String nome);
}
