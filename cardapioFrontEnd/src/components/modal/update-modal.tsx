import { useState } from "react";
import { FoodData } from "../../interface/FoodData";

import "./modal.css";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface InputProps{
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface UpdateModalProps {
    closeModal(): void;
    foodToUpdate: FoodData; // Novo prop para receber o item de comida a ser atualizado
}

const Input = ({label, value, updateValue}: InputProps) =>{
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )   
}

export function UpdateModal({closeModal, foodToUpdate}: UpdateModalProps){
    const API_URL = 'http://localhost:8081';

    const queryClient = useQueryClient();

    const [title, setTitle] = useState(foodToUpdate.title || "");//forneça uma string vazia como valor inicial caso o título seja undefined
    const [price, setPrice] = useState(foodToUpdate.price || 0);//forneça 0 como valor inicial caso o price seja undefined
    const [image, setImage] = useState(foodToUpdate.image || "");//forneça uma string vazia como valor inicial caso o image seja undefined

    const submit = async() => {
        const updatedFoodData: FoodData = {
            ...foodToUpdate, //Mantém o ID original e outras propriedades que não foram atualizadas
            title,
            price,
            image
        };

        await axios.put(`${API_URL}/food/${foodToUpdate.id}`, updatedFoodData);//passa o id como parametro para a função, assim, não se cria uma nova food com valores iguais, apenas atualiza a existente
        //axios.put = função axios para realizar a função put da API rest backend, passando como parametro no endpoint o id a sofrer update

        queryClient.invalidateQueries(['food-data']);//refaz a consulta do grid

        closeModal();
    };

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Atualize um item no cardápio</h2>
                <form className="input-container">
                    <Input label="Title:" value={title} updateValue={setTitle}/>
                    <Input label="Price:" value={price} updateValue={setPrice}/>
                    <Input label="Image Link:" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">Update</button>

            </div>
        </div>
    )
}