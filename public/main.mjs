//IMPORT & EXPORTS FUNCTIONS==============
import * as route from './functions.mjs';
export function getNameInput() {
    return $nameInput.val()
}
//HTML ELEMENTS==================
const $body = $('#body');
const $logoDiv = $('#logoDiv');
const $centerDiv = $('#centerDiv');
const $searchDiv = $('#searchDiv');
const $nameInput = $('#nameInput');
const $nameBtn = $('#nameBtn');
const $targetInput = $('#targetInput');
const $targetBtn = $('#targetBtn');
const $centerBtn = $('#centerBtn');
//ROUTES==========================
//get all
$centerBtn.on('click', route.getAll);

//get similar
$nameBtn.on('click', route.getSimilar)