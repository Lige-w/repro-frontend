import React, {useState} from 'react'
import {connect} from "react-redux";
import {Modal, Header, Icon, Form, Input, TextArea, Button, Popup} from "semantic-ui-react";
import {requestCreateProject} from "../../redux/actions/projectActions";

const NewProject = ({requestCreateProject, projects}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isModalShowing, setIsModalShowing] = useState(false)


    const createProject = () => {
        requestCreateProject({project: {title, description}}, setIsModalShowing)
    }

    return (
        <Modal
            closeIcon
            onClose={() => setIsModalShowing(false)}
            open={isModalShowing}
            trigger={
                <Popup
                    content='Click here to add a project'
                    position='right center'
                    open={!isModalShowing}
                    disabled={!!projects.length}
                        trigger={
                    <div className='controller-link' onClick={() => setIsModalShowing(true)}>
                        <Icon name='add'/> <strong>New Project</strong>
                    </div>
                } />
            }
        >
            <Header icon='add' content={'New Project'}/>
            <Modal.Content>
                <Form onSubmit={createProject}>
                    <Form.Field
                        control={Input}
                        onChange={(e) => setTitle(e.target.value)}
                        label='Title'
                        placeholder='Title'
                    />
                    <Form.Field
                        control={TextArea}
                        onChange={e => setDescription(e.target.value)}
                        label='Description'
                        placehoder='Description'
                    />
                    <Form.Field type='submit' control={Button}>Create Project</Form.Field>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default connect(state => ({projects: state.projects}), {requestCreateProject})(NewProject)