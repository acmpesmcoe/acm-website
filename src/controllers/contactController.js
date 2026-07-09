import ContactMessage from "../models/ContactMessage.js";

// Public: anyone can submit the contact form
export async function submitMessage(req, res, next) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are all required" });
    }
    const saved = await ContactMessage.create({ name, email, message });
    res.status(201).json({ message: "Message received. We'll get back to you soon.", id: saved._id });
  } catch (err) {
    next(err);
  }
}

// Admin only: view submitted messages
export async function getMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort("-createdAt");
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function markRead(req, res, next) {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ error: "Not found" });
    res.json(msg);
  } catch (err) {
    next(err);
  }
}

export async function deleteMessage(req, res, next) {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
}
