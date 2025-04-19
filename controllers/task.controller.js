const Task = require("../models/task.model");
const User = require("../models/user.model");
const sendMail = require("../utils/mailer");

exports.createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      creator: req.user.id,
      assignedTo,
    });

    await sendMail(assignedTo, "New Task Assigned", {
      title,
      description,
      action: "assigned",
      creator: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const role = req.user.role;
  const id = req.user.id;

  const filter = role === "admin" ? {} : {
    $or: [{ creator: id }, { assignedTo: id }],
  };

  const tasks = await Task.find(filter).populate("creator assignedTo", "name email");
  res.json(tasks);
};

exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task || task.assignedTo.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not allowed" });

  task.status = "completed";
  await task.save();

  await sendMail(task.creator, "Task Completed", {
    title: task.title,
    description: task.description,
    action: "completed",
    creator: task.creator,
    assignee: task.assignedTo,
  });

  res.json(task);
};

exports.assignTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const task = await Task.findById(id);
  if (!task || task.creator.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not allowed" });

  task.assignedTo = userId;
  await task.save();

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task || (req.user.role !== "admin" && task.creator.toString() !== req.user.id))
    return res.status(403).json({ msg: "Not allowed" });

  await task.deleteOne();
  res.json({ msg: "Deleted" });
};

exports.groupByUser = async (req, res) => {
  const results = await Task.aggregate([
    { $group: { _id: "$assignedTo", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        user: "$user.name",
        tasksAssigned: "$count",
      },
    },
  ]);
  res.json(results);
};

exports.groupByStatus = async (req, res) => {
  const results = await Task.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);
  res.json(results);
};