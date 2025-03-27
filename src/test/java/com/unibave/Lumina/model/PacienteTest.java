package com.unibave.Lumina.model;
import com.unibave.Lumina.model.Paciente;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import static org.junit.jupiter.api.Assertions.*;

class PacienteTest {

        @Test
        void cadastrarTest() {
            //Initialize
            Paciente paciente1 = new Paciente();
            paciente1.setNome("Lucca");
            paciente1.setDtNascimento(LocalDate.parse("2004-08-11"));
            paciente1.setEmail("luccapmuller@gmail.com");
            DateTimeFormatter formataData = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            //Assert
            assertEquals("Nome: Lucca"+
                    "\nData de nascimento: " + paciente1.getDtNascimento().format(formataData) +
                    "\nEmail: luccapmuller@gmail.com" +
                    "\nAtivo: 1"+
                    " \nData de cadastro " + paciente1.getDtCadastro().format(formataData) , paciente1.toString());
        }
}