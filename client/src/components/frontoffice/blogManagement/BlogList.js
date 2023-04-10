import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import HeaderSignedInClient from "../shared/HeaderSignedInClient";
import { Link } from "react-router-dom";
import UpdateBlogPost from "./BlogUpdate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comment from "./comment"
import BlogRightBar from "./blogRightBar";
import requireAuth from "../authentification/requireAuth";
function BlogList() {
  const [blogPosts, setBlogPosts] = useState([]);
  const userId = localStorage.getItem("userId");
  const [showOptions, setShowOptions] = useState(false);
  const [truncated, setTruncated] = useState(true);
  const toggleOptions = () => setShowOptions(!showOptions);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/api/blog");
      setBlogPosts(response.data);
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/api/blog/${id}`);
      setBlogPosts(blogPosts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div >
      <HeaderSignedInClient />
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Blog</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">

      <section class="blog_area section-padding">
      <FontAwesomeIcon icon="fa-solid fa-blog" />      
        <h1 class="mb-4">LIST OF POSTS</h1>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mb-5 mb-lg-0">
              <div class="blog_left_sidebar">
                {blogPosts.map((post) => (
                  <div key={post._id} class="card mb-3">
                                                              <Link to={`/blogpost/${post._id}`}>

                    <img

                      src={`http://localhost:5000/uploads/${post.image}`}
                      class="card-img-top"
                      alt={post.title}
                      style={{ width: "auto", height: "500px" }}/>
                      </Link>

                      <div class="card-body">
                      <Link to={`/blogpost/${post._id}`}>

                      <h1 class="card-title">{post.title}</h1>
                      <br/>
                          </Link>

                      {/* <p class="card-text">
                      {post.content.length > 100 ? (
                      <>
                      {post.content.slice(0, 100)}
                      <span id="dots">...</span>
                      <span id="more" style={{ display: 'none' }}>{post.content.slice(100)}</span>
                      <button onClick={() => {
                      document.getElementById("dots").style.display = "none";
                      document.getElementById("more").style.display = "inline";
                      }} className="btn btn-primary btn-lg active">Show more</button>
                      </>
                      ) : (
                      post.content
                      )}
                      </p> */}
                      <ul class="list-unstyled d-flex mb-0">
                      <li class="mr-3"><i class="fa fa-user"></i> {post.author}</li>
                      <br/>
                      <li><i class="fa fa-calendar"></i> {new Date(post.createdAt).toLocaleDateString()}</li>
                      </ul>
                      {userId === post.user && (
                        <button className="btn btn-secondary float-left" onClick={toggleOptions}>
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      
                      // <button className="btn btn-secondary" onClick={toggleOptions}>Options</button>
                      
                      )}
                      {showOptions && userId === post.user && (
                      <div class="btn-group mt-3">
                        <i className="fas fa-cog" onClick={toggleOptions}></i>

                      <h1 class="mr-3">Edit post </h1>
                      <UpdateBlogPost blogPost={post} />
                      <i variant="danger" onClick={() => handleDelete(post._id)} class="ml-3" style={{color: 'red'}}><i class="fas fa-trash"></i></i>
                      </div>
                      )}
                      </div>
                      </div>
                      ))}
                      </div>
                      </div>
                      </div>
                      
                        </div>
                      </section>
                      <Comment/>
                      <BlogRightBar/>
                          </div>
                          </div>
                        );
                      }
                      export default requireAuth (BlogList);
                      
                      
                      
                      
