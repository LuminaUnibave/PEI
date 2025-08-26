package com.unibave.Lumina.repository;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.entidades.Agendamento;
import com.unibave.Lumina.model.entidades.Agendamento.TpVisita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    //AGENDAMENTO
    //Find By idAgendamento
    Optional<Agendamento> findById(Long id);
    //Find By tpVisita
    List<Agendamento> findByTpVisita(TpVisita tpVisita);
    //Find By dtAgendamento
    List<Agendamento> findByDtAgendamento(LocalDateTime dtAgendamento);
    List<Agendamento> findByDtAgendamentoBefore(LocalDateTime dtAgendamentoBefore);
    List<Agendamento> findByDtAgendamentoAfter(LocalDateTime dtAgendamentoAfter);
    List<Agendamento> findByDtAgendamentoBetween(LocalDateTime dtAgendamentoAfter, LocalDateTime dtAgendamentoBefore);
    //Find By dtCadastro
    List<Agendamento> findByDtCadastro(LocalDateTime dtCadastro);
    List<Agendamento> findByDtCadastroBefore(LocalDateTime dtCadastroBefore);
    List<Agendamento> findByDtCadastroAfter(LocalDateTime dtCadastroAfter);
    List<Agendamento> findByDtCadastroBetween(LocalDateTime dtCadastroAfter, LocalDateTime dtCadastroBefore);

    //AGENDAMENTO/PACIENTE
    //Find By IdPaciente
    List<Agendamento> findByPaciente_id(Long id);
    //Find By nome
    List<Agendamento> findByPaciente_NomeContainingIgnoreCase(String nome);
    //Find By situacao
    List<Agendamento> findByPaciente_Situacao(Situacao situacao);
    //Find By cpf
    List<Agendamento> findByPaciente_Cpf(String cpf);
    //Find By crtSus
    List<Agendamento> findByPaciente_CrtSus(String crtSus);
    //Find By email
    List<Agendamento> findByPaciente_Email(String email);
}
