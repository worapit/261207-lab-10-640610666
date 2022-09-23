import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomIdx === -1)
      return res.status(404).json({
        ok: false,
        message: "Invalid room id",
      });
    return res.json({
      ok: true,
      messages: rooms[roomIdx].messages,
    });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const id = req.query.roomId; //string
    const roomIdx = rooms.findIndex((x) => x.roomId === id); //หาไอดี

    if (roomIdx === -1) {
      return res.status(404).json({
        ok: false,
        message: "Invalid room id",
      });
    }
    if (typeof req.body.text !== "string" || req.body.text.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Invalid text input",
      });
    }

    const newText = {
      messageId: uuidv4(), //กำหนดเลขไอดีอันใหม่
      text: req.body.text,
    };
    rooms[roomIdx].messages.push(newText);
    writeDB(rooms);
    return res.json({ ok: true, message: newText });
  }
}
