import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
@Component({
  selector: 'app-content-list',
  standalone: false,
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.css'
})

export class ContentListComponent implements OnInit {

  //Atributos que tiene nuestro Content list, estos atributos salen del Json que recibimos (y los podremos usar donde queramos)
  public pokemons: Pokemon[] = [];
  public numPag: number = 1;
  public limit: number = 20;
  public count: number = 0;
  public next: string | null = null;
  public previous: string | null = null;

  //Inyección por dependencias de nuestro pokemonService, para poder usar luego su método getPokemons();
  constructor(private pokemonService: PokemonService){}

  //On init (es decir, al iniciar la página) llamamos a getPokemons, definido mas abajo.
  ngOnInit(): void {
    this.getPokemons();
  }

//CLAVE CENTRAL DEL PROYECTO. este método es nuestra piedra angular, ya que lo que hace es hacer 1 llamada a la función getPokemons del service, mapea los datos del JSON a nuestros atributos.
  getPokemons(): void {
    //El offset es el pokemon desde el que empieza. Es decir, si el numpag es 1, empieza desde el 0, porque 1-1 = 0, 0*20= 0
    const offset = (this.numPag -1)* this.limit; // Usamos el tamaño actual como offset
    this.pokemons= [];
    //Nos debemos suscribir al método porque angular no hace nada hasta que alguien no se suscribe
    this.pokemonService.getPokemons(this.limit, offset).subscribe(
      (data) => {
  
        let { count, next, previous, results } = data; //Extraemos los datos del JSON y los rompemos en 4 variables (results serán nuestros pokemons)
        this.count = count; // Guardamos el total de Pokémon
        this.next = next; // Guardamos el enlace a la siguiente página
        this.previous = previous; // Guardamos el enlace a la página anterior
        let newPokemons = results; // Los Pokémon ya están transformados en el servicio
        //Estos datos los podemos utilizar en distintos sitios, por ejemplo, en la paginación, o el count, para mostrar la lista de pokemons totales
        this.pokemons = [...this.pokemons, ...newPokemons]; // Acumulamos en lugar de reemplazar asi podemos acumular todos los pokemons
        console.log("Pokémon cargados:", this.pokemons);
      },
      (error) => {
        console.error('Error al obtener más Pokémon:', error);
      }
    );
}


//metodo para encajar cada tipo con un color. Aquí recibimos el tipo, (será un string con el nombre grass, o fire) y le asignamos un color. devolverá el string del color, y lo usaremos luego. 
getColorByType(type: string): string {
  const typeColors: { [key: string]: string } = {
      grass: "#78C850",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
      unknown: "#A8A878" // Color neutro si no tiene tipo
  };

  return typeColors[type] || "#A8A878"; // Si el tipo no está en la lista, usamos gris
}
//Volvemos a llamar a la función para volver a traernos 20 pokemons, el numpag determinará si nos traemos los 20 primeros, o los 20 siguientes sucesivamente
nextPage(): void {
  if (this.next) { // Solo avanzamos si hay una página siguiente
      this.numPag++;
      this.getPokemons();
  }
}

previousPage(): void {
  if (this.previous && this.numPag > 1) { // Solo retrocedemos si hay página anterior
      this.numPag--;
      this.getPokemons();
  }
}



}
