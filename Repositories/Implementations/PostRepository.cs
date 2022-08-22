using Microsoft.EntityFrameworkCore;
using ReactASPNetCRUD.Database;
using ReactASPNetCRUD.Repositories.Interfaces;
using ReactASPNetCRUD.Models;
using System.Diagnostics;
using Microsoft.AspNetCore.Cors;

namespace ReactASPNetCRUD.Repositories
{
    internal class PostRepository: IPostRepository
    { 
        private readonly AppDbContext _contextDb;
        public PostRepository(AppDbContext contextDb)
        {
            _contextDb = contextDb;
        }

        public async Task<List<Post>> GetAllPosts()
        {
            return await _contextDb.Posts.ToListAsync();
        }

        public async Task<Post> GetPostById(int postId)
        {
            return await _contextDb.Posts.FirstOrDefaultAsync(post => post.PostId == postId);
        }

        public async Task<bool> CreatePost(Post postToCreate)
        {
            try
            {
                await _contextDb.Posts.AddAsync(postToCreate);
                return await _contextDb.SaveChangesAsync() >= 1;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> UpdatePost(Post postToUpdate)
        {
            try
            {
                _contextDb.Posts.Update(postToUpdate);
                return await _contextDb.SaveChangesAsync() >= 1;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeletePost(int postId)
        {
            try
            {
                Post postToDelete = await _contextDb.Posts.FirstOrDefaultAsync(post => post.PostId == postId);

                if (postToDelete != null)
                {
                    _contextDb.Remove(postToDelete);
                    _contextDb.SaveChangesAsync();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
