package com.unibave.Lumina.model;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

public class EventoTest {

    private Evento evento;

    @BeforeEach
    void setUp() {
        evento = new Evento();
        System.out.println("Cria um novo evento");
    }

    // Testes para setData
    @Test
    @DisplayName("setData deve aceitar data futura válida")
    void testSetDataValida() {
        LocalDate dataFutura = LocalDate.now().plusDays(1);
        assertDoesNotThrow(() -> evento.setData(dataFutura));
        assertEquals(dataFutura, evento.getData());
    }

    @Test
    @DisplayName("setData deve lançar exceção para data nula")
    void testSetDataNula() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            evento.setData(null);
        });
        assertEquals("Data não pode ser nula.", exception.getMessage());
    }

    @Test
    @DisplayName("setData deve lançar exceção para data passada")
    void testSetDataPassada() {
        LocalDate dataPassada = LocalDate.now().minusDays(1);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            evento.setData(dataPassada);
        });
        assertEquals("Evento não pode ser no passado.", exception.getMessage());
    }

    // Testes para setTitulo
    @Test
    @DisplayName("setTitulo deve aceitar título válido")
    void testSetTituloValido() {
        String titulo = "Reunião de Equipe";
        assertDoesNotThrow(() -> evento.setTitulo(titulo));
        assertEquals(titulo, evento.getTitulo());
    }

    @Test
    @DisplayName("setTitulo deve lançar exceção para título nulo")
    void testSetTituloNulo() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            evento.setTitulo(null);
        });
        assertEquals("Título não pode ser vazio.", exception.getMessage());
    }

    @Test
    @DisplayName("setTitulo deve lançar exceção para título vazio")
    void testSetTituloVazio() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            evento.setTitulo("");
        });
        assertEquals("Título não pode ser vazio.", exception.getMessage());
    }

    @Test
    @DisplayName("setTitulo deve lançar exceção para título com mais de 255 caracteres")
    void testSetTituloMuitoLongo() {
        String tituloLongo = "A".repeat(256);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            evento.setTitulo(tituloLongo);
        });
        assertEquals("Título não pode exceder o tamanho.", exception.getMessage());
    }

    // Testes para setDescricao
    @Test
    @DisplayName("setDescricao deve aceitar descrição válida")
    void testSetDescricaoValida() {
        String descricao = "Planejamento do projeto";
        assertDoesNotThrow(() -> evento.setDescricao(descricao));
        assertEquals(descricao, evento.getDescricao());
    }

    @Test
    @DisplayName("setDescricao deve aceitar descrição vazia")
    void testSetDescricaoVazia() {
        assertDoesNotThrow(() -> evento.setDescricao(""));
        assertEquals("", evento.getDescricao());
    }

    @Test
    @DisplayName("setDescricao deve aceitar descrição nula")
    void testSetDescricaoNula() {
        assertDoesNotThrow(() -> evento.setDescricao(null));
        assertNull(evento.getDescricao());
    }

    @Test
    @DisplayName("setDescricao deve lançar exceção para descrição com mais de 255 caracteres")
    void testSetDescricaoMuitoLonga() {
        String descricaoLonga = "A".repeat(256);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            evento.setDescricao(descricaoLonga);
        });
        assertEquals("Descrição não pode exceder o tamanho.", exception.getMessage());
    }
}