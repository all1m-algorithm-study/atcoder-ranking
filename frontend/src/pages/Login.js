import { Button, TextField } from "@material-ui/core";
import { Divider, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { tryLogin } from "../shared/BackendCommunicator";
import getToken from "../shared/GetToken";
import "./Login.scss";

function Login(props) {
    const { cookies } = props;
    const [password, setPassword] = useState("");
    const [buttonText, setButtonText] = useState("로그인");
    const history = useHistory();

    useEffect(() => {
        if (getToken(cookies)) {
            alert("이미 로그인 되어있습니다. 로그아웃을 한 뒤 다시 시도하십시오.");
            history.push("/");
        }
    }, [cookies, history]);

    function changePassword(event){
        setPassword(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            requestLogin();
            event.preventDefault();
        }
    }

    async function requestLogin() {
        try {
            setButtonText("로그인 중...");
            await tryLogin(password);
            history.push("/");
        } catch (err) {
            const status = err?.response?.status;
            if (status === 400) {
                alert("비밀번호를 입력한 뒤 다시 시도해주세요.");
            } else if (status === 401 || status === 404) {
                alert("비밀번호가 잘못되었습니다.");
            } else {
                alert("알 수 없는 오류입니다. 잠시 뒤에 다시 시도해주세요: " + err);
            }
        } finally {
            setButtonText("로그인");
        }
    }

    return (
        <div className="login-root">
            <Paper className="login-layout" elevation={6}>
                <Typography variant="h4" align="center" paragraph>Admin Login</Typography>
                <Divider></Divider>
                <TextField required type="password" label="비밀번호" onChange={changePassword} onKeyPress={handleKeyPress} value={password}></TextField>
                <Button onClick={requestLogin}>{buttonText}</Button>
            </Paper>
        </div>
    );
}

export default withCookies(Login);