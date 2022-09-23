import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();

  const result = rooms.map((x) => ({
    roomId: x.roomId,
    roomName: x.roomName,
  }));

  return res.json({ ok: true, rooms: result });
}
