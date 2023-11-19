import * as main from './main.mjs'

const workoutList = document.createElement('div')
const logIn = document.querySelector('#logIn')
export const submitBtn = document.createElement('button')
const workoutName = document.createElement('input')
const inputName = document.createElement('input')
const scriptDiv = document.createElement('div')

export function getAll() {
    $.get('http://localhost:8000/api/ironT', (data) => {
        displayExercises(data) 
    })
}

export function getSimilar(movement) { 
    movement = main.searchBar.value;
    $.get(`http://localhost:8000/api/ironT/${movement}`, (data) => {
        console.log(data);
        displayExercises(data)
    })
}

//SUBMIT
export function submit() {
    
    $.ajax({
        url: 'http://localhost:8000/api/ironT',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: workoutName.value,
                    script: workoutList.textContent
                }),
                success: () => {
                    alert('Workout Has Been Saved');
                },
                error: () => {
                    console.error('Error:', error);
                }
    })
    console.log(workoutList.textContent);
}
//CREATE DISPLAY EXERCISES
function displayExercises(data) {
    main.createBtn.textContent = 'RETURN'
    main.createBtn.addEventListener('click', () => {
        location.reload()
    })
    main.loremDiv.innerHTML = ''
    console.log(data);
    data.forEach(obj => {

        const holder = document.createElement('div')
        holder.style.display = 'block'
        holder.style.height = '440px'
        holder.style.width = '500px'
        holder.style.borderRadius = '20px'
        holder.style.backgroundColor = 'white'
        holder.addEventListener('click', () => {
            const text = document.createElement('h1')
            text.style.color = 'rgb(42, 42, 77)'
            text.style.fontSize = '30px'
            text.style.cursor = 'pointer'
            text.textContent = ' ' +holder.textContent
            text.addEventListener('dblclick', () => {
                text.style.display = 'none'
            })
            workoutList.append(text)
        })

        const movement = document.createElement('h1')
        movement.textContent = `${obj.movement}`
        holder.append(movement)
        main.loremDiv.append(holder)

    });
}

//CREATE WORKOUT
export function getCreator() {
    getAll()
    main.createBtn.textContent = 'HOME'
    main.createBtn.addEventListener('click', () => {
        location.reload()
    })
    main.loremDiv.style.marginLeft = '37%'
    main.bottomDiv.innerHTML = '';
    main.bottomDiv.style.display = 'block'
    
    workoutName.style.height = '100px'
    workoutName.style.width = '700px'
    workoutName.style.borderRadius = '12px'
    workoutName.style.textAlign = 'center'
    workoutName.style.display = 'flex'
    workoutName.style.fontSize = '80px'
    workoutName.style.marginBottom = '30px'
    workoutName.placeholder = 'Name Your Workout'

    workoutList.style.height = '90%'
    workoutList.style.width = '900px'
    workoutList.style.backgroundColor = 'white'
    workoutList.contentEditable = true
    workoutList.style.fontFamily = 'Teko'
    workoutList.style.fontSize = '40px'
    workoutList.style.overflow = 'auto'
    workoutList.style.color = 'black'
    workoutList.style.borderRadius = '12px'
    workoutList.placeholder = 'List your exercises !'
    workoutList.style.height = '300px'

    submitBtn.style.height = '75px'
    submitBtn.style.width = '200px'
    submitBtn.textContent = 'SUBMIT'
    submitBtn.style.textAlign = 'center'
    submitBtn.style.alignContent = 'center'
    submitBtn.style.cursor = 'pointer'
    submitBtn.style.borderRadius = '50px'
    submitBtn.style.backgroundColor = 'transparent'
    submitBtn.style.border = '7px solid white'
    submitBtn.style.color = 'white'
    submitBtn.style.fontSize = '50px'
    submitBtn.addEventListener('mouseover', () => {
        submitBtn.style.transition = 'background-color 0.5s ease'
        submitBtn.style.backgroundColor = 'rgb(42, 42, 77)'
    })
    submitBtn.addEventListener('mouseout', () => {
        submitBtn.style.transition = 'background-color 0.7s ease'
        submitBtn.style.backgroundColor = 'transparent'
    })

    main.bottomDiv.append(workoutName, workoutList, submitBtn)
}

