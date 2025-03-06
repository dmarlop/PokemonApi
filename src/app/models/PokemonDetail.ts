
//Creamos interfaz de tipo PokemonDetail, esto almacena los 4-5 atributos que queremos del JSON que nos viene del pokemon
//Util, así en elf uturo podremos hacer PokemonDetail.(loquesea) para acceder a un atributo
export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: { slot: number; type: { name: string } }[];
    moves: { move: { name: string } }[];
  }
  