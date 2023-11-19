//IMPORTS==============
import * as route from './functions.mjs';
//HTML ELEMENTS==================
export const bottomDiv = document.querySelector('#bottomDiv')
export const searchBar = document.querySelector('#searchBar');
export const searchBtn = document.querySelector('#searchBtn');
export const libBtn = document.querySelector('#libBtn');
export const loremDiv = document.querySelector('#lorem')
export const createBtn = document.querySelector('#createBtn')
//ROUTES==========================

//get all
libBtn.addEventListener('click', route.getAll);

//get similar
searchBtn.addEventListener('click', route.getSimilar);

//open creator
createBtn.addEventListener('click', route.getCreator);

//post workout
route.submitBtn.addEventListener('click', route.submit)

//patch workout
// .addEventListener('dblclick', postEdit)