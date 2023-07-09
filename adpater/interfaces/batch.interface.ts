export interface GrowBatch {
  batchId: string;
  batchStatus: string;
  seedType: string;
  plantationDate: string;
  harvestDate: string;
  farmerName: string;
  farmerAddress: string;
  farmerContact: number;
  growingChargePerKg: number;
  batchGenerationDate: string;
  batchWeight: number;
  batchPrice: number;
  batchSellDate: string;
  processorName: string;
  processorAddress: string;
  processorContact: number;
}

export interface ProcessBatch {
  batchId: string;
  batchStatus: string;
  processingType: string;
  dateOfTransport: string;
  farmerName: string;
  farmerAddress: string;
  farmerContact: number;
  farmerBatchId: string;
  batchPurchaseDate: string;
  batchPurchasePrice: number;
  batchPurchaseWeight: number;
  batchProcessingDate: string;
  processorName: string;
  processorAddress: string;
  processorContact: number;
  processingChargePerKg: number;
  processedBatchPrice: number;
  processedBatchWeight: number;
  batchSellDate: string;
  roasterName: string;
  roasterAddress: string;
  roasterContact: number;
}

export interface RoastBatch {
  batchId: string;
  batchStatus: string;
  roasingType: string;
  dateOfTransport: string;
  processorName: string;
  processorAddress: string;
  processorContact: number;
  processorBatchId: string;
  batchPurchaseDate: string;
  batchPurchasePrice: number;
  batchPurchaseWeight: number;
  roasterName: string;
  roasterAddress: string;
  roasterContact: number;
  roastingTemperature: number;
  roastingTime: string;
  roastingChargePerKg: number;
  roastedBatchPrice: number;
  roastedBatchWeight: number;
  batchSellDate: string;
  supplierName: string;
  supplierAddress: string;
  supplierContact: number;
}

export interface SupplyBatch {
  batchId: string;
  batchStatus: string;
  dateOfTransport: string;
  roasterName: string;
  roasterAddress: string;
  roasterContact: number;
  roasterBatchId: string;
  batchPurchaseDate: string;
  batchPurchasePrice: number;
  batchPurchaseWeight: number;
  supplierName: string;
  supplierAddress: string;
  supplierContact: number;
  packagingDate: string;
  packagingWeight: number;
  packagingChargePerKg: number;
  packagedBatchPrice: number;
  packagedBatchWeight: number;
  shippingChargePerKg: number;
  shippingBatchPrice: number;
  batchSellDate: string;
  retailerName: string;
  retailerAddress: string;
  retailerContact: number;
}

export interface RetailBatch {
  batchId: string;
  batchStatus: string;
  dateOfShipping: string;
  supplierName: string;
  supplierAddress: string;
  supplierContact: number;
  supplierBatchId: string;
  batchPurchaseDate: string;
  batchPurchasePrice: number;
  batchPurchaseWeight: number;
  retailerName: string;
  retailerAddress: string;
  retailerContact: number;
  grindType: string;
  grindToBrewTime: string;
  coffeeToWaterRatio: number;
  brewType: string;
  waterTemperatureBrewing: string;
  brewTime: string;
}
