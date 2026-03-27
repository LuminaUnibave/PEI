package com.unibave.Lumina.controller;

import com.unibave.Lumina.service.RelatorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/eventos")
    @Operation(summary = "Relatorio de Eventos", description = "Retorna um relatório dos eventos")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Retornou o relatório"),
            @ApiResponse(responseCode = "500", description = "Erro no relatório")
    })
    public ResponseEntity<byte[]> downloadRelatorioEventos() {
        try {
            byte[] relatorioBytes = relatorioService.relatorioEventos();
            String filename = "relatorio_eventos_" +
                    LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".txt";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body(relatorioBytes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/agendamentos")
    public ResponseEntity<byte[]> downloadRelatorioAgendamentos() {
        try {
            byte[] relatorioBytes = relatorioService.relatorioAgendamentos();
            String filename = "relatorio_agendamentos_" +
                    LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".txt";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body(relatorioBytes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/pacientes")
    public ResponseEntity<byte[]> downloadRelatorioPacientes() {
        try {
            byte[] relatorioBytes = relatorioService.relatorioPacientes();
            String filename = "relatorio_pacientes_" +
                    LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".txt";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body(relatorioBytes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
