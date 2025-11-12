package com.unibave.Lumina.controller;

import com.unibave.Lumina.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/eventos")
    public ResponseEntity<byte[]> downloadRelatorioEventos() {
        try {
            byte[] relatorioBytes = relatorioService.relatorioEventos();
            String filename = "relatorio_eventos_" +
                    new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + ".txt";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body(relatorioBytes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
