import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import { LanguageStorageService } from '../../services/language-storage.service';
import { Language } from '../../shared/language';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  languages: Language[] = [];
  private INSERT_PARAMETERS_REQUIRED = 'You need to specify both languages';
  private DUPLICATED_PARAMETERS =
    'You insert one language that is already in use';

  newLanguageId: string = '';
  newLanguageDesc: string = '';
  newOriginLanguage: boolean = false;

  constructor(private _languageService: LanguageStorageService) {}

  ngOnInit(): void {
    this.languages = this._languageService.getLanguagesInLocalStorage();
  }

  drop(event: CdkDragDrop<any>): void {
    moveItemInArray(this.languages, event.previousIndex, event.currentIndex);
    this._languageService.setLanguagesInLocalStorage(this.languages);
  }

  addLanguage(): void {
    if (
      !this.newLanguageId ||
      !this.newLanguageId.trim().length ||
      !this.newLanguageDesc ||
      !this.newLanguageDesc.trim().length
    ) {
      alert(this.INSERT_PARAMETERS_REQUIRED);
      return;
    }
    if (
      this.languages.map((l) => l.languageId).indexOf(this.newLanguageId) >= 0
    ) {
      alert(this.DUPLICATED_PARAMETERS);
      return;
    }

    const originLanguage: boolean =
      this.languages.length == 0 ? true : this.newOriginLanguage || false;
    if (originLanguage) {
      this.setAllLanguagesAsNotOrigin();
    }
    this.languages.push({
      languageId: this.newLanguageId,
      languageDesc: this.newLanguageDesc,
      originLanguage,
      translation: '',
    });

    this._languageService.setLanguagesInLocalStorage(this.languages);
    this.clearAddFields();
  }
  clearAddFields(): void {
    this.newLanguageDesc = '';
    this.newLanguageId = '';
    this.newOriginLanguage = false;
  }

  setAllLanguagesAsNotOrigin(): void {
    this.languages.forEach((e) => (e.originLanguage = false));
  }

  deleteLanguage(languageId: string): void {
    this.languages = this.languages.filter(
      (item) => item.languageId !== languageId
    );
    this._languageService.setLanguagesInLocalStorage(this.languages);
  }

  changeOriginLanguageValue(): void {
    this.newOriginLanguage = !this.newOriginLanguage;
  }
  setThisLanguageAsOrigin(languageIndex: number): void {
    this.setAllLanguagesAsNotOrigin();
    this.languages[languageIndex].originLanguage = true;
    this._languageService.setLanguagesInLocalStorage(this.languages);
  }
}
