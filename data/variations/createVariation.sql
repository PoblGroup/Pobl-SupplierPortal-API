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
                [Direction],
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
        @Direction,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id