import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.sql.Date;
import java.time.LocalDate;

@Getter
@Setter
public class Pessoa {

    @NotBlank(message = "O nome não pode ser vazio!")
    @Size(min = 3, max = 120, message = "O nome deve possuir no mínimo 3 letras e no maxímo 120!")
    private String nome;

    @Min(value = 0, message = "A idade deve ser no mínimo 0 anos!")
    @Max(value = 120, message = "A idade deve ser no máximo 120 anos!")
    private int idade;
    private Date dtCadastro;

    //Construtores
    public Pessoa (){
    }
    public Pessoa(String nome, int idade, Date dtCadastro) {
        this.nome = nome;
        this.idade = idade;
        this.dtCadastro = Date.valueOf(LocalDate.now());
    }

    @Override
    public String toString() {
        return "Pessoa{" +
                "nome='" + nome + '\'' +
                ", idade=" + idade +
                ", dtCadastro=" + dtCadastro +
                '}';
    }
}
