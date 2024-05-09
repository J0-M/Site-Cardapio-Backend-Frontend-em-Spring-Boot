package com.example.cardapio.food;

public record FoodRequestDTO(String title, String image, float price) {//classe de requisição de food (para parametros no controller)
}
