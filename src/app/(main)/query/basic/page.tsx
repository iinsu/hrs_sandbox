"use client";

import { useState } from "react";
import Posts from "./_components/posts";
import { Post } from "./_components/post";

const BasicPage = () => {
  const [postId, setPostId] = useState(-1);

  return (
    <>
      <p>
        As you visit the posts below, you will notice them ina loading state the
        first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!
        <strong>
          (You may need to throttle your network speed to simulate longer lading
          sequences)
        </strong>
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </>
  );
};

export default BasicPage;
