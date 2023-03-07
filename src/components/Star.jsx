import React, { useState } from 'react'
import {AiFillStar} from "react-icons/ai"
import styled, { keyframes } from 'styled-components';
import { ratingColorCalculation } from '../functions';

    const Icon = styled(AiFillStar)`
  overflow: hidden;

  `; 
const Star = ({rating}) => {
    const [rate, setRate] = useState(ratingColorCalculation(rating,5))
    const filter = (rate) => {
        return `WebkitFilter:'brightness(ratingColorCalculation(rate,5))'`;
    }
    
//     const Icon = styled(AiFillStar)`
//   overflow: hidden;
//   filter: brightness(${ratingColorCalculation(rating,5)}%);
//   `;
  return (
    <div>
         <Icon fill="#FF007F" style={{WebkitFilter: `brightness(${rate}%)` }}/>
        
    </div>
  )
}

export default Star