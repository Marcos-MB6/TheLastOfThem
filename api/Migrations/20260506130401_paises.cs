using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheLastOfThem.Api.Migrations
{
    /// <inheritdoc />
    public partial class paises : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Paises",
                table: "Animales",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Paises",
                table: "Animales");
        }
    }
}
