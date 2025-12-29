import Link from "next/link";
import { NavbarHeight } from "../ui/navbar/Navbar";
import Phone from "../ui/phone/phone";
import { CreditCard, DollarSign, HandCoins, Wallet } from "lucide-react";
import OverViewScreen from "../ui/phone/screens/overview";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const CTA = () => {
    const walletRef = useRef<HTMLDivElement>(null);
    const handCoinsRef = useRef<HTMLDivElement>(null);
    const creditCardRef = useRef<HTMLDivElement>(null);
    const dollarSignRef = useRef<HTMLDivElement>(null);
    const [phoneClicked, setPhoneClicked] =  useState<boolean>(false);

    useEffect(() => {
        // Fade in animation using GSAP then start to bounce
        const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        tl.fromTo(walletRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1 }
        ).fromTo(handCoinsRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1 },
            "-=0.5"
        ).fromTo(creditCardRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1 },
            "-=0.5"
        ).fromTo(dollarSignRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1 },
            "-=0.5"
        );
        // Bounce animations
        gsap.to(walletRef.current, {
            y: -20,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 2,
        });
        gsap.to(handCoinsRef.current, {
            y: -15,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1.5,
        });
        gsap.to(creditCardRef.current, {
            y: -25,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 2.5,
        });
        gsap.to(dollarSignRef.current, {
            y: -10,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1.8,
        });
    }, []);



    return (
        <section className="w-full grid lg:grid-cols-2 gap-4" style={{height: `calc(100vh - ${NavbarHeight}px)`}}>
            <div className="ml-6 flex flex-col justify-center items-start animate-fade-in-right">
                <h1 className="mb-4">BudgetBuddy, <br />Gör budgetering enkelt</h1>
                <p>Ta kontroll över din ekonomi med BudgetBuddy. Vår användarvänliga plattform hjälper dig att skapa och följa budgetar, spåra utgifter och nå dina ekonomiska mål med lätthet.</p>
                <div className="mt-6">
                    <Link href="/login" className="border p-2 rounded font-semibold border-green-500/20 bg-green-700 hover:bg-green-900 transition duration-300">Starta budgetera</Link>
                </div>
            </div>
            <div className="hidden lg:flex justify-center items-center relative">
                <div className="absolute flex flex-col justify-center items-end top-1/2 left-15 w-[150px]">
                    <Image src="/img/svg/arrow.svg" alt="Arrow" width={100} height={100} className="-rotate-12"/>
                    <p className="text-start w-full">Testa appen</p>
                </div>
                <div className="w-1/2 animate-fade-in-left">
                    <Phone rotateX={-25} rotateY={15} rotateZ={10} screenContent={<OverViewScreen onClick={() => setPhoneClicked(true)} />} flat={phoneClicked}/>
                </div>
                {!phoneClicked && (
                    <>
                        <div ref={walletRef} className="absolute top-1/6 left-1/6 text-blue-500 -rotate-12">
                            <Wallet  size={96}/>
                        </div>
                        <div ref={handCoinsRef} className="absolute -z-1 top-1/4 right-1/8 text-green-500">
                            <HandCoins size={96}/>
                        </div>
                        <div ref={creditCardRef} className="absolute bottom-1/4 right-1/8 text-purple-500 rotate-32">
                            <CreditCard size={128}/>
                        </div>
                        <div ref={dollarSignRef} className="absolute bottom-1/8 left-1/6 text-yellow-500">
                            <DollarSign size={54}/>
                        </div>
                    </>
                )}
            </div>


        </section>
    );
}
export default CTA;