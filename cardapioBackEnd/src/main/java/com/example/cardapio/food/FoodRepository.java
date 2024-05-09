package com.example.cardapio.food;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FoodRepository extends JpaRepository<Food, UUID>{//entity, tipo de id
//operações para manipular bds (findyById(), getAll(), save(), etc.)
}
