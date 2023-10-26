import React, { useState, useEffect } from 'react'

const DeleteTask = (props) => {
    const { title } = props.task;
    const storage = localStorage.getItem('tasks');
    const [newTasks, setNewTasks] = useState();
    function modal() {
        props.setOpenModalDelete(false);
    }
    const clickButtom = () => {
        const taskTitleToDelete = title;
        if (storage) {
            const taskStorage = JSON.parse(storage) || [];
            const newTask = taskStorage.filter((element) => {
                if (element.title != taskTitleToDelete) {
                    return element;
                }
            });
            localStorage.clear();
            const arrayLocalStorage = JSON.stringify(newTask);
            window.localStorage.setItem('tasks', arrayLocalStorage);
            //modal();
            window.location.reload();
        }
    };

    return (
        <div className='absolute inset-0 flex items-center justify-center w-full'>

            <div className="">
                <form method='dialog'>
                    <div className='modal-box w-11/12 max-w-5xl'>
                        <h3 className='font-bold text-lg'>¿Estás seguro de eliminar esta tarea?</h3>

                        <div className='modal-action'>
                            <button className='btn bg-red-600 text-white' onClick={clickButtom}>
                                Eliminar
                            </button>
                            <button onClick={modal} className='btn'>
                                Cerrar
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeleteTask