package com.unibave.Lumina.controller;

import com.unibave.Lumina.DTOs.Anexo.AnexoMapper;
import com.unibave.Lumina.DTOs.Anexo.AnexoRespostaDTO;
import com.unibave.Lumina.model.entidades.Anexo;
import com.unibave.Lumina.service.AnexoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/anexo")
public class AnexoController {

    private final AnexoService anexoService;
    private final AnexoMapper anexoMapper;

    @Autowired
    public AnexoController(AnexoService anexoService, AnexoMapper anexoMapper) {
        this.anexoService = anexoService;
        this.anexoMapper = anexoMapper;
    }

    // GET /anexo/buscar/id?id=...
    @GetMapping("/buscar/id")
    @Operation(summary = "Buscar anexo por ID", description = "Retorna o anexo pelo seu identificador (único)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Anexo encontrado"),
            @ApiResponse(responseCode = "404", description = "Anexo não encontrado")
    })
    public ResponseEntity<Optional<AnexoRespostaDTO>> buscarPorId(
            @RequestParam("id") Long id){
        Anexo anexo = anexoService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Anexo não encontrado"));
        return ResponseEntity.ok(Optional.ofNullable(anexoMapper.toDto(anexo)));
    }
}
