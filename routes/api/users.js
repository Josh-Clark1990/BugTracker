import express from "express";
import debug from "debug";

const router = express.Router();
const debugUser = debug("app:User");

// In-memory user list
export const users = [
  {
    userId: 1,
    email: "cclark1990@gmail.com",
    password: "password1",
    firstName: "Courtney",
    lastName: "Clark",
    role: "admin",
  },
  {
    userId: 2,
    email: "mguelbert1993@hotmail.com",
    password: "password2",
    firstName: "Matt",
    lastName: "Guelbert",
    role: "mod",
  },
  {
    userId: 3,
    email: "tgoodman1994@compuserver.com",
    password: "password3",
    firstName: "Troy",
    lastName: "Goodman",
    role: "user",
  },
];

// ---------------- GET USER BY ID ----------------
router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  const user = users.find((user) => user.userId == id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// ---------------- REGISTER USER ----------------
router.post("/register", (req, res) => {
  const newUser = req.body;
  newUser.userId = users.length + 1;

  const exists = users.find((u) => u.email === newUser.email);
  if (exists) {
    return res.status(400).type("text/plain").send("User already exists");
  }

  if (!newUser.email) {
    return res.status(400).type("text/plain").send("Email is required");
  }
  if (!newUser.password) {
    return res.status(400).type("text/plain").send("Password is required");
  }
  if (!newUser.firstName) {
    return res.status(400).type("text/plain").send("First name is required");
  }
  if (!newUser.lastName) {
    return res.status(400).type("text/plain").send("Last name is required");
  }
  if (!newUser.role) {
    return res.status(400).type("text/plain").send("User role is required");
  }

  users.push(newUser);
  debugUser(`New user added: ${newUser.email}`);
  res.status(201).json(newUser);
});

// ---------------- LOGIN USER ----------------
router.post("/login", (req, res) => {
  const user = req.body;

  if (!user.email) {
    return res.status(400).type("text/plain").send("Email is required");
  }
  if (!user.password) {
    return res.status(400).type("text/plain").send("Password is required");
  }

  const searchUser = users.find(
    (u) => u.email === user.email && u.password === user.password
  );

  if (searchUser) {
    res.status(200).json({ message: "User logged in successfully" });
  } else {
    res.status(400).type("text/plain").send("Invalid credentials");
  }
});

// ---------------- UPDATE USER ----------------
router.put("/:userId", (req, res) => {
  const id = req.params.userId;
  const userToUpdate = users.find((user) => user.userId == id);

  if (!userToUpdate) {
    return res.status(404).type("text/plain").send("User not found");
  }

  const updatedUser = req.body;
  for (const key in updatedUser) {
    userToUpdate[key] = updatedUser[key];
  }

  const index = users.findIndex((user) => user.userId == id);
  if (index !== -1) {
    users[index] = userToUpdate;
  }

  res.status(200).type("text/plain").send("User updated successfully");
});

// ---------------- DELETE USER ----------------
router.delete("/:userId", (req, res) => {
  const id = req.params.userId;
  const index = users.findIndex((user) => user.userId == id);

  if (index !== -1) {
    users.splice(index, 1);
    res.status(200).type("text/plain").send(`User ${id} deleted successfully`);
  } else {
    res.status(404).type("text/plain").send("User not found");
  }
});

export { router as userRouter };
