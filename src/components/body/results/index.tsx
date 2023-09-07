import React from 'react';
import { ResultContainer, TitleHeader } from './indexElements';

type params = {
}

const Results: React.FC<params> = (props) => {

    return ( 
        <ResultContainer>
            <TitleHeader>CLASSIFICATION RESULTS</TitleHeader>
        </ResultContainer>
    );



}

export default Results;