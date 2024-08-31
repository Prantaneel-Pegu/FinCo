"use server";

import Link from "next/link";
import { Button } from "../ui/shadcn-components/ui/button";
import DemoUserLoginButton from "../ui/auth/demo-user-login-button";
import Logo from "../ui/components/logo";
import { validateRequest } from "../lib/auth/validate-request";
import SignOutButton from "../ui/auth/signout-button";

export default async function Home() {
    const { user } = await validateRequest();

    if (user?.id) {
        return (
            <main className="h-screen bg-bgColor">
                <section className="mb-16 px-6 pt-16 text-center">
                    <div className="mb-10 pr-4">
                        <Logo
                            width={64}
                            height={64}
                            className="mr-4 inline-block"
                        />
                        <h1 className="inline-block text-center align-middle text-5xl font-bold">
                            FinCo
                        </h1>
                    </div>
                    <p className="text-3xl font-semibold">
                        Your Finances in One Place
                    </p>
                </section>

                <section>
                    <p className="mb-10 px-6 pt-2 text-center text-2xl">
                        Logged in as &#39;{user.userName}&#39;.
                    </p>
                    <div className="mx-auto flex w-max flex-col gap-4">
                        <Link href={"/dashboard"}>
                            <Button className="bg-accent">
                                Go to Dashboard
                            </Button>
                        </Link>

                        <SignOutButton />
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="h-screen bg-bgColor">
            <section className="mb-24 px-6 pt-16 text-center">
                <div className="mb-10 pr-4">
                    <Logo
                        width={64}
                        height={64}
                        className="mr-4 inline-block"
                    />
                    <h1 className="inline-block text-center align-middle text-5xl font-bold">
                        FinCo
                    </h1>
                </div>
                <p className="text-3xl font-semibold">
                    Your Finances in One Place
                </p>
            </section>

            <section>
                <div className="mx-auto flex w-max flex-col gap-4">
                    <div>
                        <Link href={"/signin"}>
                            <Button className="block w-full bg-accent">
                                Sign In
                            </Button>
                        </Link>
                        <p className="text-center text-sm">
                            ...or{" "}
                            <Link href={"/signup"} className="underline">
                                sign up
                            </Link>
                            .
                        </p>
                    </div>

                    <DemoUserLoginButton />
                </div>
            </section>
        </main>
    );
}

// UNCOMMENT TO DEBUG USER LOGIN
// const [userData, setUserData] = useState<UserSelect[]>();
// const [currentUser, setCurrentUser] = useState<UserSelect | null>();
// const [testData, setTestData] = useState("");
// useEffect(() => {
//     console.log("IN USEEFFECT");
//     getAllUsersData().then((data) => {
//         if (data[0]?.id) {
//             setUserData(data);
//         }
//     });
//     validateRequest().then((user) => {
//         if (!user) {
//             setCurrentUser(null);
//             setTestData("NOT LOGGED IN");
//         } else {
//             setCurrentUser(user.user!);
//             setTestData(
//                 `LOGGED IN AS: ${user.user?.userName} ${user.session?.userId} ${user.session?.id}`,
//             );
//         }
//         console.log("USER: ", user);
//     });
// }, []);
// return (
//     <main>
//         <h1 className="mt-24 text-center text-4xl text-yellow-400">
//             FinCo | A Fully-Featured Personal Finance WebApp
//         </h1>
//         <section className="mb-24">
//             <h2 className="mb-16 mt-16 text-center text-3xl">User Data</h2>
//             <div className="flex flex-col gap-4 text-center">
//                 {userData
//                     ? userData.map((user) =>
//                           user.userName ? (
//                               <p key={user.id} className="">
//                                   {user.userName}: {user.passwordHash}
//                               </p>
//                           ) : (
//                               <p key={user.id} className="">
//                                   {user.userName}: {user.googleId}:{" "}
//                                   {user.email}
//                               </p>
//                           ),
//                       )
//                     : null}
//             </div>
//         </section>
//         <section className="mb-24 text-center">
//             <h2 className="mb-16 mt-16 text-3xl">Logged In Test</h2>
//             <p>{testData}</p>
//             <p className="my-6 flex flex-col text-lg font-medium">
//                 <span>Email: {currentUser?.email}</span>
//                 <span>Name: {currentUser?.name}</span>
//                 <span>Username: {currentUser?.userName}</span>
//             </p>
//             {currentUser?.userPfp ? (
//                 <Image
//                     src={currentUser?.userPfp!}
//                     height={64}
//                     width={64}
//                     alt="User Pfp"
//                     className="mx-auto mt-12 rounded-full"
//                 />
//             ) : null}
//         </section>
//         <section className="mx-auto mb-20 flex max-w-[75%] gap-20 pl-48">
//             <SignUpForm />
//             <SignInForm />
//         </section>
//         <section className="mb-32 flex flex-col gap-8">
//             <SignOutButton />
//             <DemoUserLoginButton />
//         </section>
//   </main>
// );
