const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register event lister
emitter.on("MessageLoaded", arg => {
  console.log("Event Emitted", arg);
});

// Load event emitter
emitter.emit("MessageLoaded", { id: 1, url: "https://befemiter.net" });
