package com.unibave.Lumina.model;
import com.unibave.Lumina.interfaces.ICadastro;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "usuario", schema = "lumina")
public class Usuario extends Pessoa implements ICadastro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", nullable = false, unique = true)
    protected Long idUsuario;
    @Column(name = "email", nullable = true, unique = false)
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
