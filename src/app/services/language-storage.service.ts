import { Language } from '../shared/language';

export class LanguageStorageService {
  constructor() {}

  public setLanguagesInLocalStorage(languages: Language[]) {
    localStorage.setItem('languages', JSON.stringify(languages));
  }

  public getLanguagesInLocalStorage(): Language[] {
    let languages: Language[] = [];
    if (localStorage.getItem('languages')) {
      languages = JSON.parse(localStorage.getItem('languages'));
    }
    return languages;
  }
}
