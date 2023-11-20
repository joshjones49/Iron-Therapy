//IMPORTS==============
import * as route from './functions.mjs';
//HTML ELEMENTS==================
export const bottomDiv = document.querySelector('#bottomDiv')
export const searchBar = document.querySelector('#searchBar');
export const searchBtn = document.querySelector('#searchBtn');
export const libBtn = document.querySelector('#libBtn');
export const loremDiv = document.querySelector('#lorem')
export const createBtn = document.querySelector('#createBtn')
const viewBtn = document.querySelector('#view')
const userSub = document.querySelector('#userSub')
const memberBtn = document.querySelector('#memberBtn')
//ROUTES==========================

//get all
libBtn.addEventListener('click', route.getAll) 
viewBtn.addEventListener('click', route.getWorkouts)
memberBtn.addEventListener('click', route.getMembers)

//get similar
searchBtn.addEventListener('click', route.getSimilar);

//open creator
createBtn.addEventListener('click', route.getCreator);

//post workout
route.submitBtn.addEventListener('click', route.submit)

//post user
userSub.addEventListener('click', route.createUser)


//patch workout
// .addEventListener('dblclick', postEdit)