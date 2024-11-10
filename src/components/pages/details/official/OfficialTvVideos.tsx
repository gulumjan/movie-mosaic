"use client";
import { FC } from "react";
import scss from "./OfficialVideo.module.scss";
import { useParams, useRouter } from "next/navigation";
// import { AiOutlinePlayCircle } from "react-icons/ai";
import { useGetTvOfficilaVideoQuery } from "@/redux/api/tv_details";

const OfficialTvVideo: FC = () => {
  const { tvId } = useParams();

  const router = useRouter();

  const { data: official } = useGetTvOfficilaVideoQuery({
    tvId: Number(tvId),
  });

  return (
    <div className={scss.video_content}>
      {official !== undefined ? <h2>Official videos</h2> : <></>}

      <div className={scss.top_videos}>
        {official?.results.map((item) => (
          <div className={scss.videos_block} key={item.id}>
            <iframe
              width="290"
              height="164"
              src={`https://www.youtube.com/embed/${item.key}`}
              title={item.name}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            {/* <h3>{item.name}</h3> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficialTvVideo;
