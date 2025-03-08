import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PokemonListComponent } from '../../shared/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from '../../shared/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../shared/services/pokemon.service';
import { SimplePokemon } from '../../shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // });

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(console.log);
    console.log(this.currentPage());

    this.loadPokemons();
    // title
    // Meta-tags
    // Stable
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    // console.log({ pageToLoad, currentPage: this.currentPage() });

    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }
}
