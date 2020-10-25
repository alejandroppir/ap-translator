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
  _languages: Language[] = [];

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
    this._languageService.setLanguagesInLocalStorage(this.languages);
  }
}
