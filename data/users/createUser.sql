INSERT INTO [dbo].[Users]
           (
                [FullName],
                [Username],
                [Password],
                [Supplier_Id],
                [Status],
                [IsAdmin],
                [Direction],
                [CreatedOn],
                [ModifiedOn]
           )
VALUES
    (
        @FullName,
        @Username,
        @Password,
        @Supplier_Id,
        @Status,
        @IsAdmin,
        @Direction,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id