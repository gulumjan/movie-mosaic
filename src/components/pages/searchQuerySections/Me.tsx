import { FC } from "react";
import scss from "./Me.module.scss";

const Me: FC = () => {
  return (
    <section className={scss.Me}>
      <div className="container">
        <div className={scss.content}>Me</div>
      </div>
    </section>
  );
};

export default Me;
