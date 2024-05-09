import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8081';


const postData = async(data: FoodData): AxiosPromise<any> =>{//por se tratar de uma função post, não é necessário retornar uma promise específica
    //data é necessário poassar como parametro pois é necessário ter os dados a serem inseridos
    const response = axios.post(API_URL + '/food', data);
    //post = operação de insert no bd
    
    return response;
}

export function useFoodDataMutate(){//função que cadastra uma nova food
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
        }
    })
    {/* invalidateQueries() = quando o componente for postado com sucesso, invalida as querys anteriores com valores desatualizados, ou seja, refaz o get trazendo o novo elemento cadastrado*/}

    return mutate;
}