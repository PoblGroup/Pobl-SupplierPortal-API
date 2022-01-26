SELECT 
    [Id],
    [MaintenanceJobRef],
    [SupplierId],
    [JobDetails]
FROM 
    [dbo].[SupplierJobs]
WHERE 
    MaintenanceJobRef = @JobRef