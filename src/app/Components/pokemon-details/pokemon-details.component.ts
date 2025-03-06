import { Component, OnInit } from '@angular/core';
import { PokemonDetail } from '../../models/PokemonDetail';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pokemon-details',
  standalone: false,
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent  implements OnInit {
  pokemon: PokemonDetail | null = null;
  id: number = 0;


  ngOnInit(): void {
    //Con este método, al iniciar el componente, cogemos el id de la ruta, es decir, de la URL. 
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getPokemonDetails();
  }

  constructor(private route: ActivatedRoute, private http: HttpClient){}

  //Cogemos el id que hemos capturado en el OnInit y lo utilizamos para aceder a la info concreta de ese pokemon, la otra parte url se la plantamos a mano, no hay problema
  getPokemonDetails(): void{
    //Nos suscribimos, recordemos que es asíncrono, hasta que no te suscribes, no hace nada
    this.http.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${this.id}`).subscribe(
      (data)=>{
        this.pokemon = data;
        console.log(this.pokemon);
      },
    (error)=>{
      console.log("Error al obtener detalles del pokemon:'", error);
    })
  }

  getColorByType(type: string | undefined): string {
    if (!type) return "#A8A878"; // Si no hay tipo, devuelve un color gris por defecto

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
        unknown: "#A8A878" // Color por defecto
    };

    return typeColors[type] || "#A8A878"; // Si el tipo no está en la lista, usa gris
}


}
