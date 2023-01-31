using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class addrating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "Comments",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        EntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        EntityType = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Rating = table.Column<int>(type: "int", nullable: false),
            //        IsActive = table.Column<bool>(type: "bit", nullable: false),
            //        IsDeleted = table.Column<bool>(type: "bit", nullable: false),
            //        CreatedByName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        UpdatedByName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        UpdatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        DeletedByName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        CreateByDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        UpdateByDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        DeleteByDate = table.Column<DateTime>(type: "datetime2", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Comments", x => x.Id);
            //    });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");
        }
    }
}
