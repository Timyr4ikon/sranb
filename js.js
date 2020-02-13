'use strict';


const dishCategories = [
    {
        img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493018_32.jpg',
        name:'Первые блюда'
    },
    {
        img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493077_34.jpg',
        name:'Холодные закуски'
    },
    {
        img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493061_31.jpg',
        name:'Салаты'
    },
    {
        img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493190_30.jpg',
        name:'Бар'
    },
    {
        img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493368_33.jpg',
        name:'Вторые блюда'
    },
    {
        img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493495_35.jpg',
        name:'Десерты'
    },
    {
        img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493956_151.jpg',
        name:'Кальян'
    }
]
const countValue = 0;

const quantity = document.querySelector('span[data-action="quantity"]');
const categoriesList = document.querySelector('.categories__list');



////////////////COUN QUANTITY
const arr = [];

dishCategories.forEach(el =>{
   const categoriesItem =  document.createElement('li');
   categoriesItem.classList.add('categories__item');
    const par = `<div class="categories__meal"><span class="open-sub_categories"></span><img  class="categories__img" src="${el.img}" alt=""><span data-action="name">${el.name}</span></div><div class="btn-open"><a href="#">Ред.</a><button class="btn-open__btn" data-action="openHideMenu">...<ul class="btn-open__list"><li class="btn-open__item" data-action="hide" >Скрыть</li><li class="btn-open__item" data-action="delete">Удалить</li></ul></button></div>`;
    categoriesItem.insertAdjacentHTML('beforeend',par) 
    arr.push(categoriesItem);
})
categoriesList.append(...arr);
quantity.textContent =categoriesList.children.length;



///////////CREATE-LIST

categoriesList.addEventListener('click',(e) =>{

    const arrOpenMenu = document.querySelectorAll('.btn-open__list--on');
    const element= e.target; 
    const showParent = element.parentNode.parentNode.parentNode.previousElementSibling;

    const exitByEsc = function (e){
        if(e.code === 'Escape'){
            e.target.firstElementChild.classList.remove('btn-open__list--on');
        };
        window.removeEventListener('keydown',exitByEsc);
     } 
    const exitByCLick = function (e){
        if(e.target.dataset.action === 'openHideMenu'){
            return;
        }
        element.firstElementChild.classList.remove('btn-open__list--on');
        window.removeEventListener('click',exitByCLick)  

        }

        if(element.dataset.action === 'openHideMenu'){
        arrOpenMenu.forEach(el => el.classList.remove('btn-open__list--on'));
        element.firstElementChild.classList.add('btn-open__list--on');

        window.addEventListener('keydown',exitByEsc);

        window.addEventListener('click',exitByCLick)  
        }

        if(element.dataset.action === 'hide'){
            element.textContent = 'Показать';
            element.dataset.action = 'review';
            showParent.classList.add('low-opacity');
            return;
        }
        
        if(element.dataset.action === 'review'){
            element.textContent = 'Скрыть';
            element.dataset.action = 'hide';
            showParent.classList.remove('low-opacity');
        }

        if(element.dataset.action === 'delete'){
            if(confirm('It was missclick, bro =3')){
                showParent.parentNode.remove();
                quantity.textContent =categoriesList.children.length;
            }
            else{
                return;
            }
        }


    })


/////////////////////////////SEARCH-FORM

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (e) => e.preventDefault())
const searchInput = document.querySelector('input[name="fast-search"]');
const namesArr = Array.from(document.querySelectorAll('span[data-action="name"]'));
const categoriesItemArr = namesArr.map(el  =>el.parentNode.parentNode);

const searchDish = function(){
     searchInput.value === "" ?  categoriesItemArr.forEach(el => el.classList.remove('dn')) :  categoriesItemArr.forEach(el => el.classList.add('dn'));
    namesArr.forEach(el => {
       if(el.textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
           el.parentNode.parentNode.classList.remove('dn');
       }
    });
}



searchInput.addEventListener('input',searchDish)






