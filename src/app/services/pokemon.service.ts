import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Pokemon } from '../models/pokemon';

export interface PokemonResponse{
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }
  
  //Metodo get, le decimos que nos muestre solo 20 de la lista, y que empiece desde el 0. Devuelve un Observable de tipo Pokemon. El observable es una especie de "contrato" al que nos deberemos suscribir

  //Es un observable de PokemonResponse ya que tiene todos los datos del Json realmente (Es mas grande que pokemon en sí)
  //Devolvemos un Observable. Un Observable es una estructura de datos que permite manera valores asíncronos (no hace nada hasta que alguien se suscribe)
  //CLAVE CENTRAL DEL PROYECTO. Este método llama a la url, mapea los resultados, y hace Pokemons (de la clase Pokemon) con los atributos name y url. Creando instancias de la clase (1 por cada llamada)
  getPokemons(limit: number = 20, offset: number = 0): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        map(response => ({
          //Aquí lo que estamos haciendo es mapear, de manera que cada dato lo transformamos en los atributos del this.
          count: response.count, // Total de Pokémon
          next: response.next, // URL de la siguiente página
          previous: response.previous, // URL de la página anterior
          //Mapeamos cada "result" del Json (que al final es lo que define a los pokemons) a un tipo Pokemon, e instanciamos la clase con su poke.name y poke.url
          results: response.results.map(poke => {
            const pokemon = new Pokemon(poke.name, poke.url);
  
            // Obtener el tipo del Pokémon
            this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
              .subscribe(data => {
                pokemon.type = data.types[0]?.type.name || "unknown";
              });
  
            return pokemon;
          })
        }))
      );
  }
}
