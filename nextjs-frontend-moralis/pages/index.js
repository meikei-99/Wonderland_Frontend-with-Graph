import { Canvas } from "@react-three/fiber"
import About from "./About"
import HomePageTitle from "../components/HomePageTitle"
import RotatingSphere from "../components/RotatingSphere"

export default function index() {
    return (
        <div className="bg-black">
            <div className="hidden sm:visible...  sm:flex sm:flex-row items-center justify-around bg-black w-full h-screen px-8">
                <div className=" sm:flex sm:flex-col ">
                    <HomePageTitle></HomePageTitle>
                </div>
                <h1 className="h-115 w-115 md:h-118 md:w-118 xl:h-132 xl:w-132">
                    <Canvas className="">
                        <RotatingSphere />
                    </Canvas>
                </h1>
            </div>
            <div className="sm:hidden flex flex-col items-center justify-center align-middle gap-0 sm:gap-4 bg-black w-full h-screen px-4">
                <h1 className="h-109 w-109 xs:h-115 xs:w-115 md:h-118 md:w-118 xl:h-132 xl:w-132">
                    <Canvas className="">
                        <RotatingSphere />
                    </Canvas>
                </h1>
                <div className="mt-4 xs:mt-8 sm:mt-0 sm:flex sm:flex-col">
                    <HomePageTitle></HomePageTitle>
                </div>
            </div>
            <div>
                <About></About>
            </div>
        </div>
    )
}
