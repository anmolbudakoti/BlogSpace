import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPostById,
  likePost,
  deletePost,
  type Post,
} from "@/services/blogService";
import { PostCard } from "@/components/blog/PostCard";
import { CommentSection } from "@/components/blog/CommentSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { toast } from "react-toastify";

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleLike = async (postId: string) => {
    try {
      const updatedPost = await likePost(postId);
      setPost(updatedPost);
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost(postId);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading post...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-soft border p-12">
              <div className="text-6xl mb-6">📝</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Post Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                The post you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation and Actions Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:bg-white/50 transition-all duration-200 -ml-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Posts</span>
              <span className="sm:hidden">Back</span>
            </Button>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="bg-white/50 hover:bg-white border-gray-200 flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Enhanced Post Card */}
            <div className="bg-white rounded-2xl shadow-soft border overflow-hidden">
              <PostCard
                post={post}
                onLike={handleLike}
                onDelete={handleDelete}
                showFullContent={true}
              />
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-soft border overflow-hidden">
              <CommentSection postId={post._id} />
            </div>

            {/* Related Posts or Suggestions (placeholder) */}
            <div className="bg-white rounded-2xl shadow-soft border p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Continue Reading
              </h3>
              <p className="text-gray-600 mb-6">
                Discover more stories from our community of writers.
              </p>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="border-gray-200 hover:bg-gray-50"
              >
                Explore More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
