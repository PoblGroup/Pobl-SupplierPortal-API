UPDATE 
    [dbo].[Users]
SET 
    [FullName] = @FullName,
    [Username] = @Username,
    [Password] = @Password,
    [Supplier_Id] = @Supplier_Id,
    [Status] = @Status,
    [IsAdmin] = @IsAdmin,
    [Direction] = @Direction,
    [ModifiedOn] = @ModifiedOn
 WHERE 
    Id = @Id