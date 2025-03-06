import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentListComponent } from './Components/content-list/content-list.component';
import { PruebaComponent } from './Components/prueba/prueba.component';
import { PokemonDetailsComponent } from './Components/pokemon-details/pokemon-details.component';
import { ProjectInfoComponent } from './Components/project-info/project-info.component';

//Aquí gestiono las rutas de mi aplicativo. '' para que me salga el componente cuando estoy en localhost, prueba, por ejemplo, me hace acceder al componente prueba.
const routes: Routes = [
  { path: '', component: ContentListComponent},
  { path: 'prueba', component: PruebaComponent},
  { path: 'pokemon/:id', component: PokemonDetailsComponent},
  { path: 'project-info', component: ProjectInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
