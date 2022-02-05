import bcrypt from "bcrypt";

export const hashingPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const matchingPassword = async (
  dbPassword: string,
  userPassword: string
): Promise<boolean> => {
  const matching = await bcrypt.compare(userPassword, dbPassword);
  return matching;
};
