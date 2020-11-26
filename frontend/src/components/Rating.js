import React from 'react'
import "./Rating.css"
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types'


const Rating = ({value, text}) => {

    return (
        <div className="rating">
            <span>
                <p>{value >= 1 ? <StarIcon /> : value >= 0.5 ? <StarHalfIcon /> : <StarBorderIcon />  }</p>
            </span>
            <span>
                <p>{value >= 2 ? <StarIcon /> : value >= 1.5 ? <StarHalfIcon /> : <StarBorderIcon />  }</p>
            </span>
            <span>
                <p>{value >= 3 ? <StarIcon /> : value >= 2.5 ? <StarHalfIcon /> : <StarBorderIcon />  }</p>
            </span>
            <span>
                <p>{value >= 4 ? <StarIcon /> : value >= 3.5 ? <StarHalfIcon /> : <StarBorderIcon />  }</p>
            </span>
            <span>
                <p>{value >= 5 ? <StarIcon /> : value >= 4.5 ? <StarHalfIcon /> : <StarBorderIcon />  }</p>
            </span>
    <span className="review">{text && text}</span>
        </div>
    )
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}

export default Rating
