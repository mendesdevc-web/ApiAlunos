using AlunosApi.Models;

namespace AlunosApi.Services
{
    public interface IAlunoService
    {
        Task<IEnumerable<Aluno>> GetAlunos();
        Task<Aluno> GetAluno(int id);
        Task<IEnumerable<Aluno>> GetAlunosByNome(string nome);
        Task<Aluno> CreateAluno(Aluno aluno);
        Task<Aluno> UpdateAluno(Aluno aluno);
        Task<Aluno> DeleteAluno(Aluno aluno);
    }
}
