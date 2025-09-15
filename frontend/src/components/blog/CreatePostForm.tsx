import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type PostFormData = z.infer<typeof postSchema>;

interface CreatePostFormProps {
  onSubmit: (data: PostFormData) => Promise<void>;
  initialData?: PostFormData;
  isEditing?: boolean;
  isLoading?: boolean;
}

export const CreatePostForm = ({ 
  onSubmit, 
  initialData, 
  isEditing = false, 
  isLoading = false 
}: CreatePostFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = async (data: PostFormData) => {
    try {
      await onSubmit(data);
      if (!isEditing) {
        reset();
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter post title"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              className="flex min-h-[120px] sm:min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              placeholder="Write your post content..."
              rows={6}
              {...register('content')}
            />
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading
              ? (isEditing ? 'Updating...' : 'Creating...')
              : (isEditing ? 'Update Post' : 'Create Post')
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};