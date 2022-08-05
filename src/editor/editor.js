import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            title: '',
            id: ''
        };
    }

    componentDidMount = () => {
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        });
    };

    componentDidUpdate = () => {
        if (this.props.selectedNote.id !== this.state.id) {
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input
                    className={classes.titleInput}
                    placeholder="Note title ..."
                    value={this.state.title ? this.state.title : ''}
                    onChange={(e) => this.updateTitle(e.target.value)}
                ></input>
                <ReactQuill value={this.state.text} onChange={this.updateBody}></ReactQuill>
            </div>
        );
    }
    updateBody = async (value) => {
        await this.setState({ text: value });
        this.updateNote();
    };
    updateNote = debounce(() => {
        this.props.noteUpdate(this.state.id, { body: this.state.text, title: this.state.title });
    }, 1500);
    updateTitle = async (value) => {
        await this.setState({ title: value });
        this.updateNote();
    };
}

export default withStyles(styles)(EditorComponent);
