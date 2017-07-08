'use strict';

module.exports = connections;

function connections() {
  
  this.connections = [],
  
  this.getConn = (conn) => {
    return this.connections;
  },
  
  this.addConn = (conn) => {
    let simpleConn = getConnInfo(conn);
    return this.connections[simpleConn.id] = simpleConn;
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
    let index = this.connections.map((element) => {
      return element.id;
    }).indexOf(getConnInfo(conn).id);
    if (index > -1) {
      return this.connections.splice(index, 1);
    } else {
      return this.connections;
    }
  },

  this.listConn = () => {
    return this.connections.map((element) => {
      return { id: element.id, user: element.user };
    })
  },

  this.findConn = (conn) => {
    return this.connections[getConnInfo(conn).id];
  },

  this.findByUserId = (id) => {
    let index = this.connections.map((element) => { return element.user.id }).indexOf(id);
    if (index > -1) {
      return this.connections[index];
    } else {
      return unknown;
    }
  }
}



// HELPERS 
function getConnInfo(connection) {
  return {
    id: connection.remoteAddress + ':' + connection.remotePort,
    connection: connection,
    user: { id: -1, name: 'unset'}
  }
}
