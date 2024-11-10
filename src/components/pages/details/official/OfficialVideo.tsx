// components/OfficialVideo.tsx
"use client";
import { FC } from "react";
import scss from "./OfficialVideo.module.scss";
import { useParams } from "next/navigation";
import { useGetOfficilaVideoQuery } from "@/redux/api/details";
import useYoutubeVideoStore from "@/stores/useYoutubeVideoStore";

const OfficialVideo: FC = () => {
  const { movieId } = useParams();

  const { data: official } = useGetOfficilaVideoQuery({
    movieId: Number(movieId),
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

export default OfficialVideo;
