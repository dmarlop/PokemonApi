import { Component, OnInit } from '@angular/core';
import { PokemonDetail } from '../../models/PokemonDetail';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../../services/pokemon.service';


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

  constructor(private route: ActivatedRoute, private http: HttpClient, private pokemonService: PokemonService){}

  //Cogemos el id que hemos capturado en el OnInit y lo utilizamos para aceder a la info concreta de ese pokemon, la otra parte url se la plantamos a mano, no hay problema
  getPokemonDetails(): void {
    this.pokemonService.getPokemonDetails(this.id).subscribe(
      (data) => {
        this.pokemon = data;
        console.log(this.pokemon);
      },
      (error) => {
        console.log("Error al obtener detalles del Pokémon:", error);
      }
    );
  }

  getColorByType(type: string): string {
    return this.pokemonService.getColorByType(type);
  };

}
