import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

public class Paciente extends Pessoa {
    @Getter
    @Setter
    private String email;
    private byte ativo;

    public Paciente(){
    }
    public Paciente(String nome, int idade, Date dtCadastro, byte ativo){
        super(nome, idade, dtCadastro);
        this.ativo = 1;
    }

}
