const logout = document.querySelector('#logout')
const loginForm = document.querySelector('#login-form')
const createForm = document.querySelector('#create-form')



// LISTEN for auth changes
auth.onAuthStateChanged(user => {

  if(user){
    console.log('user is ', user);
    // get data for database. Snapshot method is realtime listener from firebase
    db.collection('accounts').doc(user.uid)
    .onSnapshot(snapshot => {
      console.log(snapshot.data());
      setupTasks(snapshot.data())
      setupUI(user)
      // removeTransaction(snapshot.data())
    }, err => {console.log(err.message)})
    
  }else{

    console.log('user is ', user);
    setupUI()
    // empty array because you want whats rendered to be nothing
    setupTasks([])
  }
})


// SIGNUP
const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // get user info
  const email = signupForm['signup-email'].value
  const password = signupForm['signup-password'].value

  // db.collection('randomUsers').add({
  //   username: signupForm['signup-email'].value
  // })

  // signup user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
    const user = cred.user
    console.log('123 ', user);
    const userID = cred.user.uid 
    
    const account = {
      id: userID,
      // tasks: []
    }
    db.collection('accounts').doc(userID).set(account)
    const modal = document.querySelector('#modal-signup')
    M.Modal.getInstance(modal).close()
    signupForm.reset()
     setupTasks(userID)
     setupUI(user)
  })
})

// LOGOUT
logout.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('signed out');
  auth.signOut()
})

// LOGIN

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // get user info
  const email = loginForm['login-email'].value
  const password = loginForm['login-password'].value

  auth.signInWithEmailAndPassword(email, password).then(cred =>{
    // close modal with materialize
    console.log('loged in');
    console.log(cred);
    const modal = document.querySelector('#modal-login')
    M.Modal.getInstance(modal).close()
    loginForm.reset()

  })
})

// ADD ID TO EACH TASK
// You need to create task: {task1: xxx, id: Math.random}
// 5. Generate random ID
function GenerateID() {
  return Math.floor(Math.random() * 100000000)
}



createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const UID = db.collection('accounts').doc()

  const USERid = UID.firestore.QT.credentials.currentUser.uid
  console.log(USERid);
  // db.collection('tasks').doc('bottles').collection('thingstodo').doc('things').set
  let transaction = {
    tasks: createForm['title'].value,
    id: GenerateID()
  }
  // let taskArray = []
  // taskArray.push(transaction)
  let addStuff =   db.collection('accounts').doc(USERid)
  addStuff.update({
    toDo: firebase.firestore.FieldValue.arrayUnion(transaction)
    
  // })

  // db.collection('accounts').doc(USERid).add({
  //   task: createForm['title'].value
  }).then(() => {
    // close modal
    const modal = document.querySelector('#modal-create')
    M.Modal.getInstance(modal).close()
    createForm.reset()

  }).catch(err => {
    console.log(err.message);
  })
})


