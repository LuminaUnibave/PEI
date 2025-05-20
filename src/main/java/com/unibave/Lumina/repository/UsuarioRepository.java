package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    List<Usuario>findByNomeContainingIgnoreCase(String nome);

    //<!> Adicionar mais metodos para demais funcionalidades <!>
}
