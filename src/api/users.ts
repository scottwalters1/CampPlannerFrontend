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
    // change this to get url base from env || localhost
    // PICKUP: keep figuring out how to manage cookies w/protected routes
    // also maybe figure out how to do npm run dev automatic refreshing on backend
  const res = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
    // Telling backend to include cookie in response
    credentials: "include",
  })
  console.log(res);
  console.log(res.json());
  return res.json();
}
catch(err){
  console.log(err);
}

}