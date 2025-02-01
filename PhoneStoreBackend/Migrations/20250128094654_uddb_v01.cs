using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhoneStoreBackend.Migrations
{
    public partial class uddb_v01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariants_Products_ProdcutId",
                table: "ProductVariants");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ProdcutId",
                table: "ProductVariants",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductVariants_ProdcutId",
                table: "ProductVariants",
                newName: "IX_ProductVariants_ProductId");

            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "ProductVariants",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "ProductVariants",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariants_Products_ProductId",
                table: "ProductVariants",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariants_Products_ProductId",
                table: "ProductVariants");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "ProductVariants");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "ProductVariants",
                newName: "ProdcutId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductVariants_ProductId",
                table: "ProductVariants",
                newName: "IX_ProductVariants_ProdcutId");

            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "ProductVariants",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Products",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariants_Products_ProdcutId",
                table: "ProductVariants",
                column: "ProdcutId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
