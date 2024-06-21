import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { ChatBotDataProvider } from "@/context/ChatBotContest";
import { LinksDataProvider } from "@/context/LinksDataContext";
import { LiveChatDataProvider } from "@/context/livechatContext";
// import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
const ToastContainer = dynamic(
  () => import("react-toastify").then((module) => module.ToastContainer),
  {
    ssr: false,
  }
);
import "react-toastify/dist/ReactToastify.css";
import ScriptTagBot from "@/components/ScriptTagBot";
import Script from "next/script";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SocketProvider } from "@/context/SocketContext";
import Head from "next/head";
const Navbar = dynamic(import("@/components/Navbar"));
const DashbordSidebar = dynamic(
  import("@/components/dashborad/DashbordSidebar")
);
const HorizontalNav = dynamic(import("@/components/dashborad/HorizontalNav"));

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAuthRoute = router.pathname.startsWith("/auth");
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("EM_Token"));
  }, [token]);
  return (
    <>
      <AuthProvider>
        <div className="bg-gray-50">
          {!isAuthRoute && <Navbar />}
          <div className={`bg-gray-50`}>
            {isAuthRoute ? (
              token ? (
                <LinksDataProvider>
                  <ChatBotDataProvider>
                    <LiveChatDataProvider>
                      <SocketProvider>
                        <div className="flex gap-10 overflow-hidden">
                          <div>
                            <DashbordSidebar />
                          </div>
                          <div className="w-full flex flex-col gap-5 mr-7 overflow-hidden">
                            <div>
                              <HorizontalNav />
                            </div>
                            <div>
                              <Component {...pageProps} />
                              {/* <ScriptTagBot /> */}
                              {/* <script src="http://localhost:8080/widget/650d432aa0570859518c23a1"></script> */}
                              {/* <Script src="//code.tidio.co/gvlqg1q175k4wbggw1gm7jvldgcunsj2.js"></Script> */}
                            </div>
                          </div>
                        </div>
                      </SocketProvider>
                    </LiveChatDataProvider>
                  </ChatBotDataProvider>
                </LinksDataProvider>
              ) : (
                <div className="m-24">
                  <h1 className="font-semibold text-lg">
                    You are not authorized to access this page.
                    <Link href="/login" className="text-blue-500">
                      {" Login"}
                    </Link>
                  </h1>
                </div>
              )
            ) : (
              <>
                <Component {...pageProps} />
              </>
            )}
          </div>
          <ToastContainer />
        </div>
      </AuthProvider>
      {/* <script
        src="http://localhost:8080/widget/c3hiAVVQRiQsYlBWU0xwdGdUWQBGdixj"
        async
      ></script> */}
    </>
  );
}
