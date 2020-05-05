using Microsoft.EntityFrameworkCore.Migrations;

namespace BookStore.API.Migrations
{
    public partial class AddingPublicIdForPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicID",
                table: "Books",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicID",
                table: "Books");
        }
    }
}
