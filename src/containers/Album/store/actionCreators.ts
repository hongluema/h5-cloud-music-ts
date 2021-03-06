import {
  CHANGE_CURRENT_ALBUM,
  CHANGE_LOADING,
  CHANGE_PULL_UP_LOADING,
} from './constants';
// import {axiosInstance} from 'utils/request';
import { getRecommendListDetailRequest } from './services';

export const changeCurrentAlbum = (data: any) => ({
  type: CHANGE_CURRENT_ALBUM,
  data,
});

export const changePullUpLoading = (data: boolean) => ({
  type: CHANGE_PULL_UP_LOADING,
  data,
});

export const changeLoading = (data: boolean) => ({
  type: CHANGE_LOADING,
  data,
});
export const getAlbumList = (id: number, fromURL: string) => {
  let request: any;
  switch (fromURL) {
    case '/recommend':
      request = getRecommendListDetailRequest;
      break;
    case '/rank':
      // request = getRankListDetailRequest;
      break;
    default:
      request = getRecommendListDetailRequest;
  }
  return (dispatch: any) => {
    dispatch(changeLoading(true));
    request(id)
      .then((res: any) => {
        dispatch(changeLoading(false));
        let data = res.playlist;
        dispatch(changeCurrentAlbum(data));
        // dispatch(changeStartIndex(0));
        // dispatch(changeTotalCount(data.tracks.length))
      })
      .catch(() => {
        console.log('获取album数据失败!');
      });
  };
};
