"use client"

import { useState } from "react";
import { useRouter} from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link"
import { Label } from "@/components/ui/label";
import background from "@/public/sign-in-background.svg"

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if password and confirm password match
        if (password !== confPassword) {
            setPasswordError(true);
            return;
        }

        // Reset password error
        setPasswordError(false);

        // Add your sign-up logic here
        console.log("Signing up with:", { email, password, confPassword });
        // Redirect the user after successful sign-up
        router.push("/dashboard");
    };

    return (
        <div className={`flex h-screen items-center justify-center`}>
            <Image
                src={background}
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="z-[-1] opacity-70"
            />
            <Card className="sm:max-w-sm sm:h-fit w-full h-full rounded-xl">
                <CardHeader>
                    <CardTitle className={"text-2xl"}>Sign up</CardTitle>
                    <CardDescription>
                        Enter your email and password to create an account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="flex gap-6 flex-col">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder={"johndoe@example.com"}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="conf_password">Confirm Password</Label>
                            <Input
                                id="conf_password"
                                type="password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                required
                                className={passwordError ? 'border-red-500' : ''}
                            />
                            {passwordError && (
                                <div className="text-red-500 text-sm mt-1">
                                    Passwords do not match.
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className={"flex-col items-start gap"}>
                        <div className="flex gap-1 text-sm text-gray-300">
                            <div>
                                Already have an account?
                            </div>
                            <Link href="/" className={"underline pb-4"}>
                                Sign in
                            </Link>
                        </div>

                        <Button type="submit" variant="secondary" className="w-full">
                            Sign up
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}