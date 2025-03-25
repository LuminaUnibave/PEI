package com.unibave.Lumina.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class UsuarioTest {

    @Test
    void cadastrarTest() {
        //Initialize
        Usuario usuario1 = new Usuario();
        usuario1.setNome("Lucca");
        usuario1.setDtNascimento(LocalDate.parse("2004-08-11"));
        usuario1.setEmail("luccapmuller@gmail.com");

        //Assert
        assertEquals("Nome: Lucca"+
                " \nData de nascimento: 2004-08-11"+
                "\nEmail: luccapmuller@gmail.com" +
                "\nAtivo: 1"+
                " \nData de cadastro "+ LocalDate.now(), usuario1.toString());
    }
}