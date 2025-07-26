const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3000", // Remplace par ton front si besoin
    methods: ["GET", "POST"],
  },
});

// Liste des utilisateurs en ligne
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log(" Nouvelle connexion :", socket.id);

  //Ajouter un nouvel utilisateur connecté
  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }

    console.log(" Utilisateurs connectés :", onlineUsers);

    // Envoyer la liste des utilisateurs connectés à tous
    io.emit("getOnlineUsers", onlineUsers);
  });

  //Réception d'un message à envoyer
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      // Envoi du message
      io.to(user.socketId).emit("getMessage", message);

      // Envoi d'une notification
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  // Déconnexion de l'utilisateur
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log(" Utilisateur déconnecté :", socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

// Démarrer le serveur
const PORT = 8080;
io.listen(PORT);
console.log(` Serveur Socket.IO en écoute sur le port ${PORT}`);
