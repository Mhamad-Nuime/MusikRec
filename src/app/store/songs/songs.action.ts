import { createAction } from "@ngrx/store";

export const getTrendySongs = createAction(
  '[Main Page - Trend Component] Get Trendy Songs',
);
export const getSongsHistory = createAction(
  '[Main Page - History Component] Get Songs History'
  );
export const getLikedSongs = createAction(
  '[Main Page - Liked Component] Get Liked Songs',
  );
export let getRecommandedSongs = createAction(
  '[Main Page - ] Get Recommanded Songs',
);
