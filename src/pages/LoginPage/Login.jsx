import { LoginContainer, FormContainer } from "./styled";
import Logo from "../../assets/logo.svg";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { URL_BASE, MSG_ERRO_INTERNO, MSG_ERRO_USUARIO_NAO_CADASTRADO, MSG_ERRO_SENHA_INCORRETA } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

export default function Login() {
    const {setProfileImage, setToken} = useContext(UserContext);
    const navigate = useNavigate();
    const [disabledForm, setDisabledForm] = useState(false);
    const [loginData, setLoginData] = useState(
        {
            email: "",
            password: ""
        }
    );

    useEffect(() => {
        const dadosUsuario = localStorage.getItem("userData");
        
        if (dadosUsuario !== null) {
            const user = JSON.parse(dadosUsuario);
            setToken(user.token);
            setProfileImage(user.image);
            navigate("/hoje");
        }
    }, []);

    function handleChange(e) {
        const dados = { ...loginData };
        dados[e.target.name] = e.target.value;
        setLoginData(dados);
    }

    function sendApiData(e) {
        e.preventDefault();
        setDisabledForm(true)

        axios.post(`${URL_BASE}/auth/login`, loginData)
            .then((res) => {
                setDisabledForm(false);
                setToken(res.data.token);
                setProfileImage(res.data.image);
                localStorage.setItem("userData", JSON.stringify(res.data));
                navigate("/hoje");
            })
            .catch((err) => {
                setDisabledForm(false);

                switch (err.response.request.status) {
                    case 422:
                        alert(MSG_ERRO_USUARIO_NAO_CADASTRADO);
                        break;
                    case 401:
                        alert(MSG_ERRO_SENHA_INCORRETA);
                        break;
                    default:
                        alert(MSG_ERRO_INTERNO)
                }
            });
    }

    return (
        <LoginContainer>
            <img src={Logo} alt="logo TrackIt" />
            <FormContainer>
                <form onSubmit={sendApiData}>
                    <input
                        onChange={handleChange}
                        data-test="email-input"
                        type="email"
                        name="email"
                        value={loginData.email}
                        placeholder="email"
                        disabled={disabledForm} />
                    <input
                        onChange={handleChange}
                        data-test="password-input"
                        type="password"
                        name="password"
                        value={loginData.password}
                        placeholder="senha"
                        disabled={disabledForm} />
                    <LoadingButton
                        disabled={disabledForm}
                        texto="Entrar"
                        type="submit"
                        height="65"
                        width="65"
                        teste="login-btn" />
                </form>
            </FormContainer>
            <div>
                <Link to="/cadastro" data-test="signup-link">Não tem uma conta? Cadastre-se!</Link>
            </div>
        </LoginContainer>
    );
}