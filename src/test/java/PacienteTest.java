import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PacienteTest {

    @Test
    public void pacienteTest(){
        Paciente paciente = new Paciente("Lucca", 20);
        assertEquals("nome Lucca idade 20 Data de cadastro 2025-03-25", paciente.toString());
    }
}