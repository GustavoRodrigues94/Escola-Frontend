import { IAluno } from './../../interfaces/IAluno';
import { AlunoService } from './../../services/aluno.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IEscolaridade } from 'src/app/interfaces/IEscolaridade';

@Component({
  selector: 'app-cadastar-alterar-alunos',
  templateUrl: './cadastar-alterar-alunos.component.html',
  styleUrls: ['./cadastar-alterar-alunos.component.scss']
})
export class CadastarAlterarAlunosComponent implements OnInit {
  public mostrarCarregamento : boolean = false;
  public formAluno!: FormGroup;
  public alterandoAluno: boolean = false;
  public listaEscolaridade: IEscolaridade[] = [];
  public exibirHistoricoEscolar: boolean = false;
  public nomeHistoricoEscolar!: string;

  constructor(private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.params.subscribe(params => {
        const idAluno = params['id'];
        if(idAluno !== undefined)
          this.obterAluno(idAluno);
     });
    };

  ngOnInit() {
    this.criarForm();
    this.obterListaEscolaridade();
  }

  criarForm(){
    this.formAluno = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required]],
      escolaridadeId: ['', [Validators.required]],
      historicoEscolarImagem: ['', [Validators.required]]
    });
  }

  filtrarDataNascimento = (d: Date | null): boolean => {
    const data = (d || new Date());
    const dataAtual = new Date();

    return data < dataAtual;
  };

  obterAluno(idAluno: string){
    this.mostrarCarregamento = true;

    this.alunoService.obterAluno(idAluno).subscribe(resposta => {
      this.formAluno.patchValue({
        id: resposta.id,
        nome: resposta.nome,
        sobrenome: resposta.sobrenome,
        email: resposta.email,
        dataNascimento: resposta.dataNascimento,
        escolaridadeId: resposta.escolaridade.id
      });

      this.nomeHistoricoEscolar = `${resposta.historicoEscolar.nome}${resposta.historicoEscolar.formatoHistoricoDescricao}`;

      this.alterandoAluno = true;
      this.exibirHistoricoEscolar = true;
      this.mostrarCarregamento = false;
    });
  }

  obterListaEscolaridade() {
    this.mostrarCarregamento = true;

    this.alunoService.obterListaEscolaridade().subscribe((listaEscolaridade: IEscolaridade[]) => {
      this.listaEscolaridade = listaEscolaridade;
      this.mostrarCarregamento = false;
    })
  }

  cadastrarAlterar(){
    if(this.formAluno.invalid && !this.exibirHistoricoEscolar) return;

    const formData: FormData = this.adicionarHistoricoEscolarFormData();
    this.adicionarAlunoFormData(formData);

    const alunoId = this.formAluno?.get('id')?.value;
    if(alunoId == '')
      this.adicionarAluno(formData);
    else
      this.alterarAluno(formData);
  }

  private adicionarAlunoFormData(formData: FormData) {
    const alunoRawValue = this.formAluno.getRawValue() as IAluno;

    formData.append('jsonAluno', JSON.stringify({
      id: alunoRawValue.id,
      nome: alunoRawValue.nome,
      sobrenome: alunoRawValue.sobrenome,
      email: alunoRawValue.email,
      dataNascimento: alunoRawValue.dataNascimento,
      escolaridadeId: alunoRawValue.escolaridadeId
    } as IAluno));
  }

  private adicionarHistoricoEscolarFormData() {
    const formData: FormData = new FormData();
    if(this.exibirHistoricoEscolar){
      formData.append('historicoEscolar', '');
      return formData;
    }

    formData.append('historicoEscolar', this.formAluno?.get('historicoEscolarImagem')?.value.files[0]);
    return formData;
  }

  alterarAluno(aluno: FormData) {
    this.alunoService.alterar(aluno).subscribe(resposta => {
      if (!resposta.sucesso){
        this.abrirMensagem("Erro!", resposta.mensagem);
        return;
      }

      this.abrirMensagem("Sucesso!", "Aluno(a) alterado(a) com sucesso");
      this.router.navigate(['']);
    });
  }

  adicionarAluno(aluno: FormData) {
     this.alunoService.adicionar(aluno).subscribe(resposta => {

      console.log(resposta);
      if (!resposta.sucesso){
        this.abrirMensagem("Erro!", resposta.mensagem);
        return;
      }

      this.abrirMensagem("Sucesso!", "Aluno(a) adicionado(a) com sucesso");
      this.router.navigate(['']);
    });
  }

  removerHistoricoEscolar(){
    this.exibirHistoricoEscolar = false;
  }

  abrirMensagem(titulo: string, mensagem: string) {
    this.snackBar.open(titulo, mensagem, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });

  }
}
