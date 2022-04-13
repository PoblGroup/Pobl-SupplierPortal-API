INSERT INTO [dbo].[Jobs_Products]
(
    [ProductId],
    [Name],
    [Quantity],
    [JobId]
)
VALUES
(
    @ProductId,
    @Name,
    @Quantity,
    @JobId
)

SELECT SCOPE_IDENTITY() AS Id