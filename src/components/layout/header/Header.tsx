"use client";
import scss from "./Header.module.scss";
import Link from "next/link";
import { links } from "@/constants/links";
import { IoSearchOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import BurgerButton from "@/components/ui/burgerButton/BurgerButton";
import BurgerMenu from "@/components/ui/burgerMenu/BurgerMenu";
import axios from "axios";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleSignIn = async () => {
    if (session?.user) {
      try {
        await axios.post("http://localhost:3000/api/v2/sign-in");
        console.log("POST request successful");
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    }
  };

  async function handleDelete() {
    try {
      const response = await axios.delete("/api/v2/sign-out");
      console.log("User deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  const handleScreen = () => {
    setIsMobile(window.innerWidth <= 760);
  };

  useEffect(() => {
    if (session?.user) {
      handleSignIn();
    }
  }, [session]);
  useEffect(() => {
    handleScreen();
    addEventListener("resize", handleScreen);
    return () => {
      removeEventListener("resize", handleScreen);
    };
  }, []);
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <div className={scss.logo}>
              <Image
                width={50}
                height={50}
                onClick={() => router.push("/")}
                src="https://cdn.icon-icons.com/icons2/1381/PNG/512/popcorntime_94336.png"
                alt=""
              />
              <h1 onClick={() => router.push("/")}>MovieMosaic</h1>
            </div>
          </div>
          <div className={scss.right}>
            {!isMobile ? (
              <>
                <nav className={scss.nav}>
                  <ul>
                    {links.map((item, index) => (
                      <li key={index}>
                        <Link
                          className={
                            pathname === item.href
                              ? `${scss.link} ${scss.active}`
                              : `${scss.link}`
                          }
                          href={item.href}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <IoSearchOutline className={scss.search} />
                    {session ? (
                      <>
                        <Image
                          width={30}
                          height={30}
                          src={session.user!.image! || ""}
                          alt=""
                        />
                        <p>{session.user?.name}</p>
                        <button
                          onClick={async () => {
                            handleDelete();
                          }}
                        >
                          logout
                        </button>
                      </>
                    ) : (
                      <>
                        <div className={scss.auth}>
                          <button
                            onClick={() => {
                              signIn();
                            }}
                          >
                            sign-in
                          </button>
                        </div>
                      </>
                    )}
                  </ul>
                </nav>
              </>
            ) : (
              <>
                <BurgerButton />
                <BurgerMenu />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
