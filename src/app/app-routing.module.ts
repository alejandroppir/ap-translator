import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigComponent } from './components/config/config.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { TranslatorComponent } from './components/translator/translator.component';

const routes: Routes = [
  { path: 'translator', component: TranslatorComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'home', component: PresentationComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
