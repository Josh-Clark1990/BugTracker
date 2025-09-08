import express from "express";
import debug from "debug";
import { users } from "./users.js";

const router = express.Router();
const debugBug = debug("app:bug");

// In-memory bug list
const bugs = [
  { bugId: 1, bugInfo: "network issue" },
  { bugId: 2, bugInfo: "software crash" },
  { bugId: 3, bugInfo: "driver issue" },
];

// ---------------- LIST BUGS ----------------
router.get("/list", (req, res) => {
  res.status(200).json(bugs);
});

// ---------------- GET BUG BY ID ----------------
router.get("/:bugId", (req, res) => {
  const id = req.params.bugId;
  const bug = bugs.find((b) => b.bugId == id);

  if (bug) {
    res.status(200).json(bug);
  } else {
    res.status(404).type("text/plain").send("Bug not found");
  }
});

// ---------------- SUBMIT NEW BUG ----------------
router.post("/submit", (req, res) => {
  const newBug = req.body;
  newBug.bugId = bugs.length + 1;

  bugs.push(newBug);
  debugBug(`New bug submitted: ${newBug.bugInfo}`);
  res.status(201).json(newBug);
});

// ---------------- UPDATE BUG ----------------
router.put("/:bugId", (req, res) => {
  const id = req.params.bugId;
  const bugToUpdate = bugs.find((b) => b.bugId == id);

  if (!bugToUpdate) {
    return res.status(404).type("text/plain").send("Ticket not found");
  }

  Object.assign(bugToUpdate, req.body);
  res.status(200).type("text/plain").send("Bug ticket updated successfully");
});

// ---------------- ASSIGN BUG TO USER ----------------
router.put("/:bugId/assign", (req, res) => {
  const bugId = req.params.bugId;
  const userId = req.body.userId;

  const bug = bugs.find((b) => b.bugId == bugId);
  const user = users.find((u) => u.userId == userId);

  if (bug && user) {
    bug.assignedTo = user.userId;
    res
      .status(200)
      .type("text/plain")
      .send(
        `Issue ${bugId} has been assigned to ${user.firstName} ${user.lastName}`
      );
  } else {
    res.status(404).type("text/plain").send("Bug or user not found");
  }
});

// ---------------- CLOSE BUG ----------------
router.delete("/:bugId", (req, res) => {
  const id = req.params.bugId;
  const index = bugs.findIndex((b) => b.bugId == id);

  if (index !== -1) {
    bugs.splice(index, 1);
    res
      .status(200)
      .type("text/plain")
      .send(`Ticket ${id} closed successfully`);
  } else {
    res.status(404).type("text/plain").send("Ticket not found");
  }
});

export { router as bugRouter };
