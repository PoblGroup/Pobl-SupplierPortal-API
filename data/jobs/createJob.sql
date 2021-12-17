INSERT INTO [dbo].[SupplierJobs]
           (
                [MaintenanceJobRef],
                [SupplierId],
                [JobDetails]
           )
VALUES
    (
        @MaintenanceJobRef,
        @SupplierId, 
        @JobDetails
    )

SELECT SCOPE_IDENTITY() AS Id