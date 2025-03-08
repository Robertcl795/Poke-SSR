import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { PokemonComponent } from '../pokemon/pokemon.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonComponent],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
