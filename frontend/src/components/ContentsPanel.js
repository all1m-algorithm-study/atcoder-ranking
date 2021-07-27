import { Typography } from "@material-ui/core";
import "./ContentsPanel.scss"

function ContentsPanel(props) {
    const { title, children } = props;

    return (
        <div className="panel-root">
            <Typography className="panel-title" variant="h5" align="center">{title}</Typography>
            {children}
        </div>
    );
}

export default ContentsPanel;