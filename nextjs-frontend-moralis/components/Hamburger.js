import React from "react"
import Link from "next/link"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import Image from "next/image"
import { RxTextAlignJustify, RxCross1 } from "react-icons/rx"

export default function Hamburger() {
    const [showNav, setShowNav] = useState(true)
    const [clickHome, setClickHome] = useState(true)
    const [clickMarket, setClickMarket] = useState(false)
    const [clickProfile, setClickProfile] = useState(false)
    const [clickMint, setClickMint] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const { account, enableWeb3, isWeb3Enabled, Moralis, deactivateWeb3 } =
        useMoralis()

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            setShowNav(false)
        } else {
            setShowNav(true)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar)
        return () => {
            window.removeEventListener("scroll", controlNavbar)
        }
    })
    useEffect(() => {
        if (window.localStorage.getItem("connected")) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found!")
            }
        })
    }, [])

    useEffect(() => {
        if (window.localStorage.getItem("homePage")) {
            setClickHome(true)
            setClickMarket(false)
            setClickProfile(false)
            setClickMint(false)
        }
        if (window.localStorage.getItem("marketPage")) {
            setClickHome(false)
            setClickMarket(true)
            setClickProfile(false)
            setClickMint(false)
        }
        if (window.localStorage.getItem("profilePage")) {
            setClickHome(false)
            setClickMarket(false)
            setClickProfile(true)
            setClickMint(false)
        }
        if (window.localStorage.getItem("mintPage")) {
            setClickHome(false)
            setClickMarket(false)
            setClickProfile(false)
            setClickMint(true)
        }
    })

    return (
        <div className="">
            <div
                className={`fixed bg-black z-10 w-full  ${
                    showNav ? " " : "hidden "
                }`}
            >
                <div className="grid grid-cols-3 text-3xl  text-white font-bold">
                    <Image
                        alt="logo"
                        className="invert ...  "
                        src="/logo2.png"
                        width="125"
                        height="125"
                    ></Image>
                    <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-center gap-8 xl:gap-16 text-base font-normal">
                        <Link
                            href="./"
                            className={`${
                                clickHome ? "text-green-300" : "text-white"
                            } cursor-pointer`}
                            onClick={() => {
                                window.localStorage.setItem(
                                    "homePage",
                                    "at home"
                                )
                                window.localStorage.removeItem("marketPage")
                                window.localStorage.removeItem("profilePage")
                                window.localStorage.removeItem("mintPage")
                            }}
                        >
                            HOME
                        </Link>

                        <Link
                            href="./Market"
                            className={`${
                                clickMarket ? "text-green-300" : "text-white"
                            } cursor-pointer`}
                            onClick={() => {
                                window.localStorage.setItem(
                                    "marketPage",
                                    "at market"
                                )
                                window.localStorage.removeItem("homePage")
                                window.localStorage.removeItem("profilePage")
                                window.localStorage.removeItem("mintPage")
                            }}
                        >
                            MARKET
                        </Link>
                        <Link
                            href="./Profile"
                            className={`${
                                clickProfile ? "text-green-300" : "text-white"
                            } cursor-pointer`}
                            onClick={() => {
                                window.localStorage.setItem(
                                    "profilePage",
                                    "at profile"
                                )
                                window.localStorage.removeItem("homePage")
                                window.localStorage.removeItem("marketPage")
                                window.localStorage.removeItem("mintPage")
                            }}
                        >
                            PROFILE
                        </Link>
                        <Link
                            href="./Mint"
                            className={`${
                                clickMint ? "text-green-300" : "text-white"
                            } cursor-pointer`}
                            onClick={() => {
                                window.localStorage.setItem(
                                    "mintPage",
                                    "at mint"
                                )
                                window.localStorage.removeItem("homePage")
                                window.localStorage.removeItem("profilePage")
                                window.localStorage.removeItem("marketPage")
                            }}
                        >
                            MINT
                        </Link>
                    </div>
                    <div className="invisible ...  md:visible ... md:flex md:flex-row md:items-center md:justify-end md:p-6">
                        {account ? (
                            <div className="text-base font-normal bg-green-300  text-black rounded-xl px-6 cursor-pointer">
                                {account.slice(0, 6)}...
                                {account.slice(account.length - 4)}{" "}
                            </div>
                        ) : (
                            <button
                                className="text-base font-normal border-2 border-green-300 hover:bg-green-300 hover:text-black rounded-xl px-6 cursor-pointer"
                                onClick={async () => {
                                    await enableWeb3()
                                    window.localStorage.setItem(
                                        "connected",
                                        "Injected to Metamask"
                                    )
                                }}
                            >
                                CONNECT WALLET
                            </button>
                        )}
                    </div>
                    <button
                        className="lg:hidden z-10 cursor-pointer flex items-center justify-end p-2"
                        onClick={() => {
                            setDropdown(!dropdown)
                        }}
                    >
                        {dropdown ? (
                            <div>
                                {" "}
                                <RxCross1 className="text-3xl"></RxCross1>
                            </div>
                        ) : (
                            <div>
                                {" "}
                                <RxTextAlignJustify className="text-3xl"></RxTextAlignJustify>
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {dropdown ? (
                <div className="fixed z-10 lg:hidden my-[23%] sm:my-[15%]  h-[80%] w-full px-[3%]">
                    <div className="bg-black text-white text-5xl font-bold w-full h-full rounded-3xl flex flex-col items-center justify-around">
                        <div className="visible ...  md:hidden ...">
                            {account ? (
                                <div className="text-base font-normal bg-green-300  text-black rounded-xl px-6 cursor-pointer">
                                    {account.slice(0, 6)}...
                                    {account.slice(account.length - 4)}{" "}
                                </div>
                            ) : (
                                <button
                                    className="text-base font-normal border-2 border-green-300 hover:bg-green-300 hover:text-black rounded-xl px-6 cursor-pointer"
                                    onClick={async () => {
                                        await enableWeb3()
                                        window.localStorage.setItem(
                                            "connected",
                                            "Injected to Metamask"
                                        )
                                    }}
                                >
                                    CONNECT WALLET
                                </button>
                            )}
                        </div>

                        <Link
                            href="./"
                            className={`${
                                clickHome ? "text-green-300" : "text-white"
                            } cursor-pointer border-white border-b-2 w-full p-3`}
                            onClick={() => {
                                window.localStorage.setItem(
                                    "homePage",
                                    "at home"
                                )
                                window.localStorage.removeItem("marketPage")
                                window.localStorage.removeItem("profilePage")
                                window.localStorage.removeItem("mintPage")
                            }}
                        >
                            HOME
                        </Link>
                        <Link
                            href="./Market"
                            className={`${
                                clickMarket ? "text-green-300" : "text-white"
                            } cursor-pointer border-white border-b-2 w-full p-3`}
                            onClick={() => {
                                window.localStorage.setItem(
                                    "marketPage",
                                    "at market"
                                )
                                window.localStorage.removeItem("homePage")
                                window.localStorage.removeItem("profilePage")
                                window.localStorage.removeItem("mintPage")
                            }}
                        >
                            MARKET
                        </Link>
                        <Link
                            href="./Profile"
                            className={`${
                                clickProfile ? "text-green-300" : "text-white"
                            } cursor-pointer border-white border-b-2 w-full p-3`}
                            onClick={() => {
                                window.localStorage.setItem(
                                    "profilePage",
                                    "at profile"
                                )
                                window.localStorage.removeItem("homePage")
                                window.localStorage.removeItem("marketPage")
                                window.localStorage.removeItem("mintPage")
                            }}
                        >
                            PROFILE
                        </Link>
                        <Link
                            href="./Mint"
                            className={`${
                                clickMint ? "text-green-300" : "text-white"
                            } cursor-pointer border-white border-b-2 w-full p-3`}
                            onClick={() => {
                                window.localStorage.setItem(
                                    "mintPage",
                                    "at mint"
                                )
                                window.localStorage.removeItem("homePage")
                                window.localStorage.removeItem("profilePage")
                                window.localStorage.removeItem("marketPage")
                            }}
                        >
                            MINT
                        </Link>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}
