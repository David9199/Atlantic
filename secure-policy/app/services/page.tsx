import Image from "next/image";


import Navbar from "../pages/Navbar";
import NftList from './NftList';


export default function Home() {
    return (
        <main >
            <Navbar></Navbar>
            <NftList />

        </main>

    );
}
