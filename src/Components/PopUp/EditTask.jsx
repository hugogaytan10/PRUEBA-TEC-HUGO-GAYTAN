import React, { useState, useEffect } from 'react';

export const EditTask = (props) => {
    const { title, description, deadLine, status, colorText } = props.task;

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
            let taskStorage = JSON.parse(storage);

            const indexToUpdate = taskStorage.findIndex(element => element.title === props.task.title);

            if (indexToUpdate !== -1) {
                let updatedTask = { ...taskStorage[indexToUpdate] };
                updatedTask.title = tasks.title;
                updatedTask.description = tasks.description;
                updatedTask.deadLine = tasks.deadLine;
                updatedTask.status = tasks.status;
                updatedTask.colorText = tasks.colorText;
                taskStorage[indexToUpdate] = updatedTask;

                const updatedTasksJSON = JSON.stringify(taskStorage);
                localStorage.clear();
                window.localStorage.setItem('tasks', updatedTasksJSON);
            } else {
                // El arreglo no existe en el Local Storage, crea uno nuevo
                const arrayJSON = JSON.stringify([tasks]);
                window.localStorage.setItem('tasks', arrayJSON);
            }
            window.location.reload();
            //props.setOpenModal(false);
        }
    };
    function modal() {
        props.setOpenModal(false);
    }
    useEffect(() => {
        console.log(props)
    }, []);

    return (
        <div className='absolute inset-0 flex items-center justify-center w-full'>

            <div className="w-full">
                <form method='dialog'>
                    <div className='modal-box w-11/12 max-w-5xl m-auto'>
                        <h3 className='font-bold text-lg'>Editar Tarea</h3>
                        {/**
           * Aquí siguen los inputs para llenar la tarea
           */}
                        <div className='form-control w-full max-w-xs m-auto'>
                            <label className='label'>
                                <span className='label-text'>Título de la tarea</span>
                            </label>
                            <input
                                type='text'
                                placeholder={props.task.title}
                                className='input input-bordered w-full max-w-xs m-auto'
                                onBlur={handleTitleBlur}
                            />
                        </div>

                        <div className='form-control w-full max-w-xs m-auto'>
                            <label className='label'>
                                <span className='label-text'>Descripción</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-24"
                                placeholder={props.task.description}
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
                                defaultValue={props.task.deadLine}
                            />
                        </div>

                        <div className='modal-action flex flex-wrap justify-center m-5'>
                            <button className='btn bg-success text-white' onClick={clickButtom}>
                                Guardar
                            </button>
                            <button onClick={modal} className='btn'>
                                Cerrar
                            </button>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
