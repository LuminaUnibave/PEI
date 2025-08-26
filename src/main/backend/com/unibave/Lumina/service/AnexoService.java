package com.unibave.Lumina.service;

import com.unibave.Lumina.exception.ResourceNotFoundException;
import com.unibave.Lumina.model.entidades.Anexo;
import com.unibave.Lumina.model.entidades.Paciente;
import com.unibave.Lumina.repository.AnexoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AnexoService {

    private final AnexoRepository anexoRepository;

    @Autowired
    public AnexoService(AnexoRepository anexoRepository) {
        this.anexoRepository = anexoRepository;
    }

    //GET
    //ANEXO
    @Transactional(readOnly = true)
    public Optional<Anexo> buscarPorId(Long id) {
        return anexoRepository.findById(id);
    }

    //POST
    @Transactional
    public Anexo salvar(Anexo anexo) {
        return anexoRepository.save(anexo);
    }

    //DELETE
    @Transactional
    public void deletar(Long id) {
        if (!anexoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Paciente não encontrado com o ID: " + id);
        }
        anexoRepository.deleteById(id);
    }

}
