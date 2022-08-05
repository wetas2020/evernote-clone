import React, { Component } from 'react';
import './App.css';
import {
    doc,
    onSnapshot,
    collection,
    query,
    where,
    FieldValue,
    getDoc,
    updateDoc,
    Timestamp,
    Firestore,
    serverTimestamp,
    addDoc,
    deleteDoc
} from 'firebase/firestore';
import db from './firebase';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

class App extends Component {
    constructor() {
        super();
        this.state = {
            selectedNoteIndex: null,
            selectedNote: null,
            notes: null
        };
    }
    render() {
        return (
            <div className="app-container">
                <SidebarComponent
                    selectedNoteIndex={this.state.selectedNoteIndex}
                    notes={this.state.notes}
                    deleteNote={this.deleteNote}
                    selectNote={this.selectNote}
                    newNote={this.newNote}
                />
                {this.state.selectedNote ? (
                    <EditorComponent
                        selectedNote={this.state.selectedNote}
                        selectedNoteIndex={this.state.selectedNoteIndex}
                        notes={this.state.notes}
                        noteUpdate={this.noteUpdate}
                    />
                ) : null}
            </div>
        );
    }

    componentDidMount = () => {
        const q = query(collection(db, 'notes'));
        const unstbl = onSnapshot(q, (querySnapshot) => {
            const notes = querySnapshot.docs.map((_doc) => {
                const data = _doc.data();
                data['id'] = _doc.id;
                return data;
            });
            console.log(notes);
            this.setState({ notes: notes });
            console.log('state notes: ' + this.state.notes);
        });
    };

    selectNote = (note, index) => {
        this.setState({ selectedNote: note, selectedNoteIndex: index });
    };

    noteUpdate = (id, noteObj) => {
        const noteRef = doc(db, `notes/${id}`);
        updateDoc(noteRef, {
            title: noteObj.title,
            body: noteObj.body,
            timestamp: serverTimestamp()
        });
    };

    newNote = async (title) => {
        const note = {
            title: title,
            body: ''
        };
        const newFromDB = addDoc(collection(db, 'notes'), {
            title: note.title,
            body: note.body,
            timestamp: serverTimestamp()
        });

        const newID = newFromDB.id;
        await this.setState({
            notes: [...this.state.notes, note]
        });
        const newNoteIndex = this.state.notes.indexOf(
            this.state.notes.filter((note) => note.id === newID)[0]
        );
        this.setState({
            selectedNote: this.state.notes[newNoteIndex],
            selectedNoteIndex: newNoteIndex
        });
    };

    deleteNote = (note) => {
        const noteIndex = this.state.notes.indexOf(note);
        if (this.state.selectedNoteIndex === noteIndex) {
            this.setState({
                selectedNote: null,
                selectedNoteIndex: null
            });
        } else {
            this.state.notes.length > 1
                ? this.selectNote(
                      this.state.notes[this.state.selectedNoteIndex - 1],
                      this.state.selectedNoteIndex - 1
                  )
                : this.setState({ selectedNoteIndex: null, selectedNote: null });
        }
        const noteRef = doc(db, `notes/${note.id}`);
        deleteDoc(noteRef);
    };
}

export default App;
