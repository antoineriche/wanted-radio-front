import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesManagementComponent } from './web/games-management/games-management.component';
import { TheShowComponent } from './web/the-show/the-show.component';
import { PickAnArtistComponent } from './web/pick-an-artist/pick-an-artist.component';
import { PrepareShowComponent } from './web/prepare-show/prepare-show.component';


const routes: Routes = [
  { path: '', component: PickAnArtistComponent },
  { path: 'the-show/:artistType/:artistName', component: TheShowComponent },
  { path: 'games-management', component: GamesManagementComponent },
  { path: 'prepare-show', component: PrepareShowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
