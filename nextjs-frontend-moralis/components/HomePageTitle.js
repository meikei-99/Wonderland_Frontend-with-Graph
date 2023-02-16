import React from "react"
import Typewriter from "typewriter-effect"

export default function HomePageTitle() {
    const titleClassName =
        "text-lg xs:text-2xl md:text-4xl xl:text-6xl text-white drop-shadow-lg shadow-red-200 font-bold font-CarterOne leading-tight ...  "
    return (
        <div className="">
            <h1 className={titleClassName} id="wonderland">
                In Collaboration With
            </h1>
            <h1 className={titleClassName} id="wonderland">
                <div className="flex flex-row">
                    <h1>Disneyland </h1>
                    <span className="invisible ..."> x</span>
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(
                                    `<span style="color:#00ff83">Paris</span>`
                                )
                                .pauseFor(2000)
                                .deleteAll()
                                .typeString(
                                    `<span style="color:#FE53BB">Tokyo</span>`
                                )
                                .pauseFor(2000)
                                .deleteAll()
                                .typeString(
                                    `<span style="color:#75D5FD">California</span>`
                                )
                                .pauseFor(2000)
                                .deleteAll()
                                .typeString(
                                    `<span style="color:#F5D300">Tokyo</span>`
                                )
                                .pauseFor(2000)
                                .deleteAll()
                                .start()
                        }}
                    ></Typewriter>
                </div>
            </h1>
            <div className="font-extralight text-white text-sm xs:text-base md:text-xl xl:text-3xl mt-6 sm:mt-12">
                <h1>
                    Dream bigger, laugh louder and smile wider with our NFTs.
                </h1>
            </div>
            <div className="font-extralight text-white text-sm xs:text-base md:text-base xl:text-xl mt-6 sm:mt-12 border border-white rounded-3xl w-fit px-6 py-1 hover:scale-105 ...">
                <button>Mousedown to see the magic</button>
            </div>
        </div>
    )
}
