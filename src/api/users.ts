import type { User } from "../models/user";

export const createUser = async (user: User) => {
  const res = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};


export const login = async (user: User) =>{
  try{
  const res = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
  })
  console.log(res);
  console.log(res.json());
  return res.json();
}
catch(err){
  console.log(err);
}

}