import { useState } from "react";
import Swal from "sweetalert2";
import "./Post.css";
import { useAuth } from "./AuthContext";

function Post() {
    // Track the selected post type and the values entered in each field.
    const [postType, setPostType] = useState("Question");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [abstract, setAbstract] = useState("");
    const [articleText, setArticleText] = useState("");
    const [tags, setTags] = useState("");
const { currentUser } = useAuth(); // Get the currently logged-in user from context.

    // Split comma-separated tags, remove surrounding spaces and discard empty tags.
    const getTags = () =>
        tags.split(",").map(tag => tag.trim()).filter(Boolean);

    const validateForm = () => {
        const cleanTitle = title.trim();
        const cleanTags = getTags();

        // Validate the title length after removing surrounding whitespace.
        if (cleanTitle.length < 5 || cleanTitle.length > 150) {
            return "Title must contain between 5 and 150 characters.";
        }

        // A post must have between one and three tags.
        if (cleanTags.length < 1 || cleanTags.length > 3) {
            return "Please enter between 1 and 3 tags, separated by commas.";
        }

        // Check the length of every individual tag.
        if (cleanTags.some(tag => tag.length < 2 || tag.length > 30)) {
            return "Each tag must contain between 2 and 30 characters.";
        }

        // Question posts require a description within the specified length.
        if (postType === "Question") {
            if (description.trim().length < 20) {
                return "Describe your problem in at least 20 characters.";
            }


        } else {
            // Article posts require a valid abstract and article body.
            if (abstract.trim().length < 20 || abstract.trim().length > 500) {
                return "The abstract must contain between 20 and 500 characters.";
            }

            // Reject abstracts containing a newline so they remain one paragraph.
            if (abstract.trim().includes("\n")) {
                return "The abstract must be a single paragraph.";
            }

            if (articleText.trim().length < 50) {
                return "Article text must contain at least 50 characters.";
            }

            if (articleText.trim().length > 10000) {
                return "Article text cannot exceed 10000 characters.";
            }
        }

        return ""; // An empty string means all validation checks passed.
    };

    const handlePost = (event) => {
        event.preventDefault(); // Stop the browser from reloading on submission.

        const error = validateForm();

        if (error) {
            // Show a popup explaining why the submitted form is invalid.
            Swal.fire({
                icon: "error",
                title: "Invalid input",
                text: error,
                confirmButtonColor: "#3157d5"
            });
            return;
        }

        // Show success feedback; this version does not save posts to a database.
        Swal.fire({
            icon: "success",
            title: "Post validated!",
            text: "Your post has been validated successfully. Actual submission will be implemented in a future task.",
            confirmButtonColor: "#3157d5"
        });
    };

    // Switching post type resets the fields so values from the previous type are cleared.
    const handleTypeChange = (type) => {
        setPostType(type);
        setTitle("");
        setDescription("");
        setAbstract("");
        setArticleText("");
        setTags("");
    };

    return (
        
        <main className="post-page">
            <form className="post-form" onSubmit={handlePost}>
                <h2 className="section-heading">New Post</h2>

                <div className="post-type">
                    <span className="type-label">Select Post Type:</span>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            value="Question"
                            checked={postType === "Question"}
                            onChange={() => handleTypeChange("Question")}
                        />
                        Question
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            value="Article"
                            checked={postType === "Article"}
                            onChange={() => handleTypeChange("Article")}
                        />
                        Article
                    </label>
                </div>

                <h2 className="section-heading">
                    What do you want to ask or share
                </h2>

                <p className="form-instruction">
                    This section changes according to the selected post type.
                    <span>
                        {postType === "Question"
                            ? " For a question, enter your problem and relevant tags."
                            : " For an article, provide a title, abstract and article text."}
                    </span>
                </p>

                <div className="form-field">
                    <label htmlFor="post-title">Title</label>
                    <input
                        id="post-title"
                        type="text"
                        // Use a different placeholder depending on the selected post type.
                        placeholder={
                            postType === "Question"
                                ? "Start your question with how, what, why, etc."
                                : "Enter a descriptive title"
                        }
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        minLength={5}
                        maxLength={150}
                        required
                    />
                    {/* Display the current title length to the user. */}
                    <small>{title.length}/150 characters</small>
                </div>

                {/* Conditional rendering shows the fields for the selected post type. */}
                {postType === "Question" ? (
                    <div className="form-field">
                        <label htmlFor="description">
                            Describe your problem
                        </label>
                        <textarea
                            id="description"
                            className="question-description"
                            placeholder="Explain your problem clearly..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            minLength={20}
                            maxLength={5000}
                            required
                        />
                        <small>{description.length}/5000 characters</small>
                    </div>
                ) : (
                    // A fragment groups both article fields without adding another HTML element.
                    <>
                        <div className="form-field">
                            <label htmlFor="abstract">Abstract</label>
                            <textarea
                                id="abstract"
                                className="article-abstract"
                                placeholder="Enter a 1-paragraph abstract"
                                value={abstract}
                                onChange={(e) => setAbstract(e.target.value)}
                                minLength={20}
                                maxLength={500}
                                required
                            />
                            <small>
                                {abstract.length}/500 characters. Use one paragraph.
                            </small>
                        </div>

                        <div className="form-field">
                            <label htmlFor="article-text">Article Text</label>
                            <textarea
                                id="article-text"
                                className="article-content"
                                placeholder="Write your article here..."
                                value={articleText}
                                onChange={(e) => setArticleText(e.target.value)}
                                minLength={50}
                                maxLength={10000}
                                required
                            />
                            <small>
                                {articleText.length}/10000 characters
                            </small>
                        </div>
                    </>
                )}

                <div className="form-field tags-field">
                    <label htmlFor="tags">Tags</label>
                    <input
                        id="tags"
                        type="text"
                        placeholder="Add up to 3 tags, e.g., Java, React, CSS"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required
                    />
                    <small>Separate tags with commas.</small>
                </div>

                <div className="post-actions">
                    <button type="submit" className="post-button">
                        Post
                    </button>
                </div>
            </form>
        </main>
    );
}

export default Post;