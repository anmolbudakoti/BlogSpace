import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { getCommentsByPost, createComment, updateComment, deleteComment, type Comment } from '@/services/blogService';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Trash2 } from 'lucide-react';

const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentSectionProps {
  postId: string;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const { user } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const fetchComments = useCallback(async () => {
    try {
      const data = await getCommentsByPost(postId);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const onSubmit = async (data: CommentFormData) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      if (editingComment) {
        const updatedComment = await updateComment(editingComment, data);
        setComments(comments.map(c => c._id === editingComment ? updatedComment : c));
        setEditingComment(null);
        toast.success('Comment updated successfully');
      } else {
        const newComment = await createComment(postId, data);
        setComments([newComment, ...comments]);
        toast.success('Comment posted successfully');
      }
      reset();
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error(editingComment ? 'Failed to update comment' : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment._id);
    setValue('content', comment.content);
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c._id !== commentId));
      toast.success('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    reset();
  };

  if (isLoading) {
    return <div className="text-center">Loading comments...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comment" className="text-sm sm:text-base">
                  {editingComment ? 'Edit Comment' : 'Add a Comment'}
                </Label>
                <textarea
                  id="comment"
                  className="flex min-h-[80px] sm:min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  placeholder="Write your comment..."
                  rows={3}
                  {...register('content')}
                />
                {errors.content && (
                  <p className="text-sm text-red-600">{errors.content.message}</p>
                )}
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2 sm:space-x-0">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto order-1 sm:order-none"
                >
                  {isSubmitting
                    ? (editingComment ? 'Updating...' : 'Posting...')
                    : (editingComment ? 'Update Comment' : 'Post Comment')
                  }
                </Button>
                {editingComment && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="w-full sm:w-auto order-2 sm:order-none"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <p className="text-gray-600">Please login to comment</p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        {comments.map((comment) => {
          const canEdit = user && (user._id === comment.author._id || user.role === 'admin');
          
          return (
            <Card key={comment._id}>
              <CardContent className="pt-3 sm:pt-4">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs sm:text-sm">
                        {comment.author.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <span className="text-sm font-medium block truncate">{comment.author.name}</span>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {canEdit && (
                    <div className="flex space-x-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(comment)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                      >
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(comment._id)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{comment.content}</p>
              </CardContent>
            </Card>
          );
        })}
        {comments.length === 0 && (
          <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};