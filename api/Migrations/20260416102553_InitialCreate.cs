using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheLastOfThem.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Animales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NombreComun = table.Column<string>(type: "TEXT", nullable: true),
                    NombreCientifico = table.Column<string>(type: "TEXT", nullable: true),
                    Categoria = table.Column<string>(type: "TEXT", nullable: true),
                    Reino = table.Column<string>(type: "TEXT", nullable: true),
                    Orden = table.Column<string>(type: "TEXT", nullable: true),
                    Familia = table.Column<string>(type: "TEXT", nullable: true),
                    Genero = table.Column<string>(type: "TEXT", nullable: true),
                    Especie = table.Column<string>(type: "TEXT", nullable: true),
                    Justificacion = table.Column<string>(type: "TEXT", nullable: true),
                    Amenazas = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Animales", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "BLOB", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "BLOB", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Animales");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
