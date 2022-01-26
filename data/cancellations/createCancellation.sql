INSERT INTO [dbo].[Cancellations]
    (
        [JobReference],
        [DateTime],
        [Status],
        [Note],
        [Outcome],
        [OutcomeNarrative],
        [CreatedOn],
        [ModifiedOn]
    )
VALUES
    (
        @JobReference,
        @DateTime,
        @Status,
        @Note,
        @Outcome,
        @OutcomeNarrative,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id