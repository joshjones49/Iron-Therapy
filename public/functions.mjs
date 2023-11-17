

export function getAll() {
    $.get('http://localhost:8000/api/gymox', (exercises) => {
        // console.log(exercises);
        displayExercises(exercises) 
    })
}

function displayExercises(exercises) {
    exercises.forEach(obj => {
        console.log(obj);
      
    });
}

import { getNameInput }  from './main.mjs';

export function getSimilar(movement) { 
    movement = getNameInput();
    $.get(`http://localhost:8000/api/gymox/${movement}`, (exercise) => {
        console.log(exercise);
    })
}
