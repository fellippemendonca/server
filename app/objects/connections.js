'use strict';

module.exports = connections;

function connections() {
  
  this.connections = [],
  
  this.get = (conn) => {
    return this.connections;
  },
  
  this.add = (conn) => {
    return this.connections[conn.id] = conn;
  },

  this.bind = (conn, obj) => {
    this.find(conn).user = obj;
  },
  
  this.del = (conn) => {
    return delete this.connections[conn.id];
  },

  this.find = (conn) => {
    return this.connections[conn.id];
  }
  
}
