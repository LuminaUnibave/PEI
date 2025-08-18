package com.unibave.Lumina.repository;

import com.unibave.Lumina.enums.Situacao;
import com.unibave.Lumina.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    //GET
    //Find By IdPaciente
    Optional<Paciente> findById(Long id);
    //Find By nome
    List<Paciente> findByNomeContainingIgnoreCase(String nome);
    //Find By cpf
    Optional<Paciente> findByCpf(String cpf);
    //Find By situacao
    List<Paciente> findBySituacao(Situacao situacao);
    //Find By dtNascimento
    List<Paciente> findByDtNascimento(LocalDate dtNascimento);
    List<Paciente> findByDtNascimentoBefore(LocalDate dtNascimentoBefore);
    List<Paciente> findByDtNascimentoAfter(LocalDate dtNascimentoAfter);
    List<Paciente> findByDtNascimentoBetween(LocalDate dtNascimentoAfter, LocalDate dtNascimentoBefore);
    //Find By crtSus
    Optional<Paciente> findByCrtSus(String crtSus);
    //Find By email
    List<Paciente> findByEmail(String email);
    //Find By dtCadastro
    List<Paciente> findByDtCadastro(LocalDateTime dtCadastro);
    List<Paciente> findByDtCadastroBefore(LocalDateTime dtCadastroBefore);
    List<Paciente> findByDtCadastroAfter(LocalDateTime dtCadastroAfter);
    List<Paciente> findByDtCadastroBetween(LocalDateTime dtCadastroAfter, LocalDateTime dtCadastroBefore);
}