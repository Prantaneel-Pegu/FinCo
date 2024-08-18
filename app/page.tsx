"use client";

import { useEffect, useState } from "react";
import { createUser, getUserData } from "../db/db-actions";
import { UserSelect } from "@/db/schema";
import SignUp from "./signup/page";

export default function Home() {
    const [userData, setUserData] = useState<UserSelect[]>();

    useEffect(() => {
        getUserData().then((data) => {
            if (data[0]?.id) {
                setUserData(data);
            } else {
                createUser({
                    username: Math.random().toString(),
                    passwordHash: Math.random().toString(),
                });
                getUserData().then((data) => setUserData(data));
            }
        });
    }, []);

    return (
        <main>
            <h1 className="mt-24 text-center text-4xl text-yellow-400">
                FinCo | A Fully-Featured Personal Finance WebApp
            </h1>

            <section className="mb-24">
                <h2 className="mb-16 mt-16 text-center text-3xl">User Data</h2>
                <div className="flex flex-col gap-4 text-center">
                    {userData
                        ? userData.map((user) => {
                              return (
                                  <p key={user.id} className="">
                                      {user.username}: {user.passwordHash}
                                  </p>
                              );
                          })
                        : null}
                </div>
            </section>

            <section>
                <SignUp />
            </section>
        </main>
    );
}
