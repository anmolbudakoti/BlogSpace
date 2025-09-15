import { useState, useEffect, useRef } from "react";
import {
  getPosts,
  likePost,
  deletePost,
  type Post,
} from "@/services/blogService";
import { useAuthStore } from "@/store/authStore";
import { PostCard } from "@/components/blog/PostCard";
import { CreatePostForm } from "@/components/blog/CreatePostForm";
import { Button } from "@/components/ui/button";
import { Plus, X, Search, TrendingUp, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const HomePage = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToPosts = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const updatedPost = await likePost(postId);
      setPosts(posts.map((p) => (p._id === postId ? updatedPost : p)));
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost(postId);
      setPosts(posts.filter((p) => p._id !== postId));
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowCreateForm(true);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {!user && posts.length > 0 && (
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to BlogSpace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover amazing stories, share your thoughts, and connect with a
              community of writers and readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToPosts()}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Start Reading
              </Button>
              <Button
                onClick={() => navigate("/auth")}
                size="lg"
                variant="outline"
                className="border-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full"
              >
                Join Community
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {posts.length > 0 && (
        <section
          ref={sectionRef}
          className="py-12 bg-white/50 backdrop-blur-sm border-b"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {posts.length}
                </h3>
                <p className="text-gray-600">Published Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-100 rounded-full p-4 mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {new Set(posts.map((p) => p.author._id)).size}
                </h3>
                <p className="text-gray-600">Active Writers</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-green-100 rounded-full p-4 mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {posts.reduce((sum, post) => sum + post.likes.length, 0)}
                </h3>
                <p className="text-gray-600">Total Likes</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header with Search and Create Button */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Latest Posts
              </h1>
              <p className="text-gray-600">
                Discover the latest stories from our community
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {/* Create Post Button */}
              {user && (
                <Button
                  onClick={() => {
                    setEditingPost(null);
                    setShowCreateForm(!showCreateForm);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 whitespace-nowrap"
                >
                  {showCreateForm ? (
                    <>
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>New Post</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Create Post Form */}
          {showCreateForm && user && (
            <div className="mb-12 bg-white rounded-2xl shadow-soft border p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h2>
              <CreatePostForm
                onSubmit={async (data) => {
                  try {
                    if (editingPost) {
                      const { updatePost } = await import(
                        "@/services/blogService"
                      );
                      const updatedPost = await updatePost(editingPost._id, data);
                      setPosts(
                        posts.map((p) =>
                          p._id === editingPost._id ? updatedPost : p
                        )
                      );
                      toast.success("Post updated successfully");
                    } else {
                      const { createPost } = await import(
                        "@/services/blogService"
                      );
                      const newPost = await createPost(data);
                      setPosts([newPost, ...posts]);
                      toast.success("Post created successfully");
                    }
                    setShowCreateForm(false);
                    setEditingPost(null);
                  } catch (error) {
                    console.error("Error saving post:", error);
                    toast.error(editingPost ? "Failed to update post" : "Failed to create post");
                  }
                }}
                initialData={
                  editingPost
                    ? { title: editingPost.title, content: editingPost.content }
                    : undefined
                }
                isEditing={!!editingPost}
              />
            </div>
          )}

          {/* Posts Grid */}
          <div className="space-y-8">
            {filteredPosts.length > 0 ? (
              <>
                {searchQuery && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-blue-800">
                      Found {filteredPosts.length} post
                      {filteredPosts.length !== 1 ? "s" : ""} matching &ldquo;
                      {searchQuery}&rdquo;
                    </p>
                  </div>
                )}
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onLike={handleLike}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            ) : posts.length > 0 ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                  No posts found
                </h2>
                <p className="text-gray-500">
                  Try adjusting your search or browse all posts
                </p>
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                  No posts yet
                </h2>
                {user ? (
                  <div className="space-y-4">
                    <p className="text-gray-500 max-w-md mx-auto">
                      Be the first to share your thoughts with the community!
                    </p>
                    <Button
                      onClick={() => setShowCreateForm(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Write Your First Post
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-500 max-w-md mx-auto">
                      Join our community to discover amazing stories and share
                      your own thoughts.
                    </p>
                    <Button
                      onClick={() => (window.location.href = "/auth")}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
