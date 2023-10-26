import React, { useState, useEffect } from 'react';

export const PopUp = (props) => {
    const { idx, title, description, deadLine, status, colorText } = props;

    const storage = localStorage.getItem('tasks');
    const [tasks, setTasks] = useState({
        title: title || 'Título de la tarea',
        description: description || '',
        deadLine: deadLine || '',
        status: status || 1,
        colorText: colorText || 0
    });
    const handleTitleBlur = (event) => {
        const newTitle = event.target.value;
        setTasks({ ...tasks, title: newTitle });
        console.log(newTitle)
    };

    const handleDescriptionBlur = (event) => {
        const newDescription = event.target.value;
        setTasks({ ...tasks, description: newDescription });
    };

    const handleDeadlineBlur = (event) => {
        const selectedDate = new Date(event.target.value);
        const currentDate = new Date();
        //si la fecha actual es menor entoces es un estado
        const colorText = selectedDate < currentDate ? 1 : 0;

        setTasks({ ...tasks, deadLine: event.target.value, status: 1, colorText: colorText });
    };


    const clickButtom = () => {
        if (storage) {
            const taskStorage = JSON.parse(storage);
            taskStorage.push(tasks);
            const updatedTasksJSON = JSON.stringify(taskStorage);
            window.localStorage.setItem('tasks', updatedTasksJSON);
        } else {
            // El arreglo no existe en el Local Storage, crea uno nuevo
            const arrayJSON = JSON.stringify([tasks]);
            window.localStorage.setItem('tasks', arrayJSON);
        }
        window.location.reload();

    };
    useEffect(() => {
        if (props.idx !== undefined) {
            // Obtiene la tarea seleccionada utilizando el índice (idx)
            const selectedTask = tasks[props.idx];
            if (selectedTask) {
                setTasks({
                    title: selectedTask.title,
                    description: selectedTask.description,
                    deadLine: selectedTask.deadLine,
                    status: selectedTask.status,
                    colorText: selectedTask.colorText,
                });
            }
        }
    }, [props.idx]);

    return (
        <div className='absolute'>
            <input type='checkbox' id='my_modal_4' className='modal-toggle' />
            <div className='modal'>
                <div className='modal-box max-h-80 overflow-auto absolute top-24'>
                    <h3 className='font-bold text-lg'>Título de la tarea</h3>
                    {/**
           * Aquí siguen los inputs para llenar la tarea
           */}
                    <div className='form-control w-full max-w-xs m-auto'>
                        <label className='label'>
                            <span className='label-text'>Título de la tarea</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Escribe Aquí'
                            className='input input-bordered w-full max-w-xs'
                            onBlur={handleTitleBlur}
                        />
                    </div>

                    <div className='form-control w-full max-w-xs m-auto'>
                        <label className='label'>
                            <span className='label-text'>Descripción</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24"
                            placeholder="descripcion"
                            onBlur={handleDescriptionBlur}>
                        </textarea>
                    </div>

                    <div className='form-control w-full max-w-xs m-auto'>
                        <label className='label'>
                            <span className='label-text'>Fecha de vencimiento</span>
                        </label>
                        <input
                            type='date'
                            className='input input-bordered w-full max-w-xs '
                            onBlur={handleDeadlineBlur}
                        />
                    </div>

                    <div className='modal-action flex flex-wrap justify-center m-5'>
                        <label htmlFor='my_modal_4' className='btn bg-success text-white' onClick={clickButtom}>
                            Guardar
                        </label>
                        <label htmlFor='my_modal_4' className='btn'>
                            Cerrar
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
