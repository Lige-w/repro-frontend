import React, {Fragment, useState} from 'react'
import {connect} from "react-redux";
import {Icon, Tab, Dropdown, Button} from "semantic-ui-react";

import {requestCreateNote} from "../../../redux/actions/noteActions";

import NoteEditor from "../../../components/profile/reference-container/NoteEditor"

const NotesContainer = ({notes, referenceId, requestCreateNote}) => {

    const [isShowingNotes, setIsShowingNotes] = useState(false)
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(0)

    const createNote = () => {
        const body = {
            reference_id: referenceId,
            content: JSON.stringify({})
        }
        requestCreateNote(body)
        setIsShowingNotes(true)
    }

    const noteOptions = notes.map((note, i) => (
        {
            key: note.id,
            text: note.name || `Untitled Note ${note.id}`,
            value: i
        }
    ))

    const notePanes = notes.length < 6 ?
        notes.map((note)=> ({
            menuItem: note.name || `Untitled Note ${note.id}`, render: () => (
                <Tab.Pane key={note.id}><NoteEditor  name={note.name || `Untitled Note ${note.id}`} note={note}/></Tab.Pane>
            )
        }))
        :
        [{menuItem: <Dropdown
                key={`dropdown-${referenceId}`}
                scrolling
                item
                className='note-dropdown'
                text={notes[selectedNoteIndex].name || `Untitled Note ${notes[selectedNoteIndex].id}`}
                value={selectedNoteIndex}
                onChange={(e, {value}) => setSelectedNoteIndex(value)}
                options={noteOptions}
            />,
            render: () => <Tab.Pane>
                <NoteEditor  note={notes[selectedNoteIndex]}/>
        </Tab.Pane>}]

    return (
        <div className='notes-container'>
            <Button className='full-width-button' onClick={createNote}><Icon name='add'/> <strong>Add Note</strong></Button>
            {!!notes.length ?
                <Fragment>
                    <div className='show-note' onClick={() => setIsShowingNotes(!isShowingNotes)}>
                        {isShowingNotes ?
                            <span><Icon name='triangle down'/> <strong>Hide Notes</strong></span>
                            : <span><Icon name='triangle left'/> <strong>Show Notes</strong></span>}
                    </div>
                    {isShowingNotes ?
                        <Tab  panes={notePanes}/>
                        : null}
                </Fragment>
                :null}
        </div>
    )
}

export default connect(null, {requestCreateNote})(NotesContainer)