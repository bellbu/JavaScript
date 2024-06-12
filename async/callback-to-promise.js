/*
'use strict';

// JavaScript is synchronous.
// Execute the code block by orger after hoisting.
// hoisting: var, function declaration
console.log('1');
setTimeout(() => console.log('2'), 1000);
console.log('3');

// Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log('hello'));

// Asynchronous callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);

// Callback Hell example
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === 'ellie' && password === 'dream') ||
        (id === 'coder' && password === 'academy')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'ellie') {
        onSuccess({ name: 'ellie', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your passrod');
userStorage.loginUser(
  id,
  password,
  user => {
    userStorage.getRoles(
      user,
      userWithRole => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      error => {
        console.log(error);
      }
    );
  },
  error => {
    console.log(error);
  }
);
*/


// Callback Hell example
class UserStorage {
    loginUser(id, password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            (id === 'ellie' && password === 'dream') ||
            (id === 'coder' && password === 'academy')
          ) {
            resolve(id);
          } else {
            reject(new Error('not found'));
          }
        }, 2000);
      });
    }
  
    getRoles(user) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user === 'ellie') {
            resolve({ name: 'ellie', role: 'admin' });
          } else {
            reject(new Error('no access'));
          }
        }, 1000);
      });
    }
  
    // Homework Answer 🚀
    async getUserWithRole(user, password) {
      const id = await this.loginUser(user, password);
      const role = await this.getRoles(id);
      return role;
    }
  }
  
  // Original code from Youtube course
  const userStorage = new UserStorage();
  const id = prompt('enter your id');
  const password = prompt('enter your passrod');
  userStorage
    .loginUser(id, password)
    .then(userStorage.getRoles)
    .then(user => alert(`Hello ${user.name}, you have a ${user.role} role`))
    .catch(console.log);
  
  // Homework Answer 🚀
  userStorage
    .getUserWithRole(id, password) //
    .catch(console.log)
    .then(console.log);