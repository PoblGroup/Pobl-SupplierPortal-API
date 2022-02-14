SELECT 
    [Id]
    ,[FullName]
    ,[Username]
    ,[Password]
    ,[Supplier_Id]
    ,[Status]
    ,[IsAdmin]
    ,[Direction]
    ,[CreatedOn]
    ,[ModifiedOn]
FROM 
    [dbo].[Users]
WHERE
    Id = @Id