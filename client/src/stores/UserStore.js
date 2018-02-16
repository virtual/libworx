import {extendObservable} from 'mobx';
var axios = require('axios');

export default class UserStore {
  constructor() {
    let userVal = sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user')) : null;
    extendObservable(this, {
      user: userVal,
      message: null,
      retrieveUser() {
        return this.user;
      } 
    })
  }
  
  loginUser(username, password) {
    // console.log(username, password);
    return new Promise((resolve, reject) => {
      axios.post('/login', {
        username: username,
        password: password
     }).then((answer) => { 
      console.log(answer);
      console.log(answer.data);
        if (answer.data.user_id) { 

          let loggedUser={
            firstName: answer.data.name_first, 
            lastName: answer.data.name_last,
            email: answer.data.username,
            id: answer.data.user_id,
            created: answer.data.created
          }
          this.user = loggedUser;  
          sessionStorage.setItem('user', JSON.stringify(loggedUser));  
          
        } else {
          reject(answer)
          this.message = answer.data.message
        }
        resolve(answer)
      })
  });
}

userCollection() {
  let userId = JSON.parse(sessionStorage.getItem('user')).id;
  return new Promise((resolve, reject)=>{
  axios.get("/collections/" + userId).then((obj)=>{
      if (obj.data) {
        // this.user = obj.data
        console.log(obj.data)
      } else {
        console.log("failed");
        reject(obj);
      }
      resolve(obj);
    })
  })
}

createNewUser(newUserObj) {
  return new Promise((resolve, reject)=>{
  axios.post("/signup", 
   {firstName: newUserObj.firstName,
    lastName: newUserObj.lastName,
    email: newUserObj.email,
    password: newUserObj.password}
    ).then((userObj)=>{
      if (userObj.data) {
        this.user = userObj.data
      } else {
        console.log("user add failed");
        reject(userObj);
      }
      resolve(userObj);
    })
  })
}

  logout() {
    return new Promise((resolve, reject) => {
      axios.get('/logout').then((res)=> {
        if (res.data.loggedIn === false) { 
          this.user = null;  
          sessionStorage.removeItem('user');
        }  else {
          console.log('undefined');
          reject(res);
        }
        resolve(res);
      }, function(err){
          console.log(err);
      });
    });
  }

} // closes UserStore