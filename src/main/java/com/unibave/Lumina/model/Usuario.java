package com.unibave.Lumina.model;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "usuario", schema = "lumina")
public class Usuario extends Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", nullable = false, unique = true)
    protected Long idUsuario;
    @Column(name = "email", nullable = true, unique = false)
    protected String email;
    @Column(name = "senha", nullable = false, unique = false)
    protected  String senha;

    //Methods
    @Override
    public String toString(){
        //String com interpolação para a classe Usuario
        return STR."id_usuario, nome, email, senha, situacao, dt_cadastro = [\{getIdUsuario()}, \{getNome()}, \{getEmail()}, \{getSenha()}, \{getSituacao()}, \{getDtCadastro()}]";
    }
    //Constructors
    public Usuario(){
        super();
    }
    public Usuario(String nome, String email){
        super(nome);
        this.email = email;
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

    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

}
