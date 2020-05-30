const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')
const closeButton = document.querySelector('.grey')
const accountDetails = document.querySelector('.account-details')
const guideList = document.querySelector('.guides')
const homeDisplay = document.querySelector('.home-container')
const landingPage = document.querySelector('.landing-page')

let things = []

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

const setupUI = (user) => {
  if(user){
    console.log('USER ', user);
    accountDetails.innerHTML = `<h5 class='light-blue-text'>Logged in as: <span class='blue-text text-darken-3'>${user.email}</span></h5>`
    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block')
    loggedOutLinks.forEach(item => item.style.display = 'none')
    homeDisplay.style.display = 'none'
  }else{
    accountDetails.innerHTML = '<h5>Not logged in!</h5>'
    console.log(user);
    loggedInLinks.forEach(item => item.style.display = 'none')
    loggedOutLinks.forEach(item => item.style.display = 'block')
    landingPage.style.display = 'block'
  }
}


// remove function
const removeTransaction = (id) => {
  console.log(things.toDo);
  console.log(id);

  const UID = db.collection('accounts').doc()
  const USERid = UID.firestore.QT.credentials.currentUser.uid
  let addStuff =   db.collection('accounts').doc(USERid)

  addStuff.update({
    toDo: things.toDo.filter(item => item.id !== id)
  })
}


// toggle class for 'check' on tasks
guideList.addEventListener('click', function(ev){
  if(ev.target.classList.contains('chew')){
    console.log('object');
    ev.target.classList.toggle('checked')
    ev.target.classList.toggle('lighten-4')
  }
}, false)


const sToggle = document.querySelector('.sToggle')
// setup tasks
const setupTasks = (data) => {
  let taskLength = document.querySelector('.tasks')
  console.log('data ', data.toDo);
  console.log('data ID ', data.id);
things = data
  if (data.toDo){
    taskLength.innerHTML = data.toDo.length
    if(data.toDo.length === 1){
      sToggle.style.display = 'none'
    }else{
      sToggle.style.display = 'inline-block'
    }
    let html = ''
    data.toDo.forEach((item) => {

      console.log(item);
      const li = `
        <li class="collection-item hoverable" style='margin-bottom: 10px'>
          <div class='collection-item grey lighten-4 chew'>${item.tasks}<a href="#!" class="secondary-content"><i class="material-icons close" onclick="removeTransaction(${item.id})">close</i></a></div>
        </li>
      `
      html += li
    })
    guideList.innerHTML = html
  }else{
    homeDisplay.style.display = 'block'
    guideList.innerHTML = ''
  }
}


// Wrap every letter in a span for h1 title
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 1500,
    delay: (el, i) => 70 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: infinite
  });

