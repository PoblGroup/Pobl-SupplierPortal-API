SELECT 
    [Id],
    [Username],
    [Password],
    [Supplier_Id],
    [IsAdmin],
    [CreatedOn],
    [ModifiedOn]
FROM 
    [dbo].[Users]
WHERE
    Username = @Username