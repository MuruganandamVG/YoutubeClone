import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";
import { parseData } from "../../utils";
import { YOUTUBE_API_URL } from "../../utils/constants";
import { HomePageVideos } from "../../Types";
var API_KEY = "AIzaSyAzNDqmJKAnfSGOh70F_JCtuMkUGW9J860";

export const getSearchPageVideos = createAsyncThunk(
  "youtubeApp/searchPageVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);
