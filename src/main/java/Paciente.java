import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

public class Paciente extends Pessoa {
    @Getter
    @Setter
    private String email;
    @Getter
    @Setter
    private byte ativo;

    public Paciente(){
        super();
    }
    public Paciente(String nome, int idade){
        super(nome, idade);
        this.ativo = 1;
    }

}
