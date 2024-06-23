import { createAction, props } from "@ngrx/store";
import { Songs } from "src/app/models/song.model";
//get songs
export const getTrendySongs = createAction(
  '[ Content Page ] Get Trendy Songs',
);
export const getHistorySongs = createAction(
  '[ Content Page ] Get Songs History'
  );
export const getLikedSongs = createAction(
  '[ Content Page ] Get Liked Songs',
  );
export const getRecommandedSongs = createAction(
  '[ Content Page ] Get Recommanded Songs',
);
//save songs
export const getTrendySongsSuccess = createAction(
  '[ Songs api ] Get Successfully Trendy Songs',
  props<{songs : Songs}>()
);
export const getTrendySongsFail = createAction(
  '[ Songs api ] Fail to get Trendy Songs',
  props<{message: string}>()
);
export const getHistorySongsSuccess = createAction(
  '[ Songs api ] Get Successfully History Songs',
  props<{songs : Songs}>()
  );
export const getHistorySongsFail = createAction(
  '[ Songs api ] Fail to get History Songs',
  props<{message: string}>()
  );
export const getLikedSongsSuccess = createAction(
  '[ Songs api ] Get Successfully Liked Songs',
  props<{songs : Songs}>()
  );
export const getLikedSongsFail = createAction(
  '[ Songs api ] Fail to get Liked Songs',
  props<{message: string}>()
  );
export const getRecommandedSongsSuccess = createAction(
  '[ Songs api ] Get Successfully Recommanded Songs',
  props<{songs : Songs}>()
);
export const getRecommandedSongsFail = createAction(
  '[ Songs api ] Fail to get Recommanded Songs',
  props<{message: string}>()
);

