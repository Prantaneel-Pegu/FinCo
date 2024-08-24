"use client";

import { useEffect, useState } from "react";
import { getAllUsersData } from "../db/db-actions";
import { UserSelect } from "@/db/schema";
import { validateRequest } from "./lib/auth/validate-request";
import SignOutButton from "./ui/auth/signout-button";
import SignInForm from "./ui/auth/signin-form";
import SignUpForm from "./ui/auth/signup-form";

export default function Home() {
    const [userData, setUserData] = useState<UserSelect[]>();
    const [testData, setTestData] = useState("");

    useEffect(() => {
        console.log("IN USEEFFECT");

        getAllUsersData().then((data) => {
            if (data[0]?.id) {
                setUserData(data);
            }
        });
        validateRequest().then((user) => {
            if (!user) {
                setTestData("NOT LOGGED IN");
            } else {
                setTestData(
                    `LOGGED IN AS: ${user.user?.userName} ${user.session?.userId} ${user.session?.id}`,
                );
            }
            console.log("USER: ", user);
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
                                      {user.userName}: {user.passwordHash}
                                  </p>
                              );
                          })
                        : null}
                </div>
            </section>

            <section className="mb-24 text-center">
                <h2 className="mb-16 mt-16 text-3xl">Logged In Test</h2>
                <p>{testData}</p>
            </section>

            <section className="mb-16">
                <button className="mx-auto block rounded-full border-2 border-black bg-lime-400 px-6 py-3 text-xl">
                    Log In
                </button>
            </section>

            <section className="mb-32 flex flex-col gap-16">
                <SignUpForm />
                <SignOutButton />
                <SignInForm />
            </section>
        </main>
    );
}