//GET WORKOUTS
export function getWorkouts() {
    main.loremDiv.innerHTML = ''
    main.createBtn.textContent = 'RETURN'
    main.createBtn.addEventListener('click', () => {
        location.reload()
    })
    $.get('http://localhost:8000/api/ironT/workouts', (data) => {
        data.forEach(obj => {

            const holder = document.createElement('div')
            holder.style.display = 'block'
            holder.style.overflow = 'auto'
            holder.style.height = '440px'
            holder.style.width = '500px'
            holder.style.borderRadius = '20px'
            holder.style.backgroundColor = 'white'
            
            const editBtn = document.createElement('button')
            editBtn.style.height = '30px'
            editBtn.style.width = '80px'
            editBtn.style.backgroundColor = 'green'
            editBtn.style.fontSize = '80%'
            editBtn.style.opacity = '1'
            editBtn.style.border = '2px solid green'
            editBtn.style.borderRadius = '30px'
            editBtn.style.cursor = 'pointer'
            editBtn.textContent = 'EDIT'
            editBtn.addEventListener('click', () => edit1(obj))
            
            const deleteBtn = document.createElement('button')
            deleteBtn.style.height = '30px'
            deleteBtn.style.width = '80px'
            deleteBtn.style.backgroundColor = 'crimson'
            deleteBtn.style.fontSize = '80%'
            deleteBtn.style.opacity = '1'
            deleteBtn.style.border = '2px solid red'
            deleteBtn.style.borderRadius = '30px'
            deleteBtn.style.cursor = 'pointer'
            deleteBtn.textContent = 'DELETE'
            deleteBtn.addEventListener('click', () => delete1(obj, holder))
            holder.append(editBtn, deleteBtn)
            
            const movement = document.createElement('h1')
            movement.innerHTML = `${obj.name}<br>${obj.script}`
            holder.append(movement)
            main.loremDiv.append(holder)
    
        });
        console.log(data);
    })

}

//edit
function edit1(element) {
    main.bottomDiv.innerHTML = ''
    main.bottomDiv.style.display = 'block'
    main.bottomDiv.contentEditable = true
    main.bottomDiv.style.color = 'rgb(42, 42, 77)'
   
    inputName.style.height = '100px'
    inputName.style.width = '500px'
    inputName.style.fontSize = '70px'
    inputName.placeholder = element.name

    scriptDiv.style.height = '800px'
    scriptDiv.style.width = '600px'
    scriptDiv.style.fontSize = '60px'
    scriptDiv.style.borderRadius = '30px'
    scriptDiv.style.backgroundColor = 'white'
    scriptDiv.textContent = element.script

    const editBtn = document.createElement('button')
    editBtn.style.height = '100px'
    editBtn.style.width = '300px'
    editBtn.style.fontSize = '70px'
    editBtn.style.cursor = 'pointer'
    editBtn.style.backgroundColor = 'blue'
    editBtn.style.border = ' none'
    editBtn.textContent = 'SUBMIT'
    editBtn.style.color ='white'
    editBtn.style.border = '7px solid white'
    editBtn.style.borderRadius = '30px'
    editBtn.style.backgroundColor = 'crimson'
    editBtn.addEventListener('click', () => editWorkout(element))

    main.bottomDiv.append(inputName, scriptDiv, editBtn)
}

//edit
function editWorkout(element) {
 const elementId = element.id
        $.ajax({
            url: `http://localhost:8000/api/ironT/workout/${elementId}`,
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify({
                name: inputName.value,
                script: scriptDiv.textContent
            }),
            success: function(data) {
                alert('Workout Updated');
                console.log(data);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });

    }
//delete
function delete1(workout, div) {
    div.style.display = 'none'
    workout = workout.name
    $.ajax({
        url: `http://localhost:8000/api/ironT/${workout}`,
        method: 'DELETE',
        success: (data) => {
            console.log('Workout Deleted');
            console.log(data);
        },
        error: (error) => {
            console.error('Error:', error);
        }
    });
}

const fname = document.querySelector('#firstInput')
const lname = document.querySelector('#lastInput')
const email = document.querySelector('#emailInput')
//CREATE USER
export function createUser() {

    $.ajax({
        url: 'http://localhost:8000/api/ironT/member',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    fname: fname.value,
                    lname: lname.value,
                    email: email.value
                }),
                success: () => {
                    alert('User Saved');
                },
                error: () => {
                    console.error('Error:', error);
                }
    })
    console.log(email.value);
}