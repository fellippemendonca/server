'use strict';

module.exports = users;

function users() {
  
  this.users = {},
  this.connections = {},
  
  this.get = () => {
    return { users: this.users, connections: this.connections };
  },
  
  this.addConn = (conn) => {
    return this.connections[conn.id] = conn;
  },

  this.addUser = (user) => {
    return this.users[user.id] = user;
  },

  this.bind = (conn, user) => {
    this.addUser(user);
    this.findConn(conn.id).userId = user.id;
    this.findUser(user.id).connectionId = conn.id;
    return this.findUser(user);
  },

  this.findConnByUser = (id) => {
    let user = this.findUser(id);
    return this.connections[user.connectionId];
  },

  this.findConn = (id) => {
    return this.connections[id];
  },

  this.findUser = (id) => {
    return this.users[id];
  },

  this.del = (connId) => {
    let userId = this.findConn(connId).userId;
    this.delUser(userId);
    this.delConn(connId);
  }  

  this.delConn = (id) => {
    return delete this.connections[id];
  },

  this.delUser = (id) => {
    return delete this.users[id];
  }

}
