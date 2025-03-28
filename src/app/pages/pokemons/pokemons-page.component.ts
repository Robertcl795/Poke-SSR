import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonListComponent } from '../../shared/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from '../../shared/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../shared/services/pokemon.service';
import { SimplePokemon } from '../../shared/interfaces';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);

  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChanged = effect(
    () => {
      this.loadPokemons(this.currentPage());
    },
    {
      allowSignalWrites: true,
    }
  );

  public loadPokemons(page = 0) {
    this.pokemonsService
      .loadPage(page)
      .pipe(tap(() => this.title.setTitle(`Pokémons SSR - Page ${page}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
