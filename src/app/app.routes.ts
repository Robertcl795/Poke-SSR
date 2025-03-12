import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemons/page/1',
    pathMatch: 'full',
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon-details/pokemon-details.component'),
  },
  {
    path: '**',
    redirectTo: 'pokemons/page/1',
  },
];
