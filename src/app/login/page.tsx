"use client";

import { Navbar, NavbarHeight } from "@/components/ui/navbar/Navbar";
import { useEffect, useState } from "react";
import LoginForm from "@/components/loginLogout/login";
import RegisterForm from "@/components/loginLogout/register";
import supabase from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import LoadingMessage from "@/components/ui/loadingMessage";

const LoginPage = () => {
    const [loginMode, setLoginMode] = useState<"login" | "register">("login");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.push("/");
            }
            setIsLoading(false);
        };
        checkSession();
    }, [router]);

    if (isLoading) return <LoadingMessage message="Kontrollerar inloggningsstatus..." />;

  return (
    <>
        <Navbar />
        <main style={{ marginTop: NavbarHeight, height: `calc(100vh - ${NavbarHeight}px)` }} className="px-4 flex justify-center items-center w-full">
            <section className="flex flex-col justify-center items-center bg-secondary/10 p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in-down">
                <div className="mb-4">
                    <p className="select-none [&>span]:cursor-pointer"><span className={`${loginMode === "login" ? "font-bold" :""}`} onClick={() => setLoginMode("login")}>Logga in</span> / <span className={`${loginMode === "register" ? "font-bold" :""}`} onClick={() => setLoginMode("register")}>Registrera</span></p>
                </div>
                {loginMode === "login" ? <LoginForm /> : <RegisterForm />}
            </section>
        </main>
    </>
  );
}
export default LoginPage;