package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Arquivo.ArquivoMapper;
import com.unibave.Lumina.DTOs.Arquivo.ArquivoRespostaDTO;
import com.unibave.Lumina.enums.TpEntidade;
import com.unibave.Lumina.model.entidades.Arquivo;
import com.unibave.Lumina.repository.ArquivoRepository;
import com.unibave.Lumina.service.ArquivoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/arquivo")
public class ArquivoController {

    private final ArquivoService arquivoService;
    private final ArquivoMapper arquivoMapper;
    private final ArquivoRepository arquivoRepository;

    @Autowired
    public ArquivoController(ArquivoService arquivoService, ArquivoMapper arquivoMapper, ArquivoRepository arquivoRepository) {
        this.arquivoService = arquivoService;
        this.arquivoMapper = arquivoMapper;
        this.arquivoRepository = arquivoRepository;
    }

    @GetMapping("/contar")
    @Operation(summary = "Contar todos os agendamentos", description = "Conta a quantidade de agendamentos")
    public ResponseEntity<Long> contar(){
        long contador = arquivoService.contar();
        return ResponseEntity.ok(contador);
    }

    // GET /anexo/buscar/id?id=...
    @GetMapping("/buscar/id")
    @Operation(summary = "Buscar anexo por ID", description = "Retorna o anexo pelo seu identificador (único)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Anexo encontrado"),
            @ApiResponse(responseCode = "404", description = "Anexo não encontrado")
    })
    public ResponseEntity<Optional<ArquivoRespostaDTO>> buscarPorId(
            @RequestParam("id") Long id){
        Arquivo arquivo = arquivoService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Anexo não encontrado"));
        return ResponseEntity.ok(Optional.ofNullable(arquivoMapper.toDto(arquivo)));
    }

    @PostMapping(value = "/salvar", consumes = "multipart/form-data")
    @Operation(summary = "Salvar arquivo", description = "Salva o arquivo")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = ""),
            @ApiResponse(responseCode = "404", description = "")
    })
    public ResponseEntity<String> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("idEntidade") Long idEntidade,
            @RequestParam("tpEntidade") TpEntidade tpEntidade) throws IOException {

        Arquivo arquivo = Arquivo.builder()
                .nmArquivo(file.getOriginalFilename())
                .tamanho(file.getSize())
                .conteudo(file.getBytes())
                .idEntidade(idEntidade)
                .tpEntidade(tpEntidade)
                .build();

        arquivoRepository.save(arquivo);
        return ResponseEntity.ok("Arquivo salvo! ID: " + arquivo.getId());
    }

}
