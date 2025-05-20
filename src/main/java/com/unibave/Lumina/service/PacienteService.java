package com.unibave.Lumina.service;

import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    private final PacienteRepository pacienteRepository;

    @Autowired
    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    // <!> Adicionar mais metodos para demais funcionalidades <!>

    // Método para buscar paciente por ID
    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }
    // Metodo para buscar pelo nome (Like + IgnoreCase)
    public List<Paciente> buscarNome(String nome) {
        return pacienteRepository.findByNomeContainingIgnoreCase(nome);
    }
    // Método para salvar um novo paciente (ou atualizar, se já existir)
    public Paciente salvar(Paciente paciente){
        System.out.println(STR."Paciente salvo: \{paciente}");//Mensagem no terminal de que foi incluido o paciente com sucesso
        return pacienteRepository.save(paciente);
    }
    // Método para deletar paciente por ID
    public void deletar(Long id) {
        pacienteRepository.deleteById(id);
    }
}
