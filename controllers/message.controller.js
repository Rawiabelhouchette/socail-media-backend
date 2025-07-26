const message = require("../models/message");

// Créer un nouveau message
exports.createMessage = async (req, res) => {
  try {
    // Extraction des données du corps de la requête
    const { sender, receiver, text } = req.body;

    // Création d'une instance du message
    const newMessage = new message({ sender, receiver, text });

    // Sauvegarde dans la base de données
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Erreur lors de la création du message :", error);
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les messages d'un chat
exports.getAllMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.params;

    // Recherche des messages pour le chat donné, triés par date de création
    const messages = await message
      .find({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
      })
      .sort({ createdAt: 1 });
    console.log("messages = ", messages);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    res.status(500).json({ error: error.message });
  }
};
