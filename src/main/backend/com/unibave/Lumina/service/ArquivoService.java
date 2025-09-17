package com.unibave.Lumina.service;

import com.unibave.Lumina.DTOs.Arquivo.ArquivoMapper;
import com.unibave.Lumina.enums.Extensao;
import com.unibave.Lumina.exception.http.ResourceNotFoundException;
import com.unibave.Lumina.model.entidades.Arquivo;
import com.unibave.Lumina.repository.ArquivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ArquivoService {

    private final ArquivoRepository arquivoRepository;

    @Autowired
    public ArquivoService(ArquivoRepository arquivoRepository, ArquivoMapper arquivoMapper) {
        this.arquivoRepository = arquivoRepository;
    }

        //GET
        @Transactional(readOnly = true)
        public long contar() {
            return arquivoRepository.count();
        }

        //ANEXO
        @Transactional(readOnly = true)
        public Optional<Arquivo> buscarPorId(Long id) {
            return arquivoRepository.findById(id);
        }

        //POST
        @Transactional
        public Arquivo salvar(Arquivo arquivo) {
            if(Extensao.values().equals(arquivo.getExtensao(arquivo.getNmArquivo()))){
                return arquivoRepository.save(arquivo);
            } else {
                return null;
            }
        }

        //DELETE
        @Transactional
        public void deletar(Long id) {
            if (!arquivoRepository.existsById(id)) {
                throw new ResourceNotFoundException("Paciente não encontrado com o ID: " + id);
            }
            arquivoRepository.deleteById(id);
        }

}
