using ReactASPNetCRUD.Models;

namespace ReactASPNetCRUD.Repositories.Interfaces
{
    public interface IPostRepository
    {
        internal Task<List<Post>> GetAllPosts();
        internal Task<Post> GetPostById(int postId);
        internal Task<bool> CreatePost(Post postToCreate);
        internal Task<bool> UpdatePost(Post postToUpdate);
        internal Task<bool> DeletePost(int postId);
    }
}
