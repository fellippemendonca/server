'use strict';

module.exports = users;

function users() {
  
  this.users = [],
  
  this.get = () => {
    return this.users;
  },
  
  this.add = (user) => {
    return this.users[`#${user.id}`] = user;
  },

  this.bind = (user, conn) => {
    this.find(user).connection = conn.id;
  },
  
  this.del = (user) => {
    return delete this.users[`#${user.id}`];
  },

  this.find = (user) => {
    return this.users[`#${user.id}`];
  }

}
