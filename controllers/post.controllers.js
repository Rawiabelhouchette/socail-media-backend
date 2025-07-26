const Post = require("../models/post");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const Gift = require("../models/gift");
const notification = require("../models/notification");

//Create post

exports.createPost = async (req, res) => {
  try {
    const { category, caption, creator, picture } = req.body;

    // Vérifier si un fichier a été uploadé
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newPost = new Post({
      category,
      caption,
      creator,
      picture,
    });

    await newPost.save();
    const user = await User.findById(creator);
    const notificationCreate = new notification({
      text: "Post creation",
      content: `${user?.fullName} create a post named ${caption} `,
    });

    await notificationCreate.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du post" });
    console.log(error);
  }
};

// Fonction pour récupérer tous les posts
exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().populate("creator").sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des posts" });
    console.log(error);
  }
};
exports.getAllPostAndGifts = async (req, res) => {
  try {
    const posts = (await Post.find().populate("creator").lean()).map((p) => ({
      ...p,
      type: "post",
    }));
    const gifts = (await Gift.find().populate("creator").lean()).map((g) => ({
      ...g,
      type: "gift",
      picture:
        "https://res.cloudinary.com/dl4ovpc9p/image/upload/v1749385695/gift_t8atrd.png",
    }));

    const combined = [...posts, ...gifts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    console.log(combined);
    res.status(200).json(combined);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des posts" });
    console.log(error);
  }
};

// Fonction pour récupérer tous les posts
exports.getMyPost = async (req, res) => {
  try {
    const posts = await Post.find({ creator: req.params.userId })
      .populate("creator")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des posts" });
    console.log(error);
  }
};
// Update post
exports.updatePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "ID inconnu" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { caption: req.body.caption },
      { new: true }
    );

    if (!updatedPost)
      return res.status(404).json({ error: "Post introuvable" });
    const user = await User.findById(creator);
    const notificationCreate = new notification({
      text: "Post update",
      content: `${user?.fullName} update  post to be ${req.body.caption} `,
    });

    await notificationCreate.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete post
exports.deletePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "ID inconnu" });

  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res.status(404).json({ error: "Post introuvable" });

    res.status(200).json({ ms: "deleted with success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//like or unlike post
exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "ID inconnu" });

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post introuvable" });

    const alreadyLiked = post.likers.includes(req.body.id);

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { [alreadyLiked ? "$pull" : "$addToSet"]: { likers: req.body.id } },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Comment post
exports.commentPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "ID inconnu" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterName: req.body.commenterName,
            text: req.body.text,
            image: req.body.image,
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit comment
exports.editCommentPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "ID inconnu" });

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post introuvable" });

    const comment = post.comments.id(req.body.commentId);
    if (!comment)
      return res.status(404).json({ error: "Commentaire introuvable" });

    comment.text = req.body.text;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete comment
exports.deleteCommentPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "ID inconnu" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: { _id: req.body.commentId } } },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Share post
exports.sharePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "ID inconnu" });

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post introuvable" });

    // Ajouter l'utilisateur qui partage le post
    const alreadyShared = post.shares.includes(req.body.id);

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { [alreadyShared ? "$pull" : "$addToSet"]: { shares: req.body.id } },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
