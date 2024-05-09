package com.example.cardapio.food;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

//a tabela será criada automaticamente no bd
@Table(name="foods")//nome da tabela, ao ser criada no bd
@Entity(name="foods")
@Getter//gera todos os gets
@NoArgsConstructor//gera um construtor sem argumentos
@AllArgsConstructor//gera um construtor com todos os argumentos
@EqualsAndHashCode(of="id")//id = representação unica da classe
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)//gera ids automaticamente (usuario não tem acesso aos ids)
    private UUID id;//UUID = id criptografado, por motivos de segurança
    private String title;
    private String image;//imagem = string, pois é uma URL
    private float price;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    //Lombok ja possui os getters e setters da classe, mas adicionei pq a configuração tava zuada

    public Food(FoodRequestDTO data){//converte um foodRequestDTO (informações de parametro para funções) para a entidade food
        this.image = data.image();
        this.title = data.title();
        this.price = data.price();
    }
}
