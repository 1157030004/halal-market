import React, {useState} from 'react'
import FormContainer from "../components/FormContainer"
import { ValidatorForm } from 'react-material-ui-form-validator';
import { IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = e =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }
    return (
        <div className="searchBox__container">
            <FormContainer>
                <ValidatorForm
                onSubmit={submitHandler}
                >
                   <InputBase
                   defaultValue="Naked input"
                    onChange={(e) => setKeyword(e.target.value)}
                    name="image"
                    value={keyword}              
                   >
                    </InputBase> 
                    <IconButton type="submit" color="primary" aria-label="search products"><SearchIcon /></IconButton>
                </ValidatorForm>
            </FormContainer>
            
        </div>
    )
}

export default SearchBox
