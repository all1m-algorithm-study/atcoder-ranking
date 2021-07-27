import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Avatar, Typography } from "@material-ui/core"
import allimAvatar from "./images/allim-avatar.png";
import { Home, Login } from './pages';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <div className="app-root">
                <div className="app-layout">
                    <div className="app-header">
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

                    <Switch>
                        <Route path="/" component={Home}></Route>
                        <Route path="/login" component={Login}></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;