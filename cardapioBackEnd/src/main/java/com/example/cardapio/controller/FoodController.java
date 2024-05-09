package com.example.cardapio.controller;

import com.example.cardapio.food.Food;
import com.example.cardapio.food.FoodRepository;
import com.example.cardapio.food.FoodRequestDTO;
import com.example.cardapio.food.FoodResponseDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("food")
public class FoodController {

    @Autowired//cria uma conexão facilitada com o repository
    private FoodRepository repository;//objeto para realizar operações

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Object> saveFood(@RequestBody FoodRequestDTO data){//INSERT INTO foods VALUES()
        Food foodData = new Food(data);//cria uma tupla Food com as informações de parametro
        repository.save(foodData);//coloca no BD

        return ResponseEntity.status(HttpStatus.CREATED).body("Food added Sucessfully");//Retorna sucesso
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")//de onde esta vindo a requisição (porta do bd, ex: localhost, 3301, 8080, etc.)
    //CrossOrigin = configuração do CORS, extremamente necessário configurar por motivos de segurança
    //"*" = sem configurar, qualquer um pode realizar requisições
    @GetMapping
    public ResponseEntity<List<FoodResponseDTO>> getAllFoods(){//SELECT * FROM foods
        List<FoodResponseDTO> foodList = repository.findAll().stream().map(FoodResponseDTO::new).collect(Collectors.toList());//coleta e mapeia todas as tuplas achadas para uma lista de foodResponseDTO
        //HATEOAS
        return ResponseEntity.status(HttpStatus.OK).body(foodList);//retorna a lista
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")//SELECT * FROM foods WHERE id=id
    public ResponseEntity<Object> getFood(@PathVariable(value="id") UUID id){//PathVariable extrai o valor do endpoint e o mapeia como variável
        Optional<Food> foodFound = repository.findById(id);//encontra a tupla com aquele id

        if(foodFound.isEmpty()){//se o objeto encontrado está vazio, não há tupla com aquele id
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food not found");//retorna erro
        }
        //HATEOAS
        return ResponseEntity.status(HttpStatus.OK).body(foodFound.get());//se o objeto não está vazio, há uma tupla com aquele id, logo, retorna essa tupla
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")//DELETE FROM foods WHERE id=id
    public ResponseEntity<Object> deleteFood(@PathVariable(value="id") UUID id){
        Optional<Food> foodFound = repository.findById(id);
        if(foodFound.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food not found");//se a objeto está vazio, não há tupla com o id especificado e retorna erro
        }
        repository.delete(foodFound.get());//deleta a tupla
        //foodFound = Optional, foodFound.get() = food
        return ResponseEntity.status(HttpStatus.OK).body("Food Deleted Successfully");//retorna sucesso
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateFood(@PathVariable(value="id") UUID id,
                                             @RequestBody @Valid FoodRequestDTO foodRequest){

        Optional<Food> foodFound = repository.findById(id);//faz uma requisição de food no bd e salva num objeto

        if(foodFound.isEmpty()){//se o objeto está vazio
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food not found");//retorna erro
        }

        var food = foodFound.get();//cria uma food com os valores de foodFound (copia os valores antigos)
        BeanUtils.copyProperties(foodRequest, food);//copia o conteúdo da dto para o objeto criada (atualiza os valores, exceto id, pois usuario nao tem acesso)

        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(food));//salva o objeto no BD, atualizando os valores
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteAllFoods(){//DELETE FROM foods
        repository.deleteAll();
        return ResponseEntity.status(HttpStatus.OK).body("All Foods Deleted");
    }
}
