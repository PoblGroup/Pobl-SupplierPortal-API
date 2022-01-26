INSERT INTO [dbo].[Appointments]
    (
        [JobReference],
        [DateTime],
        [Note],
        [SendSMS],
        [AppointmentOutcome],
        [Outcome],
        [OutcomeNarrative],
        [ExternalReference],
        [CreatedOn],
        [ModifiedOn]
    )
VALUES
    (
        @JobReference,
        @DateTime,
        @Note,
        @SendSMS,
        @AppointmentOutcome,
        @Outcome,
        @OutcomeNarrative,
        @ExternalReference,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id