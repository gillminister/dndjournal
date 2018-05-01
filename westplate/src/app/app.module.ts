import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { AppComponent } from './app.component';
import { AbilityComponent } from './component/character/ability/ability.component';
import { CharacterComponent } from './component/character/character.component';


@NgModule({
  declarations: [
    AppComponent,
    AbilityComponent,
    CharacterComponent
  ],
  imports: [
    BrowserModule,
	FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
