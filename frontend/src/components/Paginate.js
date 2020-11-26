import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link } from "react-router-dom"
import { IconButton } from '@material-ui/core';
import "./Paginate.css"

const Paginate = ({ pages, page, isAdmin= false, keyword = '' }) => {


    
    return  pages > 1 && (
        <div className="paginate__container"> 
            {[...Array(pages).keys()].map(x =>(
            <Link 
            key= { x + 1}
            to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` :
                `/admin/productlist/${x + 1}`    
            }
            >
                <IconButton size="medium" active={x + 1 === page}>{x + 1}</IconButton>
            </Link>
))}
        </div>

    )
    
}

export default Paginate


{/* <Pagination 
count={pages} 
color="primary"
>
         <PaginationItem>
         {[...Array(pages).keys()].map(x =>(
            <Link 
            key= { x + 1}
            to={keyword ? `search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
            >
                <PaginationItem active={x + 1 === page}>{x + 1}</PaginationItem>
            </Link>
))} 
         </PaginationItem>
</Pagination> */}