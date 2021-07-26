import { Typography } from "@material-ui/core";
import "./ContentsPanel.scss"

function ContentsPanel(props) {
    const { title } = props;

    return (
        <div className="panel-root">
            <Typography variant="h5">{title}</Typography>
        </div>
    );
}

export default ContentsPanel;