package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    List<Paciente> findByNomeContainingIgnoreCase(String nome);

    //<!> Adicionar mais metodos para demais funcionalidades <!>
}