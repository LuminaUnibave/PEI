import lombok.Getter;
import lombok.Setter;
import java.sql.Date;
import java.time.LocalDate;

public class Pessoa {
    @Getter
    @Setter
    private String nome;
    @Getter
    @Setter
    private int idade;
    @Getter
    @Setter
    private Date dtCadastro;

    //Construtores
    public Pessoa (){
        this.dtCadastro = Date.valueOf(LocalDate.now());
    }
    public Pessoa(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
        this.dtCadastro = Date.valueOf(LocalDate.now());
    }

    @Override
    public String toString() {
        return "nome " + nome + " idade " + idade + " Data de cadastro " + dtCadastro;
    }
}
