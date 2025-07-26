const Notification = require("../models/notification");

exports.createNotification = async (req, res) => {
  try {
    const newNotif = new Notification(req.body);
    const savedNotif = await newNotif.save();
    res.status(201).json(savedNotif);
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiverId: req.params.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};
exports.markAsRead = async (req, res) => {
  try {
    const updatedNotif = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json(updatedNotif);
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Notification supprimée" });
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};
