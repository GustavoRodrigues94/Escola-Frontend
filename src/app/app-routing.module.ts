import { CadastarAlterarAlunosComponent } from './pages/cadastar-alterar-alunos/cadastar-alterar-alunos.component';
import { ListaAlunosComponent } from './pages/lista-alunos/lista-alunos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListaAlunosComponent },
  { path: 'aluno', component: CadastarAlterarAlunosComponent },
  { path: 'aluno/:id', component: CadastarAlterarAlunosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
