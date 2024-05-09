import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateModal } from '../modal/update-modal';

import "./card.css"

interface CardProps{
    id: string,
    price: number,
    title: string,
    image: string
}

export function Card( {price, image, title, id} : CardProps){

    const API_URL = 'http://localhost:8081';

    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false); //estado para controlar a exibição da modal

    const deleteFood = async() =>{ 
        await axios.delete(`${API_URL}/food/${id}`);//acentos de crase, não aspas, pois assim o que está dentro não é necessariamente uma string
        //axios.delete = função axios que acessa a função de deletar da api backend

        queryClient.invalidateQueries(['food-data']);//refaz a consulta do grid, para não exibir mais a food deletada
    }

    const handleUpdateClick = () => {
        setIsModalOpen(true); // Abre a modal quando o botão "Update" é clicado
    };

    return(
        <div className="card">
            <img src={image}/>
            <h2>{title}</h2>
            <p><b>Price:</b>${price}</p>
            <button className="updateButton" onClick={handleUpdateClick}>Update</button>
            <button className="deleteButton" onClick={deleteFood}>Delete</button>

            {/* Renderiza a modal de atualização se isModalOpen for true */}
            {isModalOpen && (
                <UpdateModal
                    closeModal={() => setIsModalOpen(false)} // Passa uma função para fechar a modal como prop
                    foodToUpdate={{ id, price, title, image }} // Passa os dados da comida a ser atualizada como prop
                />
            )}
        </div>
    )
}

