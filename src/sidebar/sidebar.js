import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';

class SidebarComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            addingNote: false,
            title: null
        };
    }

    render() {
        const { notes, classes, selectedNoteIndex } = this.props;
        if (notes) {
            return (
                <div className={classes.sidebarContainer}>
                    <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
                        {this.state.addingNote ? 'Cancel' : 'New Note'}
                    </Button>
                    {this.state.addingNote ? (
                        <div>
                            <input
                                type="text"
                                className={classes.newNoteInput}
                                placeholder="Title"
                                onKeyUp={(e) => this.updateTitle(e.target.value)}
                            />
                            <Button onClick={this.newNote} className={classes.newNoteSubmitBtn}>
                                Submit Note
                            </Button>
                        </div>
                    ) : null}
                    <List>
                        {notes.map((note, index) => {
                            return (
                                <div key={index}>
                                    <SidebarItemComponent
                                        note={note}
                                        index={index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={this.selectNote}
                                        deleteNote={this.deleteNote}
                                    />
                                    <Divider />
                                </div>
                            );
                        })}
                    </List>
                </div>
            );
        } else {
            return <div>Add a Note!</div>;
        }
    }
    newNoteBtnClick = () => {
        this.setState({ title: null, addingNote: !this.state.addingNote });
        console.log('NEW BTN CLICKED');
    };
    updateTitle = (title) => {
        this.setState({ title: title });
    };
    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({ title: null, addingNote: false });
    };
    selectNote = (note, index) => {
        this.props.selectNote(note, index);
    };
    deleteNote = (note) => {
        this.props.deleteNote(note);
    };
}

export default withStyles(styles)(SidebarComponent);
