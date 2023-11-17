import * as main from './main.mjs'

export function getAll() {
    $.get('http://localhost:8000/api/gymox', (exercises) => {
        displayExercises(exercises) 
    })
}

function displayExercises(exercises) {
    getAllContainer(exercises)  
}

export function getSimilar(movement) { 
    movement = main.nameInput.value;
    $.get(`http://localhost:8000/api/gymox/${movement}`, (exercise) => {
        console.log(exercise);
    })
}








//CREATE GET ALL CONTAINER
function getAllContainer(exercises) {
main.bottomDiv.innerHTML = ''
        main.bottomDiv.style.alignItems = 'center'
        const container = document.createElement('div')
        container.style.height = '90%'
        container.style.width = '90%'
        container.style.backgroundColor = 'white'
        container.style.boxShadow = '1px -15px 80px black'
        container.style.borderRadius = '20px'
        container.style.border = '3px solid black'
        container.style.overflow = 'scroll'
        main.bottomDiv.append(container)

    exercises.forEach(obj => {
        console.log(obj.target_area);

        const holder = document.createElement('div')
        holder.style.display = 'flex'
        holder.style.height = 'maxContent'
        holder.style.width = 'maxContent'
        holder.style.backgroundColor = 'white'



        const movement = document.createElement('h1')
        movement.textContent = `${obj.movement} | ${obj.target_area}`
        holder.append(movement)
        container.append(holder)

    });
}

//CREATE DISPLAY