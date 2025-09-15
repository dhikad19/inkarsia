import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

async function hashExistingPasswords() {
  await connectDB();
  const users = await User.find();
  for (const user of users) {
    if (
      !user.password.startsWith("$2a$") &&
      !user.password.startsWith("$2b$")
    ) {
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      console.log(`Hashed password for ${user.email}`);
    }
  }
}

hashExistingPasswords();
