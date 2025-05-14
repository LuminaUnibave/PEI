package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    List<Usuario>findByNomeContainingIgnoreCase(String nome);

    //<!> Adicionar mais metodos para demais funcionalidades <!>
}
