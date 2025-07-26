const User = require("../models/User"); // Assurez-vous d'avoir un modèle User

//get all user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclure le mot de passe
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    // Update fields (handle password separately to trigger hash)
    if (req.body.password) {
      user.password = req.body.password; // ✅ will be hashed by pre('save')
    }

    // Update other fields (excluding password again)
    Object.keys(req.body).forEach((key) => {
      if (key !== "password") {
        user[key] = req.body[key];
      }
    });

    await user.save(); // ✅ triggers pre('save') and hashes password

    const { password, ...userData } = user.toObject(); // remove password from response
    res.status(200).json({ success: true, data: userData });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// // follow user
exports.followUser = async (req, res) => {
  const { id } = req.params; // ID de l'utilisateur à suivre
  const { userId } = req.body; // ID de l'utilisateur qui suit

  if (id === userId) {
    return res.status(403).json({
      success: false,
      message: "Action invalide : Vous ne pouvez pas vous suivre vous-même.",
    });
  }

  try {
    const [followUser, followingUser] = await Promise.all([
      User.findById(id).select("followers fullName"),
      User.findById(userId).select("following"),
    ]);

    if (!followUser || !followingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    if (followUser.followers.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: `Vous suivez déjà ${followUser.fullName}`,
      });
    }

    await Promise.all([
      followUser.updateOne({ $push: { followers: userId } }),
      followingUser.updateOne({ $push: { following: id } }),
    ]);

    res.status(200).json({
      success: true,
      message: `Vous suivez maintenant ${followUser.fullName}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// // unfollw user
exports.unfollowUser = async (req, res) => {
  const { id } = req.params; // ID de l'utilisateur à ne plus suivre
  const { userId } = req.body; // ID de l'utilisateur qui ne suit plus

  if (id === userId) {
    return res.status(403).json({
      success: false,
      message:
        "Action invalide : Vous ne pouvez pas vous ne plus suivre vous-même.",
    });
  }

  try {
    const [followUser, followingUser] = await Promise.all([
      User.findById(id).select("followers fullName"),
      User.findById(userId).select("following"),
    ]);

    if (!followUser || !followingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    if (!followUser.followers.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: `Vous ne suivez pas ${followUser.fullName}`,
      });
    }
    await Promise.all([
      followUser.updateOne({ $pull: { followers: userId } }),
      followingUser.updateOne({ $pull: { following: id } }),
    ]);

    res.status(200).json({
      success: true,
      message: `Vous ne suivez plus ${followUser.fullName}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// // add a user to close friends list
exports.addCloseFriend = async (req, res) => {
  const { id } = req.params; // ID de l'utilisateur à ajouter comme ami proche
  const { userId } = req.body; // ID de l'utilisateur qui effectue l'action

  if (id === userId) {
    return res.status(403).json({
      success: false,
      message:
        "Action invalide : Vous ne pouvez pas vous ajouter vous-même comme ami proche.",
    });
  }

  try {
    const [followUser, followingUser] = await Promise.all([
      User.findById(id).select("followers fullName"),
      User.findById(userId).select("closeFriends"),
    ]);

    if (!followUser || !followingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    if (followingUser.closeFriends.includes(id)) {
      return res.status(403).json({
        success: false,
        message: `${followUser.fullName} est déjà un ami proche.`,
      });
    }

    await followingUser.updateOne({ $push: { closeFriends: id } });
    res.status(200).json({
      success: true,
      message: `${followUser.fullName} est maintenant un ami proche.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// // Remove a user from close friends
exports.removeCloseFriend = async (req, res) => {
  const { id } = req.params; // ID de l'utilisateur à retirer des amis proches
  const { userId } = req.body; // ID de l'utilisateur qui effectue l'action

  if (id === userId) {
    return res.status(403).json({
      success: false,
      message:
        "Action invalide : Vous ne pouvez pas vous retirer vous-même des amis proches.",
    });
  }

  try {
    const user = await User.findById(userId).select("closeFriends");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    if (!user.closeFriends.includes(id)) {
      return res.status(403).json({
        success: false,
        message: "Cet utilisateur n'est pas dans votre liste d'amis proches.",
      });
    }

    await user.updateOne({ $pull: { closeFriends: id } });
    res.status(200).json({
      success: true,
      message: "Utilisateur retiré de la liste des amis proches.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
