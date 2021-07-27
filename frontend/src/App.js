import { Route, Switch } from 'react-router-dom';
import { Avatar, Typography, IconButton } from "@material-ui/core"
import { withCookies } from 'react-cookie';
import allimAvatar from "./images/allim-avatar.png";
import GitHubIcon from '@material-ui/icons/GitHub';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Home, Login } from './pages';
import { useHistory } from 'react-router-dom';
import './App.scss';
import getToken from './shared/GetToken';
import { tryLogout } from './shared/BackendCommunicator';

function App(props) {
    const { cookies } = props;
    const history = useHistory();

    function goToGitHub() {
        window.open("https://github.com/all1m-algorithm-study/atcoder-ranking", "_blank");
    }

    function goToLogin() {
        history.push("/login");
    }

    function handleLogout() {
        tryLogout()
            .then(() => {
                alert("로그아웃되었습니다.");
                window.location.reload();
            });
    }

    return (
        <div className="app-root">
            <div className="app-header">
                <div className="app-header-inner">
                    <div>
                        <Avatar className="app-avatar" variant="rounded">
                            <img src={allimAvatar} alt="allim-avatar"></img>
                        </Avatar>
                    </div>
                    <div className="app-title-layout">
                        <Typography variant="h4">AL林 AtCoder Event 🎉</Typography>
                        <Typography variant="subtitle1">Scoreboard</Typography>
                    </div>
                </div>
            </div>

            <div className="app-layout">
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/login" component={Login}></Route>
                </Switch>
            </div>

            <footer>
                <IconButton aria-label="Github" onClick={goToGitHub}>
                    <GitHubIcon></GitHubIcon>
                </IconButton>
                {getToken(cookies) ? (
                    <IconButton aria-label="Logout" onClick={handleLogout}>
                        <MeetingRoomIcon></MeetingRoomIcon>
                    </IconButton>
                ) : (
                    <IconButton aria-label="Login" onClick={goToLogin}>
                        <VpnKeyIcon></VpnKeyIcon>
                    </IconButton>
                )}
            </footer>
        </div>
    );
}

export default withCookies(App);