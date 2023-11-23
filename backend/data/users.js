import bcrypt from "bcryptjs";

const users = [
  {
    name: "Akeem Mohammed",
    email: "akeem@lottery.com",
    password: bcrypt.hashSync("projectlottery", 10),
    isAdmin: true,
  },
  {
    name: "Chihiro Tashiro",
    email: "chihiro@lottery.com",
    password: bcrypt.hashSync("projectlotery", 10),
    isAdmin: true,
  },
  {
    name: "Kimora Sananikone",
    email: "kimora@lottery.com",
    password: bcrypt.hashSync("projectlottery", 10),
    isAdmin: true,
  },
  {
    name: "Sebastian Morones",
    email: "sebastian@lottery.com",
    password: bcrypt.hashSync("projectlottery", 10),
    isAdmin: true,
  },
  {
    name: "Lottery Buyer1",
    email: "buyer1@gmail.com",
    password: bcrypt.hashSync("123456789", 10),
  },
  {
    name: "Lottery Buyer2",
    email: "buyer2@gmail.com",
    password: bcrypt.hashSync("123456789", 10),
  },
  {
    name: "Lottery Buyer3",
    email: "buyer3@gmail.com",
    password: bcrypt.hashSync("123456789", 10),
  },
];

export default users;

