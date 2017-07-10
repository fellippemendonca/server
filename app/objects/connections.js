'use strict';

module.exports = connections;

function connections() {
  
  this.connections = [],
  
  this.getConn = (conn) => {
    return this.connections;
  },
  
  this.addConn = (conn) => {
    return this.connections[conn.id] = conn;
  },

  this.bindUser = (conn, obj) => {
    let connection = this.findConn(conn);
    if (connection.user.id === -1) {
      return connection.user = obj;
    } else {
      return connection.user;
    }
  },

  this.getUserConn = (id) => {
    return this.findByUserId(id).connection;
  },
  
  this.delConn = (conn) => {
    return delete this.connections[conn.id];
  },

  this.listConn = () => {
    let list = [];
    for ( let element in this.connections ) {
      list.push(this.connections[element].id);
    }
    return list;
  },

  this.findConn = (conn) => {
    return this.connections[conn.id];
  },

  this.findByUserId = (id) => {
    for ( let element in this.connections ) {
      if (this.connections[element].user.id === id) {
        return this.connections[element];
      }
    }
    return undefined;
  }
}
