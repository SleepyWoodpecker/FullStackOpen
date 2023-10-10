// define a dummy function to test first. it takes in an array of blog posts, and always returns 1
const dummy = (blog) => {
  return 1;
};

// return the sum of likes from all blog entries
const totalLikes = (blogEntries) => {
  return blogEntries.reduce(
    (likeSum, blogEntry) => likeSum + blogEntry.likes,
    0
  );
};

// receives a list of blogs, in which you find the most liked blog. If there are multiple blogs that share the same amount of likes, it is okay to return one of them
const favouriteBlog = (blogEntries) => {
  // there is some potential for an error here, but I am going to ignore it at the moment
  let maxLikes = -1;
  let mostPopular;
  for (const blogEntry of blogEntries) {
    if (blogEntry.likes > maxLikes) {
      maxLikes = blogEntry.likes;
      mostPopular = blogEntry;
    }
  }
  return mostPopular;
};

// function that finds the author who has written the most blogs
// there is probably a significantly more efficient way to do this...
const mostBlogs = (blogEntries) => {
  const authorPostCount = {};

  let maxPosts = -1;
  let maxPostAuthor;

  blogEntries.forEach((blogEntry) => {
    const author = blogEntry.author;

    if (authorPostCount[author]) {
      authorPostCount[author]++;
    } else {
      authorPostCount[author] = 1;
    }

    if (authorPostCount[author] > maxPosts) {
      maxPosts = authorPostCount[author];
      maxPostAuthor = author;
    }
  });

  return { author: maxPostAuthor, posts: maxPosts };
};

// find the author with the most likes
// here, I will try the way that CHATGPT suggests, using a map instead of an array to store the intermediate data
const mostLikes = (blogEntries) => {
  const authorLikeCount = new Map();

  let maxLikeCount = -1;
  let maxLikeAuthor;

  blogEntries.forEach((blogEntry) => {
    const author = blogEntry.author;
    // use the || operator for an author whose posts have yet to be recorded
    const likeCount = (authorLikeCount.get(author) || 0) + blogEntry.likes;
    authorLikeCount.set(author, likeCount);

    if (likeCount > maxLikeCount) {
      maxLikeCount = likeCount;
      maxLikeAuthor = author;
    }
  });

  return { author: maxLikeAuthor, likes: maxLikeCount };
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
