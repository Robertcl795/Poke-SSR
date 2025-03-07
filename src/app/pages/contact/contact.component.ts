import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('PokeSSR Contact');
    this.meta.updateTag({ name: 'description', content: 'How to contact PokeSSR' });
    this.meta.updateTag({ name: 'og:title', content: 'PokeSSR Contact' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'PokeSSR,RockerLabs,Angular19',
    });
  }
}
