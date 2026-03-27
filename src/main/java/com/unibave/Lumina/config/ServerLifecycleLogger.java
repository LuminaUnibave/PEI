package com.unibave.Lumina.config;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ServerLifecycleLogger {

    private long startTime;

    @PostConstruct
    public void onStart() {
        this.startTime = System.currentTimeMillis();
        log.info("🟢 Iniciando servidor...");
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onReady() {
        long duration = System.currentTimeMillis() - startTime;
        log.info("✅ Servidor iniciado em {} ms", duration);
    }

    @PreDestroy
    public void onShutdown() {
        long uptime = System.currentTimeMillis() - startTime;
        log.info("🔴 Finalizando servidor. Tempo online = {} ms (≈ {} minutos)", uptime, uptime / 60000);
    }
}
