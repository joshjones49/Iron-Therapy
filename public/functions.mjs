export function getAllExercises() {
    $.get('http://localhost:8000/api/gymox', (data) => {
        console.log(data);
    })
}