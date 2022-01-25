INSERT INTO [dbo].[JobVariation]
           (
                [JobReference],
                [DateTime],
                [SequenceNo],
                [Action],
                [Product],
                [SubLocation],
                [Quantity],
                [JobTotalValue],
                [CreatedOn],
                [ModifiedOn]
           )
VALUES
    (
        @JobReference,
        @DateTime,
        @SequenceNo,
        @Action,
        @Product,
        @SubLocation,
        @Quantity,
        @JobTotalValue,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id