/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "./src/questions.js",
    "./src/results.js",
    "./src/userAnswers.js"
  ],
  theme: {
    extend: {
      screens:{
        'xs':'320px',
        's':'375px',
        'sm':'412px',
        'md':'760px',
        'lg':'1024px',
        'xl':'1280px',
        '2xl':'1536px',
      },
      keyframes:{
        fadeIn:{
          '0%': {opacity:'0'},
          '100%': {opacity:'1'}
        },
        hexPulse:{
          '50%':{opacity:'.2'}
        },
        load:{
          '0%':{width:'0%'},
          '100%':{width:'100%'} 
        },
        invalid:{
          '0%':{borderColor:'rgb(249,115,22)'},
          '100%':{borderColor:'rgb(153,27,27)'}
        },
        invalidText:{
          '0%':{color:'rgb(249,115,22)'},
          '100%':{color:'rgb(153,27,27)'}
        }
      },
      animation:{
        fadeIn: 'fadeIn .3s linear forwards',
        hexPulse:'hexPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        load:'load 1s linear forwards',
        invalid:'invalid 1s linear infinite',
        notification:'invalidText 1s linear infinite'
      },
    },
  },
  plugins: [],
}

