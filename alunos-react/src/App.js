import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logoCadastro from "./assets/cadastro.png";

function App() {
  const baseUrl = "https://localhost:7186/api/alunos";
  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: "",
    nome: "",
    email: "",
    idade: "",
  });

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  };

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    });
  };

  const selecionarAluno = (aluno, caso) => {
    setAlunoSelecionado(aluno);
    caso === "Editar" ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  };

  const pedidoGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoPost = async () => {
    try {
      const novoAluno = {
        ...alunoSelecionado,
        idade: parseInt(alunoSelecionado.idade),
      };
      delete novoAluno.id;
      const response = await axios.post(baseUrl, novoAluno);
      setData(data.concat(response.data));
      abrirFecharModalIncluir();
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoPut = async () => {
    try {
      const alunoAtualizado = {
        ...alunoSelecionado,
        idade: parseInt(alunoSelecionado.idade),
      };
      await axios.put(baseUrl + "/" + alunoSelecionado.id, alunoAtualizado);
      pedidoGet();
      abrirFecharModalEditar();
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoDelete = async () => {
    try {
      await axios.delete(baseUrl + "/" + alunoSelecionado.id);
      setData(data.filter((aluno) => aluno.id !== alunoSelecionado.id));
      abrirFecharModalExcluir();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    pedidoGet();
  }, []);

  return (
    <div className="aluno-container">
      <h3>Cadastro Aluno</h3>

      <header>
        <img src={logoCadastro} alt="Cadastro" width="120" />
        <button className="btn btn-success" onClick={abrirFecharModalIncluir}>
          <span>Incluir Novo Aluno</span>
        </button>
      </header>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className="btn btn-primary" onClick={() => selecionarAluno(aluno, "Editar")}>
                  <span>Editar</span>
                </button>{" "}
                <button className="btn btn-danger" onClick={() => selecionarAluno(aluno, "Excluir")}>
                  <span>Excluir</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" className="form-control" name="nome" value={alunoSelecionado.nome} onChange={handleChange} />
            <br />
            <label>Email:</label>
            <input type="text" className="form-control" name="email" value={alunoSelecionado.email} onChange={handleChange} />
            <br />
            <label>Idade:</label>
            <input type="text" className="form-control" name="idade" value={alunoSelecionado.idade} onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={pedidoPost}>
            <span>Inserir</span>
          </button>
          <button className="btn btn-danger" onClick={abrirFecharModalIncluir}>
            <span>Cancelar</span>
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label>
            <input type="text" className="form-control" readOnly value={alunoSelecionado.id} />
            <br />
            <label>Nome:</label>
            <input type="text" className="form-control" name="nome" value={alunoSelecionado.nome} onChange={handleChange} />
            <br />
            <label>Email:</label>
            <input type="text" className="form-control" name="email" value={alunoSelecionado.email} onChange={handleChange} />
            <br />
            <label>Idade:</label>
            <input type="text" className="form-control" name="idade" value={alunoSelecionado.idade} onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={pedidoPut}>
            <span>Editar</span>
          </button>
          <button className="btn btn-danger" onClick={abrirFecharModalEditar}>
            <span>Cancelar</span>
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Deseja realmente excluir o aluno <strong>{alunoSelecionado.nome}</strong> ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={pedidoDelete}>
            <span>Sim</span>
          </button>
          <button className="btn btn-secondary" onClick={abrirFecharModalExcluir}>
            <span>Não</span>
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
