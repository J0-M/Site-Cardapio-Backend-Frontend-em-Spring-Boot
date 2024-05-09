package com.example.cardapio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CardapioApplication {

	public static void main(String[] args) {
		SpringApplication.run(CardapioApplication.class, args);
	}

}

//arquivo pom.xml contém todas as dependencias do projeot, ou seja,as bibliotecas utilizadas pelo spring
//para adicionar uma nova dependencia para uma funcionalidade nova, utilize o spring initalizr e veja a dependencia correspondente no explore
//IMPORTANTE: só inicializar a aplicação no servidor somente quando o flyaway estiver devidamente escrito e configurado, para evitar erros de atuzalização de migrations