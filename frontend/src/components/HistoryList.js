import { Paper, Box, Grid, Collapse, TableContainer, Table, TableBody, TablePagination, TableHead, TableCell, TableSortLabel, TableRow, IconButton, ButtonBase, Avatar, Typography } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useEffect, useState, Fragment } from "react";
import "./HistoryList.scss";

function compareElements(a, b, orderBy) {
    if (a[orderBy] < b[orderBy]) {
        return -1;
    } else if (a[orderBy] > b[orderBy]) {
        return 1;
    } else {
        return 0;
    }
}

function sortRows(rows, order, orderBy) {
    const mappedList = rows.map((element, index) => [element, index]);
    mappedList.sort((a, b) => {
        const compared = compareElements(a[0], b[0], orderBy);
        return order === "asc" ? compared : -compared;
    });
    return mappedList.map((el) => el[0]);
}

function SortableTableHead(props) {
    const { onRequestSort, headCells, orderBy, order } = props;

    const getSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells?.map((headCell) => (
                    <TableCell 
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        
                        {headCell.allowSorting ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={getSortHandler(headCell.id)}>
                                
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span>
                                        {order === "desc" ? "(내림차순)" : "(오름차순)"}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        ) : headCell.label}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

function CollapsibleRow(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow hover>
                <TableCell>
                    <IconButton aria-label="추가 정보 보기" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Avatar alt={row.avatar} src={row.avatar}></Avatar>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle1">{row.name}</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{row.performance}</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{row.count}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Grid container direction="row">
                                <Typography variant="h6" gutterBottom component="div">
                                    모든 참여 기록
                                </Typography>
                            </Grid>
                            <Table size="small" aria-label="추가 정보">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>일자</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>Contest 제목</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>순위</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>Performance</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>업데이트된 레이팅</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>레이팅 변화량</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((h) => (
                                        <TableRow hover>
                                            <TableCell>
                                                <Typography>{h.date}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{h.title}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{h.rank}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{h.performance}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{h.newRating}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{h.diff}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

function HistoryList(props) {
    const { participants } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState("asc");
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const newRows = [];
        participants.forEach((part) => {
            let maxPerformance = 0;
            if (part.history.length > 0) {
                maxPerformance = Math.max(...part.history.map((h) => h.performance));
            }

            newRows.push({
                avatar: part.avatar,
                name: (part.name === "" ? part.nickname : part.name),
                performance: maxPerformance,
                count: part.history.length,
                history: part.history
            });
        });
        setRows(newRows);
    }, [participants]);

    const headCells = [
        {
            id: "button",
            label: "",
            allowSorting: false
        },
        {
            id: "avatar",
            label: "",
            allowSorting: false
        },
        {
            id: "name",
            label: "참가자명",
            allowSorting: true
        },
        {
            id: "performance",
            label: "최대 Performance",
            allowSorting: true
        },
        {
            id: "count",
            label: "Contest 참여 횟수",
            allowSorting: true
        },
    ];

    function handleRequestSort(event, property) {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    function handleChangePage(event, newPage) {
        setPage(newPage);
    };

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper elevation={6}>
            <TableContainer>
                <Table>
                    <SortableTableHead
                        headCells={headCells}
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}/>
                    <TableBody>
                        {sortRows(rows, order, orderBy)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <CollapsibleRow row={row}></CollapsibleRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default HistoryList;