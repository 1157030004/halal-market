import { CircularProgress } from '@material-ui/core'
import React from 'react'
import "./Loader.css"

const Loader = () => {
    return (
        <CircularProgress color="secondary">
            <span>Loading...</span>
        </CircularProgress>
    )
}

export default Loader
