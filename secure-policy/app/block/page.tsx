import Image from "next/image";

import Block01 from "./block01";
import Submit from "./submit";
import Register from "./register";
import Navbar from "../pages/Navbar";


export default function Home() {
    return (
        <main >
            <Navbar></Navbar>
            <Register></Register>
        </main>

    );
}
