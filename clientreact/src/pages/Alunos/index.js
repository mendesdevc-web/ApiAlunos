import React, { useEffect, useState } from "react";
import "./styles.css";

import api from "../../services/api";

import LogoCadastro from "../../assets/cadastro1.png";

import { FiXCircle, FiEdit, FiUserX } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    api
      .get("/api/alunos", authorization)
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function logout() {
    localStorage.clear();

    navigate("/");
  }

  return (
    <div className="aluno-container">
      <header>
        <img src={LogoCadastro} alt="Cadastro" />

        <span>
          Bem-vindo, <strong>{email}</strong>!
        </span>

        <Link className="button" to="/aluno/novo/0">
          Novo aluno
        </Link>

        <button type="button" onClick={logout}>
          <FiXCircle size={35} color="#17202a" />
        </button>
      </header>

      <form>
        <input type="text" placeholder="Filtrar aluno por nome" />

        <button className="button" type="submit">
          Buscar
        </button>
      </form>

      <h1>Relação de Alunos</h1>

      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            <strong>Nome:</strong>
            <p>{aluno.nome}</p>

            <strong>Email:</strong>
            <p>{aluno.email}</p>

            <strong>Idade:</strong>
            <p>{aluno.idade}</p>

            <button type="button">
              <FiEdit size={25} color="#17202a" />
            </button>

            <button type="button">
              <FiUserX size={25} color="#17202a" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
