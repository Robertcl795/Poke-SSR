import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemons-page',
  imports: [],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPageComponent {}
