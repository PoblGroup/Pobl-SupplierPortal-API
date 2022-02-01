INSERT INTO [dbo].[Users]
           (
                [Username],
                [Password],
                [Supplier_Id],
                [IsAdmin],
                [CreatedOn],
                [ModifiedOn]
           )
VALUES
    (
        @Username,
        @Password,
        @Supplier_Id,
        @IsAdmin,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id