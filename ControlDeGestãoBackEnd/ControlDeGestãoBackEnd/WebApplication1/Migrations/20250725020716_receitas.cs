using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class receitas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItensReceita_Produtos_IngredienteId",
                table: "ItensReceita");

            migrationBuilder.DropForeignKey(
                name: "FK_ItensReceita_Receitas_receitaId",
                table: "ItensReceita");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItensReceita",
                table: "ItensReceita");

            migrationBuilder.RenameTable(
                name: "ItensReceita",
                newName: "ItemReceitas");

            migrationBuilder.RenameIndex(
                name: "IX_ItensReceita_receitaId",
                table: "ItemReceitas",
                newName: "IX_ItemReceitas_receitaId");

            migrationBuilder.RenameIndex(
                name: "IX_ItensReceita_IngredienteId",
                table: "ItemReceitas",
                newName: "IX_ItemReceitas_IngredienteId");

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "Receitas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemReceitas",
                table: "ItemReceitas",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemReceitas_Produtos_IngredienteId",
                table: "ItemReceitas",
                column: "IngredienteId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemReceitas_Receitas_receitaId",
                table: "ItemReceitas",
                column: "receitaId",
                principalTable: "Receitas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemReceitas_Produtos_IngredienteId",
                table: "ItemReceitas");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemReceitas_Receitas_receitaId",
                table: "ItemReceitas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemReceitas",
                table: "ItemReceitas");

            migrationBuilder.DropColumn(
                name: "Nome",
                table: "Receitas");

            migrationBuilder.RenameTable(
                name: "ItemReceitas",
                newName: "ItensReceita");

            migrationBuilder.RenameIndex(
                name: "IX_ItemReceitas_receitaId",
                table: "ItensReceita",
                newName: "IX_ItensReceita_receitaId");

            migrationBuilder.RenameIndex(
                name: "IX_ItemReceitas_IngredienteId",
                table: "ItensReceita",
                newName: "IX_ItensReceita_IngredienteId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItensReceita",
                table: "ItensReceita",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItensReceita_Produtos_IngredienteId",
                table: "ItensReceita",
                column: "IngredienteId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItensReceita_Receitas_receitaId",
                table: "ItensReceita",
                column: "receitaId",
                principalTable: "Receitas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
