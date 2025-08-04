package com.unibave.Lumina.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class PacienteTest {

    static Paciente paciente;
    static Paciente pacienteConstrutor;

    @DisplayName("Teste Gets + Sets e construtor vazio")
    @Test
    void dadosPaciente(){
        System.out.println("Teste dos Gets, Sets e construtor vazio");
        paciente = new Paciente();
        System.out.println("\nPaciente inicializado: " + paciente);

        paciente.setNome("Teste");
        paciente.setCpf("995.499.490-44");
        paciente.setDtNascimento(LocalDate.parse("2000-01-01"));
        paciente.setCrtSus("18933001613");
        paciente.setEmail("teste@teste.com");

        System.out.println("\nPaciente cadastrado: " + paciente);

        assertEquals(STR."nome, cpf, dt_nascimento, crtSus, email, situacao, dt_cadastro = [Teste, 995.499.490-44, 2000-01-01, 18933001613, teste@teste.com, ATIVO, \{LocalDate.now()}]", paciente.toString());
        System.out.println("\ntoString validado");
    }

    @DisplayName("Teste construtor Paciente")
    @Test
    void construtor(){
        System.out.println("Teste do construtor de Paciente");
        pacienteConstrutor = new Paciente("teste", LocalDate.parse("1900-01-01"), "teste@teste.com.br", "907.341.110-61","18933001613");
        System.out.println("\nPaciente do construtor: " + pacienteConstrutor);
        assertEquals(STR."nome, cpf, dt_nascimento, crtSus, email, situacao, dt_cadastro = [teste, 907.341.110-61, 1900-01-01, 18933001613, teste@teste.com.br, ATIVO, \{LocalDate.now()}]", pacienteConstrutor.toString());
        System.out.println("\ntoString validado");
    }
}