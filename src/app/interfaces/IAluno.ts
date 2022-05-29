import { IHistoricoEscolar } from './IHistoricoEscolar';
import { IEscolaridade } from './IEscolaridade';
export interface IAluno {
  id: string,
  nome: string,
  sobrenome: string,
  email: string,
  dataNascimento: Date,
  escolaridadeId: string,
  escolaridade: IEscolaridade,
  historicoEscolar: IHistoricoEscolar
}
