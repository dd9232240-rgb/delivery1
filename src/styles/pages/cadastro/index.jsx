import Logo from '../../../assets/logo-pb.png';
import Fundo from '../../../assets/fundo-login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useState, useEffect } from 'react';
import api from '../../../services/api';
import SaltPassword from '../../../services/md5';

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUF] = useState('');
  const [codCidade, setCodCidade] = useState('');
  const [cep, setCep] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const [cidades, setCidades] = useState([
    { cod_cidade: '3550308', cidade: 'São Paulo', uf: 'SP' },
    { cod_cidade: '3509502', cidade: 'Campinas', uf: 'SP' },
    { cod_cidade: '3506003', cidade: 'Bauru', uf: 'SP' },
    { cod_cidade: '3170206', cidade: 'Belo Horizonte', uf: 'MG' }
  ]);

  useEffect(() => {
  async function carregarCidades() {
    try {
      const res = await api.get('/v1/cidades');

      if (Array.isArray(res.data)) {
        setCidades(res.data);
      } else {
        setCidades([]);
      }

    } catch (error) {
      console.log("Erro ao buscar cidades:", error);
      setCidades([]);
    }
  }

  carregarCidades();
}, []);

  function SalvarCidade(e) {
    const texto = e.target.options[e.target.selectedIndex].text;

    if (texto.includes(' - ')) {
      const [cid, est] = texto.split(' - ');
      setCidade(cid);
      setUF(est);
    }

    setCodCidade(e.target.value);
  }

  function ProcessaCadastro(e) {
    e.preventDefault();
    setMensagem('');

    if (senha !== senha2) {
      setMensagem('As senhas não conferem');
      return;
    }

    setLoading(true);

    api.post('/v1/usuarios/registro', {
      nome,
      email,
      senha: SaltPassword(senha),
      endereco,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      cod_cidade: codCidade
    })
    .then((res) => {
      if (res.status === 201) {
        localStorage.setItem('sessionToken', res.data.token);
        navigate('/');
      } else {
        setMensagem('Erro ao cadastrar');
      }
    })
    .catch((err) => {
      setMensagem(err?.response?.data?.erro || 'Erro na requisição');
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        {/* LADO ESQUERDO - FORM */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-white">

          <form className="w-75" onSubmit={ProcessaCadastro}>

            <h4 className="text-center mb-1">
              Crie sua conta e faça seu pedido.
            </h4>

            <p className="text-center text-muted mb-4">
              Informe os dados abaixo
            </p>

            <input className="html form-control mb-3"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input className="form-control mb-3"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="row mb-3">
              <div className="col">
                <input className="form-control"
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="col">
                <input className="form-control"
                  type="password"
                  placeholder="Confirme a senha"
                  value={senha2}
                  onChange={(e) => setSenha2(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-8">
                <input className="form-control"
                  placeholder="Endereço"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </div>

              <div className="col-4">
                <input className="form-control"
                  placeholder="Compl."
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <input className="form-control"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>

              <div className="col-6">
                <select className="form-select"
                  value={codCidade}
                  onChange={SalvarCidade}
                >
                  <option value="">Cidade</option>
                  {cidades.map((c) => (
                    <option key={c.cod_cidade} value={c.cod_cidade}>
                      {c.cidade} - {c.uf}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <input className="form-control mb-3"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />

            <button className="btn btn-danger w-100 mb-3" disabled={loading}>
              {loading ? "Enviando..." : "Criar conta"}
            </button>

            {mensagem && (
              <div className="alert alert-danger text-center">
                {mensagem}
              </div>
            )}

            <div className="text-center">
              <Link to="/login">Já tenho uma conta. Fazer login</Link>
            </div>

          </form>
        </div>

        {/* LADO DIREITO - IMAGEM */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={Fundo}
            alt="background"
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

      </div>
    </div>
  );
}

export default Cadastro;