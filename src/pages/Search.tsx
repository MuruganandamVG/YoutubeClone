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
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/GetSearchPageVideos";
import SearchCard from "./SearchCard";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);
  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <div className="py-8 pl-8 flex flex-col  w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getHomePageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              <div className="my-15 flex flex-col gap-10 ">
                {videos.map((item: HomePageVideos) => {
                  return <SearchCard data={item} key={item.videoId} />;
                })}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Search;
