import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Toolbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./SteadyRanking.scss";

function SteadyRanking(props) {
    const { participants } = props;
    const [rows, setRows] = useState([]);

    function generateAvatar(part) {
        const name = (part.name === "" ? part.nickname : part.name);

        return (
            <div className="sr-avatar-layout">
                <Avatar className="sr-avatar" alt={name} src={part.avatar}></Avatar>
                <Typography variant="subtitle1">{name}</Typography>
            </div>
        );
    }

    useEffect(() => {
        let processed = [];

        participants.forEach((part) => {
            if (part.history.length === 0) {
                return;
            }
            processed.push({
                avatar: generateAvatar(part),
                count: part.history.length,
                performance: Math.max(...part.history.map(h => h.performance))
            });
        });
        processed.sort((a, b) => {
            if (a.performance === b.performance) {
                return b.performance - a.performance
            }
            return b.count - a.count;
        });
        processed = processed.slice(0, 4);
        processed.forEach((row, i) => {
            if (i === 0) {
                row.medal = <Typography variant="h5">{"π₯"}</Typography>;
            } else if (i === 1) {
                row.medal = <Typography variant="h5">{"π₯"}</Typography>;
            } else if (i === 2) {
                row.medal = <Typography variant="h5">{"π₯"}</Typography>;
            } else {
                row.medal = <Typography variant="h5">{"π"}</Typography>;
            }
        });

        setRows(processed);
    }, [participants]);

    return (
        <Paper className="sr-root" elevation={6}>
            <Toolbar>
                <Typography variant="h5">πΉ μ°Έκ° νμ</Typography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">π</TableCell> {/*Medal Emoji*/}
                            <TableCell align="left">μ°Έκ°μ</TableCell>
                            <TableCell align="center">Contest μ°Έμ¬ νμ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover>
                                <TableCell align="center" scope="row">{row.medal}</TableCell>
                                <TableCell align="left">{row.avatar}</TableCell>
                                <TableCell align="center">{row.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default SteadyRanking;