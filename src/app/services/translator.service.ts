import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Language } from '../shared/language';

@Injectable()
export class TranslatorService {
  private ORIGIN_LANGUAGES_INCORRECT =
    'The origin languages ​​are not correct. Check them and try again';

  private ERROR_IN_TRANSLATION = 'Error in translation';

  constructor(private http: HttpClient) {}

  public translate(languages: Language[]) {
    const languagesOrigin: Language[] = languages.filter(
      (e) => e.originLanguage
    );
    if (languagesOrigin.length != 1) {
      alert(this.ORIGIN_LANGUAGES_INCORRECT);
      return;
    }

    const languageOrigin: Language = languagesOrigin[0];

    let observables: { obs: Observable<any>; languageTo: string }[] = [];

    languages
      .filter((e) => !e.originLanguage)
      .forEach((langTo) => {
        observables.push({
          obs: this.translateTextRequest(
            this.http,
            this.getTranslationUrl(
              languageOrigin.languageId,
              langTo.languageId,
              languageOrigin.translation
            )
          ),
          languageTo: langTo.languageId,
        });
      });

    observables.forEach(async (observable) => {
      let translatedRow = languages.filter(
        (e) => e.languageId == observable.languageTo
      );
      let translatedText: string = '';
      await observable.obs
        .toPromise()
        .then(
          (res) => {
            let lines: [] = res[0];
            lines.forEach((line) => {
              translatedText = translatedText + line[0];
              translatedRow[0].translation = translatedText;
            });
          },
          (err) => {
            translatedText = this.ERROR_IN_TRANSLATION;
            translatedRow[0].translation = translatedText;
          }
        )
        .catch((error) => {
          translatedText = this.ERROR_IN_TRANSLATION;
          translatedRow[0].translation = translatedText;
        });
    });

    return languages;
  }

  protected translateTextRequest(
    http: HttpClient,
    url: string
  ): Observable<any> {
    return http.get(url);
  }

  private getTranslationUrl(
    languageFrom: string,
    languageTo: string,
    textToTranslate: string
  ) {
    return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${languageFrom}&tl=${languageTo}&dt=t&q=${encodeURI(
      textToTranslate
    )}`;
  }
}
