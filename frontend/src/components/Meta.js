import React from 'react'
import "./Meta.css"
import {Helmet} from "react-helmet"

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}></meta>
            <meta name='keywords' content={keywords}></meta>
        </Helmet>
    )
}

Meta.defaultProps ={
    title:  'Salman Halal Market',
    description: 'We sell halal products from local and small industries',
    keywords: 'salman halal market, buy electronics, electronics, halal products'
}

export default Meta
