import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About PokeSSR');
    this.meta.updateTag({ name: 'description', content: 'More information about PokeSSR' });
    this.meta.updateTag({ name: 'og:title', content: 'About PokeSSR' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'PokeSSR,RockerLabs,Angular19',
    });
  }
}
