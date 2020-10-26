import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Injectable, ViewChildren } from '@angular/core';

import { LanguageStorageService } from '../../services/language-storage.service';
import { TranslatorService } from '../../services/translator.service';
import { Language } from '../../shared/language';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css'],
})
@Injectable()
export class TranslatorComponent {
  @ViewChildren('languagesElement') list: any;
  private _languages: Language[] = [];
  private ORIGIN_LANGUAGES_INCORRECT =
    'The origin languages ​​are not correct. Check them and try again';
  private EMPTY_LANGUAGES = 'There are no languages';

  dragDisabled = false;

  constructor(
    private _languageService: LanguageStorageService,
    private _translatorService: TranslatorService
  ) {}

  ngOnInit(): void {
    this.languages = this._languageService.getLanguagesInLocalStorage();
  }

  drop(evento: CdkDragDrop<any>) {
    moveItemInArray(this._languages, evento.previousIndex, evento.currentIndex);
    this.languages = this._languages;
  }

  translate() {
    if (this.languages.length < 1) {
      alert(this.EMPTY_LANGUAGES);
      return;
    }
    const languagesOrigin: Language[] = this.languages.filter(
      (e) => e.originLanguage
    );

    if (languagesOrigin.length != 1) {
      alert(this.ORIGIN_LANGUAGES_INCORRECT);
      return;
    }

    this.languages = this._translatorService.translate(this.languages);
  }

  get languages(): Language[] {
    return this._languages;
  }
  set languages(languages: Language[]) {
    this._languages = languages;
    this._languageService.setLanguagesInLocalStorage(this._languages);
  }
  saveOnLocalStorage() {
    this.dragDisabled = false;
    this._languageService.setLanguagesInLocalStorage(this.languages);
  }
}
