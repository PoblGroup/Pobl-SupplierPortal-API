SELECT [Id]
      ,[MaintenanceJobRef]
      ,[SupplierId]
      ,[JobDetails]
FROM [dbo].[SupplierJobs]
WHERE SupplierId = @SupplierId

