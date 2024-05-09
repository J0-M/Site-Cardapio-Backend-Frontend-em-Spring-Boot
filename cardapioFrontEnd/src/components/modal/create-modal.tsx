import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

import "./modal.css";//estilização da janela de cadastro

{/*Função de formulário para registrar uma food pelo frontend*/}

interface InputProps{//define uma interface para os props do componente Input
    label: string,//rótulo do input
    value: string | number,//valor do input
    updateValue(value: any): void//função para atualizar o valor do input
}

interface ModalProps{
    closeModal(): void
}

const Input = ({label, value, updateValue}: InputProps) =>{//componente funcional Input que recebe os props definidos na interface InputProps
    return(
        <>
            <label>{label}</label>{/* Rótulo do input */}
            <input value={value} onChange={event => updateValue(event.target.value)}></input>{/* Input controlado que atualiza o valor usando a função updateValue quando o valor é alterado */}
        </>
    )   
}

export function CreateModal({closeModal}: ModalProps){

    //declaração de estados usando o hook useState do axios
    const [title, setTitle] = useState("");//estado inicial para o nome
    const [price, setPrice] = useState(0);//estado inicial para o preço
    const [image, setImage] = useState("");//estado inicial para a imagem
    //useState = hook para criar variavel que retorna o valor a ser salvo e uma função de atualização
    //set<Variavel> é uma função que serve para que o react saiba que, quando esta função é chamada, o valor do componente é atualizado e ele re-renderiza o html
    //mais facil imaginar como um "UPDATE CASCADE" visto que o react i´ra renderizar todo o html onde a variavel atualizada é utilizada

    const {mutate, isSuccess, isLoading} = useFoodDataMutate(); // evento para atualizar food

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    }, [isSuccess])//hook que executa procedimentos com base nos valores colocados no array, neste caso, isSucess
    //se isSucess for true (postado com sucesso), fecha a janela modal na pagina principal

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }

        mutate(foodData)
    } // evento para chamada de função mutate

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Title:" value={title} updateValue={setTitle}/>{/* Componente Input para o nome */}
                    <Input label="Price:" value={price} updateValue={setPrice}/>{/* Componente Input para o preço */}
                    <Input label="Image Link:" value={image} updateValue={setImage}/>{/* Componente Input para a imagem */}
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'Posting...': 'Post'}
                </button>{/*se isLoading for true (função useFoodMutate ainda executando) altera o texto do botão*/}

            </div>
        </div>
    )
}