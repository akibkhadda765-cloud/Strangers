// Lightweight text moderation (no storage). Replace with AI if needed.
const BLOCKLIST = [
  "terrorist",
  "extremism",
  "hate crime",
  "child sexual",
  "kill yourself",
  "nsfw"
];

export function moderateMessage(text) {
  const clean = String(text || "").trim();
  if (!clean) return { allowed: false, reason: "empty" };
  const lowered = clean.toLowerCase();
  const flagged = BLOCKLIST.find(w => lowered.includes(w));
  if (flagged) return { allowed: false, reason: "blocked" };
  return { allowed: true };
}

const PROFANITY = ["fuck", "shit", "bitch"];
export function sanitizeMessage(text) {
  let out = String(text || "");
  PROFANITY.forEach(word => {
    const re = new RegExp(`\\b${word}\\b`, "gi");
    out = out.replace(re, "****");
  });
  return out;
}
