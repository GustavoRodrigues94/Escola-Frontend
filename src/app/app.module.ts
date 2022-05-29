import { CadastarAlterarAlunosComponent } from './pages/cadastar-alterar-alunos/cadastar-alterar-alunos.component';
import { ListaAlunosComponent } from './pages/lista-alunos/lista-alunos.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    ListaAlunosComponent,
    CadastarAlterarAlunosComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-Br'},],
  bootstrap: [AppComponent]
})
export class AppModule { }
