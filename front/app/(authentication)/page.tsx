"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import background from "@/public/sign-in-background.svg";
import axios from "axios";
import { useUser } from "@/contexts/UserContext";
import { useToken } from "@/contexts/TokenContext";

export default function SignUnPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, setUser} = useUser();
  const {token, setToken} = useToken();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const credentials = {
      email,
      password,
    }

    axios.post('http://localhost:8000/auth/login', credentials)
      .then(response => {
        if (response.data?.ok === 1) {
          console.log(response.data);
          setUser(response.data.user);
          setToken(response.data.token);
          router.push('/dashboard');
        }
      })
      .catch(err => {
        alert(err.response.data.error);
        return;
      })
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
      <Card className="sm:max-w-sm sm:h-fit sm:p- w-full h-full rounded-xl">
        <CardHeader>
          <CardTitle className={"text-2xl"}>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
          </CardContent>
          <CardFooter className={"flex-col items-start gap"}>
            <div className="flex gap-1 text-sm text-gray-300">
              <div>Don&apos;t have an account? {"  "}</div>
              <Link href="/sign-up" className={"underline pb-4"}>
                Sign up
              </Link>
            </div>

            <Button type="submit" variant="secondary" className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
