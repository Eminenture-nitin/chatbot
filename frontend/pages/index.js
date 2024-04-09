import Image from "next/image";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className="main-container">
        <div className="m-24">
          <h1 className="font-semibold text-lg">
            welcome to Homepage - public route
          </h1>
        </div>
      </main>
    </>
  );
}
