import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function PostUpdateForm(props) {
  const initialFormData = Object.freeze({
    title: props.post.title,
    content: props.post.content,
  });

  const [formData, setFormDate] = useState(initialFormData);

  const handleChange = (e) => {
    setFormDate({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postToUpdate = {
      postId: props.post.postId,
      title: formData.title,
      content: formData.content,
    };

    const url = Constants.API_URL_UPDATE_POST;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToUpdate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.onPostUpdated(postToUpdate);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Updating the post title "{props.post.title}".</h1>

      <div className="mt-5">
        <label className="h3 form-label">Post title</label>
        <input
          className="form-control"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        ></input>
      </div>

      <div>
        <label className="h3 form-label">Post content</label>
        <input
          className="form-control"
          name="content"
          type="text"
          value={formData.content}
          onChange={handleChange}
        ></input>
      </div>

      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Submit
      </button>
      <button
        onClick={ShowError}
        className="btn btn-secondary btn-lg w-100 mt-3"
      >
        Cancel
      </button>
    </form>
  );

  function ShowError (){
    try {
        props.onPostUpdated(null);
    } catch (error) {
        alert(error);
        console.log(error);
    }    
  };
}
