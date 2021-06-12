import React from 'react'
import {Container, Row} from 'react-bootstrap'
import NewProductForm from '../NewProductForm/NewProductForm'

export default function Create() {

    const container = { 
        marginTop: "5vh",
    };

    return (
        
        <Container>
            <Row style={container} className="justify-content-center">
                <NewProductForm/>
            </Row>
        </Container>
        
    )
}
