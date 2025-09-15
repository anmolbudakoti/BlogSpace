import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Edit,
  Trash2,
  Clock,
  Share2,
} from "lucide-react";
import type { Post } from "@/services/blogService";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
  showFullContent?: boolean;
}

export const PostCard = ({
  post,
  onLike,
  onEdit,
  onDelete,
  showFullContent = false,
}: PostCardProps) => {
  const { user } = useAuthStore();
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await onLike(post._id);
    } finally {
      setIsLiking(false);
    }
  };

  const isLiked = user && post.likes.includes(user._id);
  const canEdit =
    user && (user._id === post.author._id || user.role === "admin");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(" ").length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/post/${post._id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <Card className="w-full group hover:shadow-lg transition-all duration-300 border-0 shadow-soft bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <Link to={`/post/${post._id}`} className="block">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {post.title}
              </CardTitle>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-white shadow-sm flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-xs sm:text-sm">
                  {post.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                  {post.author.name}
                </span>
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-500">
                  <span className="hidden xs:inline">
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="xs:hidden">
                    {formatDate(post.createdAt).replace(" ago", "")}
                  </span>
                  <span className="hidden xs:inline">•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{estimateReadingTime(post.content)} min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {canEdit && (
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-200 flex-shrink-0">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(post)}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                >
                  <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(post._id)}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {showFullContent ? (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        ) : (
          <Link to={`/post/${post._id}`} className="block mb-6">
            <p className="text-gray-700 leading-relaxed line-clamp-3 group-hover:text-gray-900 transition-colors duration-200">
              {post.content}
            </p>
          </Link>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user && (
              <Button
                variant={isLiked ? "default" : "ghost"}
                size="sm"
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center space-x-1 sm:space-x-2 transition-all duration-200 text-xs sm:text-sm ${
                  isLiked
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <Heart
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${isLiked ? "fill-current" : ""} ${isLiking ? "animate-pulse" : ""}`}
                />
                <span>{post.likes.length}</span>
              </Button>
            )}

            <Link to={`/post/${post._id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 sm:space-x-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-xs sm:text-sm"
              >
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Comments</span>
              </Button>
            </Link>

            <Button
              onClick={handleShare}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 sm:space-x-2 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 opacity-0 group-hover:opacity-100 sm:opacity-100 text-xs sm:text-sm"
            >
              <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            {post.createdAt !== post.updatedAt && (
              <Badge
                variant="secondary"
                className="text-xs bg-amber-50 text-amber-700 border-amber-200 px-1 py-0 sm:px-2 sm:py-1"
              >
                Edited
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
