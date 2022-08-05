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

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.editorContainer}>
                <ReactQuill value={this.state.text} onChange={this.updateBody}></ReactQuill>
            </div>
        );
    }
    updateBody = async (value) => {
        await this.setState({ text: value });
        this.updateNote();
    };
    updateNote = debounce(() => {
        console.log('UPDATING DATABASE...');
        // Come back later and add the updateNote function
    }, 1500);
}

export default withStyles(styles)(EditorComponent);
