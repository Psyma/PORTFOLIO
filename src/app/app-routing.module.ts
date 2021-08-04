import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathfindingComponent } from './algorithm/pathfinding/pathfinding.component';
import { SortingComponent } from './algorithm/sorting/sorting.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
	{ path: 'portfolio', component: PortfolioComponent },
	{ path: 'resume', component: ResumeComponent },
	{ path: 'sorting', component: SortingComponent },
	{ path: 'pathfinding', component: PathfindingComponent },
	{ path: '', redirectTo: '/resume', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
