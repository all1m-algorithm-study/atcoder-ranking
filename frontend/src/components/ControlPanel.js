import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { DataGrid } from "@material-ui/data-grid";
import { Grid, Paper, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { Fragment, useCallback, useEffect, useState } from "react";
import * as Backend from "../shared/BackendCommunicator";
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import "./ControlPanel.scss"

function ControlPanel() {
    const [eventInfo, setEventInfo] = useState(undefined);
    const [partsInfo, setPartsInfo] = useState(undefined);
    const [rows, setRows] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);

    const gridColumns = [
        {
            field: 'handle',
            headerName: 'Handle',
            width: 180,
            editable: true,
        },
        {
            field: 'name',
            headerName: '이름',
            width: 180,
            editable: true,
        },
        {
            field: 'nickname',
            headerName: '가명',
            width: 180,
            editable: true,
        }
    ];

    useEffect(() => {
        async function fetchData() {
            setEventInfo(await Backend.getEventInfo());
            setPartsInfo(await Backend.getParticipants());
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (partsInfo) {
            const newRows = [];
            partsInfo.participants.forEach((part, i) => {
                newRows.push({
                    id: i+1,
                    handle: part.handle,
                    nickname: part.nickname,
                    name: part.name
                });
            });
            setRows(newRows);
        }
    }, [partsInfo])

    function handleStartTimeChange(date) {
        const newEventInfo = {...eventInfo};
        newEventInfo.startTime = date;
        setEventInfo(newEventInfo);
    }

    function handleEndTimeChange(date) {
        const newEventInfo = {...eventInfo};
        newEventInfo.endTime = date;
        setEventInfo(newEventInfo);
    }

    function handleHideNameChange(event) {
        const newEventInfo = {...eventInfo};
        newEventInfo.hideName = event.target.checked;
        setEventInfo(newEventInfo);
    }

    const handleEditCellChange = useCallback(
        ({ id, field, props }) => {
            if (props !== undefined) {
                const newRows = rows.map((row) => {
                    const currRow = { ...row };
                    if (row.id === id) {
                        currRow[field] = props.value;
                    }
                    return currRow;
                });
                setRows(newRows);
            }
        }, [rows]
    );

    const handleSelectionModelChange = useCallback(
        (newSelectionModel) => {
            setSelectionModel(newSelectionModel);
        }, []
    );

    function addRow() {
        const newRows = [...rows];
        newRows.push({
            id: Math.max(...rows.map(r => r.id)) + 1,
            handle: "<Handle>",
            nickname: "<가명>",
            name: "<이름>"
        });
        setRows(newRows);
    }

    function deleteSelectedRows() {
        setRows(rows.filter(row => !selectionModel.includes(row.id)));
    }

    async function saveInfo() {
        try {
            const startTime = new Date(eventInfo.startTime);
            startTime.setHours(0);
            startTime.setMinutes(0);
            startTime.setSeconds(1);
            const endTime = new Date(eventInfo.endTime);
            endTime.setHours(23);
            endTime.setMinutes(59);
            endTime.setSeconds(59);
            const hideName = eventInfo.hideName ? true : false;
            await Backend.setEventInfo(startTime, endTime, hideName);
        } catch (err) {
            const status = err?.response?.status;
            if (status === 401) {
                alert("권한이 없습니다. " + err);
            } else if (status === 400) {
                alert("입력된 매개변수가 잘못되었습니다. " + err);
            } else {
                alert("알 수 없는 오류입니다. 잠시 뒤에 다시 시도해주세요: " + err);
            }
            return;
        }

        try {
            await Backend.setParticipants(rows);
        } catch (err) {
            const status = err?.response?.status;
            if (status === 401) {
                alert("권한이 없습니다. " + err);
            } else if (status === 400) {
                alert("입력된 매개변수가 잘못되었습니다. " + err);
            } else {
                alert("알 수 없는 오류입니다. 잠시 뒤에 다시 시도해주세요: " + err);
            }
            return;
        }

        alert("성공적으로 저장하였습니다!");
        window.location.reload();
    }

    return (
        <div className="ctr-root">
            {eventInfo && partsInfo ? (
                <Paper elevation={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy년 MM월 dd일"
                                margin="normal"
                                id="date-picker-inline"
                                label="이벤트 시작 날짜"
                                value={eventInfo.startTime}
                                onChange={handleStartTimeChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'startTime',
                                }}                      
                            ></KeyboardDatePicker>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy년 MM월 dd일"
                                margin="normal"
                                id="date-picker-inline"
                                label="이벤트 종료 날짜"
                                value={eventInfo.endTime}
                                onChange={handleEndTimeChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'endTime',
                                }}                      
                            ></KeyboardDatePicker>
                            <FormControlLabel
                                control={<Checkbox checked={eventInfo.hideName} onChange={handleHideNameChange}></Checkbox>}
                                label="이름을 숨기고 가명을 표시하기"
                            ></FormControlLabel>
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <div>
                        <Button
                            variant=""
                            component="text"
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={addRow}>
                            행 추가
                        </Button>
                        <Button
                            variant=""
                            component="text"
                            startIcon={<DeleteOutlineIcon />}
                            onClick={deleteSelectedRows}>
                            선택한 행 제거
                        </Button>
                    </div>
                    <div className="ctr-datagrid">
                        <DataGrid
                            rows={rows}
                            columns={gridColumns}
                            onEditCellChange={handleEditCellChange}
                            selectionModel={selectionModel}
                            onSelectionModelChange={handleSelectionModelChange}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>

                    <div className="ctr-buttons">
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={saveInfo}>
                            저장하기
                        </Button>
                    </div>
                </Paper>
            ) : (
                <Fragment></Fragment>
            )}
        </div>
    )
}

export default ControlPanel;