import fs from "fs";
import path from "path";

// Returns the public URL for an image in /public/images IF the file exists at
// build time, otherwise null. Lets pages render a real photo the moment it is
// dropped in and redeployed, while falling back cleanly until then (so we never
// ship a broken <img> for an asset that hasn't been supplied yet).
export function publicImage(file) {
  try {
    const full = path.join(process.cwd(), "public", "images", file);
    return fs.existsSync(full) ? `/images/${file}` : null;
  } catch {
    return null;
  }
}
