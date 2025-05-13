package com.unibave.Lumina.service;

import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.repository.PacienteRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    // <!> Adicionar mais metodos para demais funcionalidades <!>

    // Método para buscar produto por ID
    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }
    // Metodo para buscar pelo nome
    public List<Paciente> buscarNome(String nome) {
        return pacienteRepository.findByNomeContainingIgnoreCase(nome);
    }
    // Método para salvar um novo produto (ou atualizar, se já existir)
    public Paciente salvar(Paciente paciente){
        return pacienteRepository.save(paciente);
    }
    // Método para deletar produto por ID
    public void deletar(Long id) {
        pacienteRepository.deleteById(id);
    }
}
