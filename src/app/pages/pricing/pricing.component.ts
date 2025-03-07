import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('PokeSSR Pricing');
    this.meta.updateTag({ name: 'description', content: 'PokeSSR pricing plans' });
    this.meta.updateTag({ name: 'og:title', content: 'PokeSSR Pricing' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'PokeSSR,RockerLabs,Angular19,Pricing',
    });
  }
}
