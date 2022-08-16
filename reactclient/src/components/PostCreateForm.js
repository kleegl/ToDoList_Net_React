import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function PostCreateForm(props) {
  
    const initialFormData = Object.freeze({
    title: "Post from initial Form Data",
    content: "Content from initial Form Data"
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

    const postToCreate = {
      postId: 0,
      title: formData.title,
      content: formData.content,
    };

    console.log(postToCreate);

    const url = Constants.API_URL_CREATE_POST;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        // setPosts(responseFromServer);
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });

    props.onPostCreated(postToCreate);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Create new post</h1>

      <div className="mt-5">
        <label className="h3 form-label">Post title</label>
        <input
          value={formData.title}
          name="title"
          type="text"
          className="form-control"
          onChange={handleChange}
        ></input>
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Post content</label>
        <input
          value={formData.content}
          name="content"
          type="text"
          className="form-control"
          onChange={handleChange}
        ></input>
      </div>
      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Submit
      </button>
      <button
        onClick={() => props.onPostCreated(null)}
        className="btn btn-secondary btn-lg w-100 mt-3"
      >
        Cancel
      </button>
    </form>
  );

}
