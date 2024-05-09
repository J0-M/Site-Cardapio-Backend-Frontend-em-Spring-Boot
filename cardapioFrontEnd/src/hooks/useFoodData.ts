import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8081';//endereço em que a API backend está rodando

//função assíncrona que faz uma solicitação HTTP GET para a URL da API usando axios
const fetchData = async(): AxiosPromise<FoodData[]> =>{//função do tipo axiosPromise (retorno da API) e o tipo de dado retornado (interface utilizada no frontend para aquele tipo de dado)
    const response = axios.get(API_URL + '/food');//URL + endpoint utilizado (+ = concatenação de strings)
    //get = retrieve nos dados do banco de dados, operação de consulta
    
    return response;
}//função assincrona que dispara as requisições http

export function useFoodData(){//hooks são as funções responsáveis por acessar e retornar os dados do backend para o frontend
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2
    })
    /*queryFn: A função que será chamada para executar a consulta de dados, que é a função fetchData que definimos anteriormente.
      queryKey: Uma chave única para esta consulta, que é uma matriz de strings contendo apenas uma string neste caso.
      retry: Número de tentativas de retransmissão da consulta em caso de falha.
    */

    return{
        ...query,
        data: query.data?.data
    }
}