// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Social {
    address public owner;
    uint256 private counter;

    constructor() {
        counter = 0;
        owner = msg.sender;
    }

    struct Post {
        address payable author;
        uint256 id;
        string postTxt;
        string postImg;
        uint256 tipAmount;
        uint256 likes; // New field for storing the number of likes
    }

    event postCreated(
        address payable author,
        uint256 id,
        string postTxt,
        string postImg,
        uint256 tipAmount
    );

    event PostTipped(
        uint256 id,
        string hash,
        uint256 tipAmount,
        uint256 likes, // Include the number of likes in the event
        address payable author
    );

    mapping(uint256 => Post) posts;
    mapping(address => uint256) public profiles;

    // Function to add a new post with text and an image
    function addPost(string memory postTxt, string memory postImg) public {
        Post storage newPost = posts[counter];
        newPost.postTxt = postTxt;
        newPost.postImg = postImg;
        newPost.author = payable(msg.sender);
        newPost.id = counter;

        emit postCreated(payable(msg.sender), counter, postTxt, postImg, 0);

        counter++;
    }

    // Function to get all posts
    function getAllPost() external view returns (Post[] memory _posts) {
        _posts = new Post[](counter);
        for (uint256 i = 0; i < _posts.length; i++) {
            _posts[i] = posts[i];
        }
    }

    // Function to get posts created by the sender
    function getMyPost() external view returns (Post[] memory _posts) {
        uint cnt = 0;
        for (uint256 i = 0; i < counter; i++) {
            if (msg.sender == posts[i].author) {
                cnt += 1;
            }
        }

        _posts = new Post[](cnt);
        uint idx = 0;
        for (uint256 i = 0; i < counter; i++) {
            if (msg.sender == posts[i].author) {
                _posts[idx++] = posts[i];
            }
        }
    }

    // Function to tip a post and like it
    function likePost(uint256 _id) public {
        Post storage _post = posts[_id];
        require(_post.author != msg.sender, "Cannot like your own post");
        _post.likes += 1;
        posts[_id] = _post;
        emit PostTipped(_id, _post.postTxt, _post.tipAmount, _post.likes, _post.author);
    }
}
