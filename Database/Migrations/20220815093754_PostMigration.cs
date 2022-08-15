using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactASPNetCRUD.Database.Migrations
{
    public partial class PostMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", maxLength: 100000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.PostId);
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "Content", "Title" },
                values: new object[,]
                {
                    { 1, "Something content for 1 post", "Post 1" },
                    { 2, "Something content for 2 post", "Post 2" },
                    { 3, "Something content for 3 post", "Post 3" },
                    { 4, "Something content for 4 post", "Post 4" },
                    { 5, "Something content for 5 post", "Post 5" },
                    { 6, "Something content for 6 post", "Post 6" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
