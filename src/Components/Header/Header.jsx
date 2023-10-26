import React, {useState, useEffect } from 'react'
import AddIcon from '../../assets/add-circle.svg'
import { PopUp } from '../PopUp/PopUp'
export const Header = () => {
   
    return (
        <div className='flex justify-between border-b-2 border-purple-800 p-2 lg:w-1/2 lg:m-auto'>
            <p>Lista de tareas</p>
            <label for="my_modal_4" className="btn">
                <img src={AddIcon} alt='add' className='w-8 h-8' />
            </label>
            <PopUp/>
        </div>
    )
}
