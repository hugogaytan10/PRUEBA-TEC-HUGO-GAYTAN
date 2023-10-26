import React, { useEffect, useState } from 'react'
import DeleteTask from '../PopUp/DeleteTask';
import { EditTask } from '../PopUp/EditTask';
import { PopUp } from '../PopUp/PopUp';
import  trashIcon  from '../../assets/trash-outline.svg';
export const Task = () => {
    const storage = localStorage.getItem('tasks');
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState();
    const [taskFilters, setTaskFilters] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleStatus = (index) => {
        const updatedTasks = [...tasks];
        //cambia el estatus cada que le de click asi pasa de
        //activo o inactivo
        const newStatus = updatedTasks[index].status == 1 ? 2 : 1;
        //const newColorText = updatedTasks[index].colorText == 0 ? 1 : 0;
        updatedTasks[index].status = newStatus;
        //updatedTasks[index].colorText = newColorText;
        setTasks(updatedTasks);
        //actualizamos nuestro localStorage
        localStorage.clear();
        const arrayJSON = JSON.stringify(updatedTasks);
        window.localStorage.setItem('tasks', arrayJSON);
    }

    useEffect(() => {
        if (storage) {
            //si tenemos algo en LS entonces lo rescatamos
            const myLocalStorage = JSON.parse(storage);
            setTasks(myLocalStorage);
            setTaskFilters(myLocalStorage);
        } else {
            // El arreglo no existe en el Local Storage
            console.log('El arreglo no existe en el Local Storage');
        }
    }, [])
    const Pendientes = () => {
        let filter = tasks.filter((element) => {
            if (element.status === 1) {
                return element;
            }
        });
        setTaskFilters(filter);
    }
    const Completado = () => {
        let filter = tasks.filter((element) => {
            if (element.status === 2) {
                return element;
            }
        });
        setTaskFilters(filter);
    }
    const Todas = () => {
        setTaskFilters(tasks);
    }
    useEffect(() => {
        //console.log(taskFilters);
    }, [taskFilters])
    return (
        <div className='block w-full lg:w-1/2 lg:m-auto'>
            <div className='m-5'>
                Tareas: {taskFilters.length}
            </div>
            {
                taskFilters.length > 0
                    ?
                    taskFilters.map((task, idx) => {
                        return (
                            <div key={idx}>
                                <div className='flex flex-wrap justify-between items-center w-full'>
                                    <span className={task.status === 1 ? 'w-5 h-5  rounded-full border-2' : 'w-5 h-5  rounded-full border-2 bg-black'} onClick={() => { handleStatus(idx) }}></span>
                                    <div className='flex-1 ml-4 items-start' onClick={() => { setOpenModal(!openModal); setTask(task); }}>
                                        <p className={`text-left break-words ${task.colorText === 0 ? '' : 'text-red-500'} ${task.status === 2 ? 'line-through' : ''} ${task.status === 2 && task.colorText === 1 ? 'text-black' : ''}`}>
                                            {task.title}
                                        </p>
                                        <p className={`text-left break-words ${task.colorText === 0 ? '' : 'text-red-500'} ${task.status === 2 ? 'line-through' : ''}  ${task.status === 2 && task.colorText === 1 ? 'text-black' : ''}`}>
                                            {task.description}
                                        </p>
                                    </div>
                                    <div>{task.deadLine}</div>
                                    <img src={trashIcon} className='h-4 w-4 ml-5' onClick={() => { setOpenModalDelete(true); setTask(task); }} />
                                </div>
                                <span className="block w-11/12 bg-gray-300 h-0.5 float-right mt-1"></span>


                            </div>
                        )
                    })
                    :
                    <>
                        <p>NO HAY TAREAS</p>
                    </>
            }
            {
                openModal &&
                <EditTask task={task} setOpenModal={setOpenModal} />
            }
            {
                openModalDelete &&
                <DeleteTask task={task} setOpenModalDelete={setOpenModalDelete} />
            }
            <div className='flex justify-center gap-3 w-full mt-10 flex-wrap'>
                <button onClick={() => { Todas() }} className='btn'>Todas</button>
                <button onClick={() => { Pendientes() }} className='btn'>Pendientes</button>
                <button onClick={() => { Completado() }} className='btn'>Completas</button>
            </div>
        </div>
    )
}


