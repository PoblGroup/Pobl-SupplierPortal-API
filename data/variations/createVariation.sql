INSERT INTO [dbo].[JobVariation]
           (
                [JobReference],
                [DateTime],
                [VariationType],
                [SequenceNumber],
                [Product],
                [WriteInProduct],
                [Unit],
                [PricePerUnit],
                [Quantity],
                [TotalAmount],
                [SubLocation],
                [Note],
                [Direction],
                [CreatedOn],
                [ModifiedOn]
           )
VALUES
    (
        @JobReference,
        @DateTime,
        @VariationType,
        @SequenceNumber,
        @Product,
        @WriteInProduct,
        @Unit,
        @PricePerUnit,
        @Quantity,
        @TotalAmount,
        @SubLocation,
        @Note,
        @Direction,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id