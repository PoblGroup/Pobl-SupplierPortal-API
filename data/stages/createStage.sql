INSERT INTO [dbo].[Stages]
    (
        [JobReference],
        [DateTime],
        [Status],
        [Note],
        [CreatedOn],
        [ModifiedOn]
    )
VALUES
    (
        @JobReference,
        @DateTime,
        @Status,
        @Note,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id