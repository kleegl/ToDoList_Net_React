using Microsoft.EntityFrameworkCore;
using ReactASPNetCRUD.Models;

namespace ReactASPNetCRUD.Database
{
    public class AppDbContext: DbContext
    {
        public DbSet<Post> Posts {get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
            
        }

        // protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlServer();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            for(int i = 1; i <= 6; i++)
            {
                Post post = new Post
                {
                    PostId = i,
                    Title = $"Post {i}",
                    Content = $"Something content for {i} post"
                };
                modelBuilder.Entity<Post>().HasData(post);
            }
        }
    }
}