import { IEscolaridade } from './../interfaces/IEscolaridade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAluno } from '../interfaces/IAluno';
import { IGenericoResultado } from '../interfaces/IGenericoResultado';

const apiUrlAluno = `${environment.apiUrl}aluno`;

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private httpClient: HttpClient) { }

  obterAlunos() : Observable<IAluno[]> {
    return this.httpClient.get<IAluno[]>(`${apiUrlAluno}/todos`)
  }

  obterAluno(idAluno: string) : Observable<IAluno>{
    return this.httpClient.get<IAluno>(`${apiUrlAluno}/${idAluno}`)
  }

  adicionar(aluno: FormData) : Observable<IGenericoResultado> {
    return this.httpClient.post<IGenericoResultado>(apiUrlAluno, aluno);
  }

  alterar(aluno: FormData) {
    return this.httpClient.put<IGenericoResultado>(apiUrlAluno, aluno);
  }

  deletar(alunoId: string) : Observable<IGenericoResultado>{
    return this.httpClient.delete<IGenericoResultado>(`${apiUrlAluno}/${alunoId}`);
  }

  obterListaEscolaridade() : Observable<IEscolaridade[]> {
    return this.httpClient.get<IEscolaridade[]>(`${apiUrlAluno}/escolaridade`);
  }
}
