//IMPORTS==============
import * as route from './functions.mjs';
//HTML ELEMENTS==================
const body = document.querySelector('#body')
const topDiv = document.querySelector('#topDiv')
export const bottomDiv = document.querySelector('#bottomDiv')
const logoDiv = document.querySelector('#logoDiv');
const centerDiv = document.querySelector('#centerDiv');
const searchDiv = document.querySelector('#searchDiv');
export const nameInput = document.querySelector('#nameInput');
const nameBtn = document.querySelector('#nameBtn');
const targetInput = document.querySelector('#targetInput');
const targetBtn = document.querySelector('#targetBtn');
const centerBtn = document.querySelector('#centerBtn');
//ROUTES==========================
//get all
centerBtn.addEventListener('click', route.getAll);

//get similar
nameBtn.addEventListener('click', route.getSimilar);

//create 1
