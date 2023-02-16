import Image from "next/image"
import { useState, useEffect } from "react"
import { Parallax } from "react-scroll-parallax"
import Fade from "react-reveal/Fade"

export default function About() {
    const imageClassName =
        "p-6 flex flex-col gap-6 rounded-tl-3xl items-center rounded-br-3xl m-4 text-black h-121 xs:h-96 md:h-80 lg:h-124 xl:h-126"
    const [widthWindow, setWidthWindow] = useState(0)

    const updateWindowDimensions = () => {
        const newWidth = window.innerWidth
        setWidthWindow(newWidth)
        // console.log(`updating width:${widthWindow}`)
    }
    useEffect(() => {
        window.addEventListener("resize", updateWindowDimensions)
    })

    return (
        <div className="h-full md:h-screen bg-green-200 rounded-t-4xl rounded-b-4xl grid place-content-center p-6">
            <div className="md:flex md:flex-row gap-0 md:gap-14 p-[2%]">
                <div className="text-4xl xs:text-5xl lg:text-6xl 2xl:text-7xl text-center leading-tight ... font-bold mb-[3%] md:mb-0">
                    <Parallax translateX={["-4", "4"]}>
                        <h1 className="text-left md:text-center leading-tight ... ">
                            CATCH YOUR DREAM
                        </h1>
                    </Parallax>
                </div>
                <Parallax translateX={["4", "-4"]}>
                    <div className="text-justify flex flex-col justify-around gap-4 border-t-2 border-b-2 border-black h-full p-0 py-4">
                        <h1 className="text-3xl xs:text-4xl 2xl:text-5xl font-bold text-gray-700">
                            Owns the NFTs and enjoy perks in real life.
                        </h1>
                        <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-light ">
                            Our horlders can expect to receive exclusive
                            discounts at Disneyland whose benefits and offerings
                            will increse over time.
                        </h2>
                    </div>
                </Parallax>
            </div>

            <div className="md:grid md:grid-cols-3 justify-center gap-10 text-xl lg:text-2xl font-light">
                <Fade bottom>
                    <div className={imageClassName}>
                        <Image
                            alt="food"
                            src="/food.png"
                            height="300"
                            width="300"
                            className="bg-black rounded-full"
                        ></Image>
                        <h1 className="text-center md:text-justify">
                            Special discounts on dining, shopping and more{" "}
                        </h1>
                    </div>
                    <div className={imageClassName}>
                        <Image
                            alt="queue"
                            src="/queue.png"
                            height="300"
                            width="300"
                            className="bg-black rounded-full"
                        ></Image>
                        <h1 className="text-center md:text-justify">
                            Skip regular lines an unlimed number of times{" "}
                        </h1>
                    </div>
                    <div className={imageClassName}>
                        <Image
                            alt="birthday"
                            src="/birthday.png"
                            height="300"
                            width="300"
                            className="bg-black rounded-full"
                        ></Image>
                        <h1 className="text-center md:text-justify">
                            Free admission to the parks on your birthday
                        </h1>
                    </div>
                </Fade>
            </div>
        </div>
    )
}
