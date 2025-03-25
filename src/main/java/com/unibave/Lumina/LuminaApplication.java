package com.unibave.Lumina;

import com.unibave.Lumina.model.Paciente;
import com.unibave.Lumina.model.Usuario;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LuminaApplication {

	public static void main(String[] args) {
        //SpringApplication.run(LuminaApplication.class, args);
        Paciente usuario = new Paciente();
        usuario.cadastrar();
        System.out.println(usuario);
    }
}
