import { UPDATE_POSTS } from './actionTypes';
import { APIUrls } from '../helpers/urls';

export function fetchPosts() {
  return (dispatch) => {
    // const url = 'https://codeial.codingninjas.com:8000/api/v2/posts';
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        // console.log('response: ', response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

// export function updatePosts(posts) {
//   return {
//     type: UPDATE_POSTS,
//     posts,
//   };
// }

// To update the posts
export const updatePosts = (posts) => {
  return {
    type: UPDATE_POSTS,
    posts: posts,
  };
};