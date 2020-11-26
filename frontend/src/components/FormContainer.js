import { Box, Container } from '@material-ui/core'
import React from 'react'
import "./FormContainer.css"

const FormContainer = ({ children }) => {
    return (
        <Container className="formContainer">
            <Box>
                {children}
            </Box>

        </Container>
    )
}

export default FormContainer
