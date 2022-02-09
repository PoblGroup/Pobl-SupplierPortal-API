INSERT INTO [dbo].[Cancellations]
    (
        [JobReference],
        [DateTime],
        [Status],
        [Note],
        [Direction],
        [CreatedOn],
        [ModifiedOn]
    )
VALUES
    (
        @JobReference,
        @DateTime,
        @Status,
        @Note,
        @Direction,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id