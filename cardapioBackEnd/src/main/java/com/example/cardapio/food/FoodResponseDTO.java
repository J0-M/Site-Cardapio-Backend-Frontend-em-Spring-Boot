package com.example.cardapio.food;

import java.util.UUID;

public record FoodResponseDTO(UUID id, String title, String image, float price) {//classe para retornar foods
    public FoodResponseDTO(Food food){//converte food para reponse, para que possa ser retornado
        this(food.getId(), food.getTitle(), food.getImage(), food.getPrice());
    }
}
