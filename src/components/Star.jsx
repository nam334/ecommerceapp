import React, { useState } from 'react'
import {AiFillStar} from "react-icons/ai"
import styled, { keyframes } from 'styled-components';
import { ratingColorCalculation } from '../functions';

    const Icon = styled(AiFillStar)`
  overflow: hidden;

  `; 
const Star = ({rating}) => {
  return (
    <div>
         <Icon fill="#FF007F" style={{WebkitFilter: `brightness(${ratingColorCalculation(rating,5)}%)` }}/>
        
    </div>
  )
}

export default Star 