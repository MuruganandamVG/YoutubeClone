import React, { useEffect } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getHomePageVideos } from "../store/reducers/GetHomePageVideos";
import Spinner from "../component/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideos } from "../Types";
import Card from "../component/Card";
import { clearVideos } from "../store";

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  //   useEffect(() => {
  //     return () => {
  //       dispatch(clearVideos());
  //     };
  //   }, [dispatch]);
  useEffect(() => {
    const DispatchHandler = async () => {
      await dispatch(getHomePageVideos(false));
    };
    DispatchHandler();
    console.log(videos);
  }, [dispatch]);

  console.log(videos);
  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-10 grid-cols-4 p-8">
              {videos.map((item: HomePageVideos) => {
                return <Card data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Home;
