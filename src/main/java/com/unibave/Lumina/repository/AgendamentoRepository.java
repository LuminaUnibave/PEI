package com.unibave.Lumina.repository;

import com.unibave.Lumina.model.Agendamento;
import com.unibave.Lumina.model.Agendamento.TpVisita;
import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.model.Situacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    List<Agendamento>findByTpVisita(TpVisita tpVisita);

    List<Agendamento> findByPacienteIdPaciente(Long id);

    List<Agendamento> findByPacienteNomeContainingIgnoreCase(String nome);

}
