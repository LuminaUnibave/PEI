package com.unibave.Lumina.model;
import com.unibave.Lumina.interfaces.iCadastro;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "usuario", schema = "lumina")
public class Usuario extends Pessoa implements iCadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long idUsuario;
    protected String email;

    //Constructors
    public Usuario(){
        super();
    }
    public Usuario(String nome, String email){
        super(nome);
        this.email = email;
    }

    //Methods
    @Override
    public void cadastrar() {

    }

    @Override
    public void atualizar() {
    }

    @Override
    public void excluir() {
    }

    @Override
    public String toString(){
        return "Nome: " + getNome() +
                "\nEmail: " + getEmail() +
                "\nAtivo: " + getAtivo() +
                " \nData de cadastro " + getDtCadastro().format(formataData);
    }

    //Getter & Setter
    public Long getIdUsuario() {
        return idUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
