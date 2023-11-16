//IMPORT FUNCTIONS==============
import * as route from './functions.mjs';
//HTML ELEMENTS==================
const $body = $('#body');
const $logoDiv = $('#logoDiv');
const $centerDiv = $('#centerDiv');
const $searchDiv = $('#searchDiv');
const $siteInput = $('#siteInput');
const $siteBtn = $('#siteBtn');
const $webInput = $('#webInput');
const $webBtn = $('#webBtn');

//ROUTES==========================
//get all
$siteBtn.on('click', route.getAllExercises);