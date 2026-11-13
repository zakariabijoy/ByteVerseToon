// Restrict all preview sockets, including webpack's, to this PC.
const net = require("node:net");
const listen = net.Server.prototype.listen;
net.Server.prototype.listen = function (...args) {
  if (typeof args[0] === "object" && args[0] !== null) {
    args[0] = { ...args[0], host: "127.0.0.1" };
  } else if (typeof args[0] === "number") {
    if (typeof args[1] === "string") args[1] = "127.0.0.1";
    else args.splice(1, 0, "127.0.0.1");
  }
  return listen.apply(this, args);
};
