import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Toolbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./PerformanceRanking.scss";

function PerformanceRanking(props) {
    const { participants } = props;
    const [rows, setRows] = useState([]);

    useEffect(() => {
        let processed = [];

        participants.forEach((part) => {
            if (part.history.length === 0) {
                return;
            }
            processed.push({
                name: (part.name === "" ? part.nickname : part.name),
                avatar: part.avatar,
                performance: Math.max(...part.history.map(h => h.performance))
            });
        });
        processed.sort((a, b) => {
            return b.performance - a.performance;
        });
        processed = processed.slice(0, 4);
        processed.forEach((row, i) => {
            if (i === 0) {
                row.medal = "🥇";
            } else if (i === 1) {
                row.medal = "🥈";
            } else if (i === 2) {
                row.medal = "🥉";
            } else {
                row.medal = "👍";
            }
        });

        setRows(processed);
    }, [participants]);

    return (
        <Paper className="pr-root" elevation={6}>
            <Toolbar>
                <Typography variant="h5">🍨 Performance의 최댓값</Typography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">🏆</TableCell> {/*Medal Emoji*/}
                            <TableCell align="left">참가자</TableCell>
                            <TableCell align="center">최대 Performance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover>
                                <TableCell align="center" scope="row">
                                    <Typography variant="h5">{row.medal}</Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <div className="pr-avatar-layout">
                                        <Avatar className="pr-avatar" alt={row.name} src={row.avatar}></Avatar>
                                        <Typography variant="subtitle1">{row.name}</Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="center">{row.performance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default PerformanceRanking;