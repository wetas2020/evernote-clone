import React, { Component } from 'react';
import './App.css';
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
import db from './firebase';

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
        return <div>Hello World</div>;
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
}

export default App;
