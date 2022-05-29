import { MatSnackBar } from '@angular/material/snack-bar';
import { IHistoricoEscolar } from './../../interfaces/IHistoricoEscolar';
import { AlunoService } from './../../services/aluno.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAluno } from 'src/app/interfaces/IAluno';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lista-alunos',
  templateUrl: './lista-alunos.component.html',
  styleUrls: ['./lista-alunos.component.scss']
})
export class ListaAlunosComponent implements OnInit {

  public mostrarCarregamento: boolean = false;
  public colunasTabela: string [] = ['Nome', 'Email', 'DataNascimento', 'Escolaridade', 'Historico', 'Ações'];
  public dataSource = new MatTableDataSource<IAluno>();

  @ViewChild(MatPaginator) paginacao!: MatPaginator;

  constructor(private alunoService: AlunoService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.obterAlunos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginacao;
  }

  ngOnDestroy() : void {
    this.dataSource.disconnect();
  }

  obterAlunos() {
    this.mostrarCarregamento = true;

    this.alunoService.obterAlunos().subscribe((alunos: IAluno[]) => {
      this.dataSource.data = alunos;
      this.mostrarCarregamento = false;
    })
  }

  baixarHistorico(historicoEscolar: IHistoricoEscolar) {
    const byteCharacters = atob(historicoEscolar.historicoBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], {type: 'arraybuffer'});
    FileSaver.saveAs(blob, `${historicoEscolar.nome}${historicoEscolar.formatoHistoricoDescricao}`);
  }

  deletarAluno(aluno: IAluno){
    this.mostrarCarregamento = true;

    this.alunoService.deletar(aluno.id).subscribe(resposta => {
      this.mostrarCarregamento = false;

      if(resposta.sucesso){
        this.abrirMensagem("Sucesso!", "Aluno deletado(a) com sucesso");
        this.atualizarDataSource(aluno);
      }
    });
  }

  abrirMensagem(titulo: string, mensagem: string) {
    this.snackBar.open(titulo, mensagem, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  atualizarDataSource(alunoParaRemover: IAluno){
    const index = this.dataSource.data.indexOf(alunoParaRemover);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

}
