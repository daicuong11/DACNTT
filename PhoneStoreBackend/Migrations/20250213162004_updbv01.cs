using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhoneStoreBackend.Migrations
{
    public partial class updbv01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsImage",
                table: "ProductImages",
                newName: "Ismain");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Ismain",
                table: "ProductImages",
                newName: "IsImage");
        }
    }
}
