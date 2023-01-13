// datos de firebase conecta a firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtoytsz_CdgUAkeh-UOVhZk2oEK3Kski0",
  authDomain: "mechapp-638aa.firebaseapp.com",
  databaseURL: "https://mechapp-638aa-default-rtdb.firebaseio.com",
  projectId: "mechapp-638aa",
  storageBucket: "mechapp-638aa.appspot.com",
  messagingSenderId: "710522277257",
  appId: "1:710522277257:web:3feec850f194cf4fc1a558",
  measurementId: "G-9DQEKFYW05"
  
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
 
  
  // funcion registro
  function register () {
    var provincia = document.getElementById('provincia');
   provincia.addEventListener('change',
   function(){
    var selectedOption =this.options[provincia.selectedIndex];
    console.log(selectedOption.value + ': ' + selectedOption.text);
  });
   ciudad =    document.getElementById('ciudad').value
    direccion = document.getElementById('direccion').value
    distancia = document.getElementById('distancia').value
    full_name = document.getElementById('full_name').value  
    email = document.getElementById('email').value
    password = document.getElementById('password').value
     
    
    

   
  
    // Validar input fields

    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password vacios!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(provincia) == false || validate_field(ciudad) == false || validate_field(direccion) == false || validate_field(distancia) == false) {
      alert('Uno o mas campos estan vacios!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        provincia : "Chimborazo",
        ciudad : ciudad,
        direccion : direccion,
        distancia : distancia,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('Usuario Creado Exitosamente!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Correo o Contraseña Incorrectos!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('Usuario Logeado Exitosamente!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }