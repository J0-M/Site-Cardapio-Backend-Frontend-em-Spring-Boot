export interface FoodData{//interface de dados utilizados na aplicação, no caso, food
    id?: string, // ? = operador que indica que a variavel é opcional, não é necessário ter ela como parametro pra chamar funções
    title: string,
    image: string,
    price: number
}
//funciona como se fosse uma declaração de classe, só que no frontend