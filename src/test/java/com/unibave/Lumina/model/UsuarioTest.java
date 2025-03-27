package com.unibave.Lumina.model;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import static org.junit.jupiter.api.Assertions.*;

class UsuarioTest {

    @Test
    void cadastrarTest() {
        //Initialize
        Usuario usuario1 = new Usuario();
        usuario1.setNome("Lucca");
        usuario1.setEmail("luccapmuller@gmail.com");
        DateTimeFormatter formataData = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        //Assert
        assertEquals("Nome: Lucca"+
                "\nEmail: luccapmuller@gmail.com" +
                "\nAtivo: 1"+
                " \nData de cadastro "+ LocalDate.now().format(formataData), usuario1.toString());
    }
}