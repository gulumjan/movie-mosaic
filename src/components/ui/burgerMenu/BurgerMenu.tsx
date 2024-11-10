"use client";
import { links } from "@/constants/links";
import scss from "./BurgerMenu.module.scss";
import Link from "next/link";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const BurgerMenu = () => {
  const { isOpen } = useHeaderStore();
  const { data: session } = useSession();
  return (
    <div className={`${scss.BurgerMenu} ${isOpen ? scss.active : ""}`}>
      <div className={scss.content}>
        <nav className={scss.nav}>
          <ul>
            {links.map((el, index) => (
              <li key={index}>
                <Link href={el.href}>{el.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {session ? (
            <div className={scss.auth}>
              <div className={scss.user}>
                <Image
                  width={30}
                  height={30}
                  src={session.user!.image! || ""}
                  alt=""
                />
                <p>{session.user?.name}</p>
              </div>
              <button onClick={() => signOut()}>logout</button>
            </div>
          ) : (
            <>
              <div className={scss.auth}>
                <p>You need to sign-in </p>
                <button onClick={() => signIn()}>login</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
