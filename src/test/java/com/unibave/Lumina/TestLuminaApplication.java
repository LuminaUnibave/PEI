package com.unibave.Lumina;

import org.springframework.boot.SpringApplication;

public class TestLuminaApplication {

	public static void main(String[] args) {
		SpringApplication.from(LuminaApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
