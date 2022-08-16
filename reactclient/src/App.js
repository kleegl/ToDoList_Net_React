import React, { useState } from "react";
import Constants from "./utilities/Constants";
import PostCreateForm from "./components/PostCreateForm";
import PostUpdateForm from "./components/PostUpdateForm";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [showingCreateNewPostForm, setShowingCreateNewPostForm] =
    useState(false);
  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] =
    useState(null);

  function getAllPosts() {
    const url = Constants.API_URL_GET_ALL_POSTS;

    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((postsFromServer) => {
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {showingCreateNewPostForm === false &&
            postCurrentlyBeingUpdated === null && (
              <div>
                <h1>ASP.NET Core React Tutorial</h1>
                <div className="mt-5">
                  <button
                    onClick={getAllPosts}
                    className="btn btn-dark btn-lg w-100"
                  >
                    Get Posts from Server
                  </button>
                  <button
                    onClick={() => setShowingCreateNewPostForm(true)}
                    className="btn btn-second btn-lg w-100 mt-4"
                  >
                    Create New Post
                  </button>
                </div>
              </div>
            )}
          {posts.length > 0 &&
            showingCreateNewPostForm === false &&
            postCurrentlyBeingUpdated === null &&
            renderPostsTable()}

          {showingCreateNewPostForm && (
            <PostCreateForm onPostCreated={onPostCreated} />
          )}

          {postCurrentlyBeingUpdated !== null && (
            <PostUpdateForm
              post={postCurrentlyBeingUpdated}
              onPostUpdated={onPostUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );

  function renderPostsTable() {
    return (
      <div className="table-responsive mt-5 text-center">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">PostId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button
                    className="btn btn-dark btn-lg mx-3 my-3"
                    onClick={() => setPostCurrentlyBeingUpdated(post)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-secondary btn-lg mx-3 my-3"
                    onClick={() => deletePost(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setPosts([])}
          className="btn btn-dark btn-lg w-100"
        >
          Empty React posts array
        </button>
      </div>
    );
  }

  function onPostCreated(createdPost) {
    setShowingCreateNewPostForm(false);

    if (createdPost === null) {
      return;
    }

    alert(
      `Post sucsessfully created. After clicking OK, your new post title ${createdPost.title} will show up in the table.`
    );
  }

  function onPostUpdated(updatedPost) {
    setPostCurrentlyBeingUpdated(null);

    if (updatedPost === null) {
      return;
    }

    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === updatedPost.postId) {
        return true;
      }
    });

    if (index !== false) {
      postsCopy[index] = updatedPost;
    }

    setPosts(postsCopy);

    alert(
      `Post successfully updated. Post with postId = ${updatedPost.postId} was changed. Current record is ${updatedPost.postId} ${updatedPost.title} ${updatedPost.content}`
    );
  }

  function deletePost(deletedPost) {
    if (
      window.confirm(
        `Are you sure you want to delete the post titled ${deletedPost.title}?`
      )
    ) {
      // const url = `${Constants.API_URL_DELETE_POST_BT_ID}/${deletedPost.postId}`;
      const url = `https://localhost:7056/PostDelete?postIdToDelete=${deletedPost.postId}`;

      console.log(url);

      fetch(url, {
        method: "DELETE"
      })
        .then(response => response.json())
        .then(responseFromServer => {
          console.log(responseFromServer);
          onPostDeleted(deletedPost);
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    };
  };

  function onPostDeleted(deletedPostPostId) {
    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === deletedPostPostId) {
        return true;
      }
    });

    if(index !== false) {
      postsCopy.splice(index, 1);
    }

    setPosts(postsCopy);

    alert("Post was deleted!")
  }
}
