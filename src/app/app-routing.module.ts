import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './web/home/home.component';
import { GamesManagementComponent } from './web/games-management/games-management.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games-management', component: GamesManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
