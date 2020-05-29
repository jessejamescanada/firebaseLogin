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
    accountDetails.innerHTML = `<h5>Logged in as: ${user.email}</h5>`
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



// setup tasks
const setupTasks = (data) => {
  console.log('data ', data.toDo);
  console.log('data ID ', data.id);
things = data
  if (data.toDo){
    let html = ''
    data.toDo.forEach((item) => {
      // const tasks = item.data()
      console.log(item);
      const li = `
        <li class="collection-item hoverable" style='margin-bottom: 10px'>
          <div class='collection-item grey lighten-4'>${item.tasks}<a href="#!" class="secondary-content"><i class="material-icons close" onclick="removeTransaction(${item.id})">close</i></a></div>
        </li>
      `
      html += li
    })
    guideList.innerHTML = html
  }else{
    // console.log(data.task.length);
    // guideList.innerHTML = '<h5 class="center-align">Login or Create tasks!</h5>'
    homeDisplay.style.display = 'block'
    guideList.innerHTML = ''
  }
}

// DELETE task
// closeButton.addEventListener('click', () => {
//   console.log('object');
//   const UID = db.collection('accounts').doc()

//   const USERid = UID.firestore.QT.credentials.currentUser.uid
//   console.log(USERid);

//  db.collection('accounts').doc(USERid).delete()
// })

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

