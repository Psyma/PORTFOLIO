import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PathfindingComponent } from './algorithm/pathfinding/pathfinding.component';
import { SortingComponent } from './algorithm/sorting/sorting.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pathfinding', component: PathfindingComponent },
  { path: 'sorting', component: SortingComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
