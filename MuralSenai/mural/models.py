from django.db import models
from django.contrib.auth.hashers import make_password



class Login(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100, default='default_password')

    def __str__(self):
        return self.username


class Cadastro(models.Model):
    nome = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    profissao = models.CharField(max_length=100)
    criarsenha = models.TextField(max_length=1000)

    def set_senha(self, raw_password):
        self.senha = make_password(raw_password)

    def __str__(self):
        return self.nome


class ACurso(models.Model):
    curso = models.CharField(max_length=100)
    icon = models.CharField(max_length=100)

    def __str__(self):
        return self.curso

class ATurma(models.Model):
    turma = models.CharField(max_length=100)
    periodo = models.CharField(max_length=100)
    curso = models.ForeignKey(ACurso, on_delete=models.CASCADE)  # Associação com ACurso

    def __str__(self):
        return f"{self.turma} ({self.curso})"


class AAluno(models.Model):
    nome = models.CharField(max_length=100)
    telefone = models.CharField(max_length=100)
    nome_pai = models.CharField(max_length=100, default='Nao informado')
    nome_mae = models.CharField(max_length=100, default='Nao informado')
    turma = models.ForeignKey(ATurma, on_delete=models.CASCADE)
    observacoes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome


class Aviso(models.Model):
    mensagem = models.TextField("Mensagem de Aviso")
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Aviso - {self.data_criacao.strftime('%Y-%m-%d')}"
