package com.unibave.Lumina.aspect;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.MDC;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class ServiceLoggingAspect {

    private final HttpServletRequest request;

    @Around("execution(* com.unibave.Lumina.service..*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        // Se já existe um marcador, significa que não é a chamada "raiz"
        if (MDC.get("isRootCall") != null) {
            return joinPoint.proceed();
        }

        // Marca como chamada raiz
        MDC.put("isRootCall", "true");

        long start = System.currentTimeMillis();
        String requestId = UUID.randomUUID().toString();
        String user = getUsuarioLogado(); // ✅ corrigido

        MDC.put("requestId", requestId);
        MDC.put("user", user);

        String methodName = joinPoint.getSignature().toShortString();
        String args = Arrays.toString(joinPoint.getArgs());
        String when = LocalDateTime.now().toString();

        log.info("INICIADO : REQUISIÇÃO = {} -- DATA = {} -- USUÁRIO = {} -- MÉTODO = {} -- ARGS = {}",
                requestId, when, user, methodName, args);

        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;

            log.info("EXECUTADO : REQUISIÇÃO = {} -- DATA = {} -- USUÁRIO = {} -- MÉTODO = {} -- DURAÇÃO = {}ms -- RESULTADO = {}",
                    requestId, LocalDateTime.now(), user, methodName,
                    duration, summarizeResult(result));

            return result;

        } catch (Throwable ex) {
            long duration = System.currentTimeMillis() - start;

            log.error("ERRO: REQUISIÇÃO = {} -- DATA = {} -- USUÁRIO = {} -- MÉTODO = {} -- DURAÇÃO = {}ms -- CLASSE = {} -- MENSAGEM = {}",
                    requestId, LocalDateTime.now(), user, methodName,
                    duration, ex.getClass().getSimpleName(), ex.getMessage(), ex);

            throw ex;
        } finally {
            MDC.remove("isRootCall"); // limpa o marcador
            MDC.clear();
        }
    }

    private String summarizeResult(Object result) {
        return switch (result) {
            case null -> "null";
            case java.util.List<?> list -> STR."Lista(size=\{list.size()})";
            case java.util.Optional<?> optional -> optional.map(this::summarizeSingleObject).orElse("Optional.empty");
            default -> summarizeSingleObject(result);
        };
    }

    private String summarizeSingleObject(Object obj) {
        if (obj == null) return "null";

        // Exemplo: usuário → só ID e nome
        if (obj instanceof com.unibave.Lumina.model.entidades.Usuario u) {
            return STR."Usuario(id=\{u.getId()}, nome=\{u.getNome()})";
        }

        return obj.getClass().getSimpleName();
    }

    private String getUsuarioLogado() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
                String ip = request.getRemoteAddr();
                String endpoint = request.getRequestURI();
                return STR."NAO_AUTENTICADO | IP=\{ip} | ENDPOINT=\{endpoint}";
            }

            return auth.getName();
        } catch (Exception e) {
            return "ERRO_AUTENTICACAO";
        }
    }

}
