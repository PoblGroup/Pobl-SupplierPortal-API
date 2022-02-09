INSERT INTO [dbo].[Appointments]
    (
        [JobReference],
        [DateTime],
        [Note],
        [SendSMS],
        [AppointmentOutcome],
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
        @ExternalReference,
        @CreatedOn,
        @ModifiedOn
    )

SELECT SCOPE_IDENTITY() AS Id