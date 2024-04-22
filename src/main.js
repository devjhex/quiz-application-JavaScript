import * as questions from './questions.js';
import * as results from './results.js';
import * as customize from './customSettings.js';
import * as userAnswers from './userAnswers.js';

const app = {
    pages:[],
    
    show:new Event('show'),

    init:function(event){
         /* Add an event listener to all the pages. */
         app.pages = document.querySelectorAll('.page');

         app.pages.forEach(page=>{
             page.addEventListener('show', app.pageShown);
         });
 
         /* Add an event listener to all the nav-links. */
         document.body.addEventListener('click', (event)=>{
             let btn = event.target.closest('.nav-link');
             if (!btn) return;

             /* Call the function that is supposed to be called on click of the button. */
             app.nav(event);
         });

         /* Replace the location bar with some default text. */
         history.replaceState({}, 'Home', '#start');

         window.addEventListener('popstate', app.poppin);
    },

    nav:function(event){
        /* prevent the default of what links usually do. */
       event.preventDefault();

       /* set up what the nav links should do... */
       //get page
       let currentPage = event.target.getAttribute('data-target');

       /* Remove the active class on the page which has the active class from it. */
       document.querySelector('.active').classList.remove('active');

       /* Add the class on the page which has been  */
       document.getElementById(currentPage).classList.add('active');

       /* Push state to the history array because it was stopped by default */
       history.pushState({}, currentPage, `#${currentPage}`);

       /* Change the title */
       document.title = 'Learn With Eddie | ' + currentPage;

       /* dispatch the event object from the div went to. */
       document.getElementById(currentPage).dispatchEvent(app.show);

    },

    pageShown:function(event){

          /* Determine what to call according to what has been selected. */

        if(event.target.id === 'quiz') {

            questions.initialize();

        }else if(event.target.id === 'results') {

            results.renderComment();

        }
    },

    poppin:function(event){
        /* Remove the hash. */
        let hash = location.hash.replace('#', '');

        /* do the same navigation as the previous link. */
        /* Remove the active class on the page which has the class active from it. */
        document.querySelector('.active').classList.remove('active');

        /* Add the class on the page which has been targeted. */
        document.getElementById(hash).classList.add('active');

         /* Dispatch the event object from the dive that you just went to. */
        document.getElementById(hash).dispatchEvent(app.show);
    }
};

document.addEventListener('DOMContentLoaded', app.init);