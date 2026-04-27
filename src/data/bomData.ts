export interface BomItem {
  level: string
  erpCode: string
  description: string
  partNo: string
  category: string
  material: string
  quantity: number
  uom: string
  makeBuy: 'Make' | 'Buy'
  preferredSupplier: string
  leadTimeDays: number
  axis: 'X Axis' | 'Y Axis' | 'Z Axis' | 'Fixation' | 'Finished Good'
  status: 'Active' | 'Pending' | 'On Order' | 'Available'
}

export const bomData: BomItem[] = [
  // Finished Good
  { level: '0', erpCode: 'RM-02994', description: 'Linear Robot ARIA LR340', partNo: 'LR340/01-00-000', category: 'Finished Good', material: 'Standard FG', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 10, axis: 'Finished Good', status: 'Active' },
  // X Axis
  { level: '1', erpCode: 'RM-02794', description: 'LR 340 V1 R1 X Axis', partNo: 'LR340/01-X1-000', category: 'Semi Finished', material: 'Standard FG', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 2, axis: 'X Axis', status: 'Active' },
  { level: '1.1', erpCode: 'RM-02456', description: 'X-BEAM', partNo: 'LR340/01-X1-001', category: 'Manufacturing Part', material: 'ATSM A36', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 10, axis: 'X Axis', status: 'Active' },
  { level: '1.1.1', erpCode: 'RM-01606', description: 'Seamless beam ATSM A36 250x150mm T10 L4M', partNo: 'N/A', category: 'Raw Material', material: 'ATSM A36', quantity: 4, uom: 'M', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 30, axis: 'X Axis', status: 'On Order' },
  { level: '1.2', erpCode: 'RM-01215', description: 'X beam cover', partNo: 'LR340/01-X1-002', category: 'Manufacturing Part', material: 'Steel 37 Sheet Metal', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'Garrana', leadTimeDays: 1, axis: 'X Axis', status: 'Active' },
  { level: '1.3', erpCode: 'RM-01209', description: 'X cable tray', partNo: 'LR340/01-X1-003', category: 'Manufacturing Part', material: 'Steel 37 Sheet Metal', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'Garrana', leadTimeDays: 1, axis: 'X Axis', status: 'Active' },
  { level: '1.4', erpCode: 'RM-00918', description: 'Cable chain H25xW75 cm, Length:2.25m', partNo: 'N/A', category: 'Standard FG', material: 'Igumid G', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'IGUS', leadTimeDays: 30, axis: 'X Axis', status: 'On Order' },
  { level: '1.5', erpCode: 'RM-00921', description: 'Mounting Bracket (TEZ25x75)', partNo: 'N/A', category: 'Standard FG', material: 'Igumid G', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'IGUS', leadTimeDays: 30, axis: 'X Axis', status: 'On Order' },
  { level: '1.6', erpCode: 'RM-02424', description: 'X stopper', partNo: 'LRGN0/01-X1-001', category: 'Manufacturing Part', material: 'Steel M201', quantity: 4, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 3, axis: 'X Axis', status: 'Active' },
  { level: '1.6.1', erpCode: 'RM-02893', description: 'Steel Block 70mm (70×70×35mm)', partNo: 'N/A', category: 'Raw Material', material: 'Steel M201', quantity: 1.4, uom: 'KG', makeBuy: 'Buy', preferredSupplier: 'Open Supplier', leadTimeDays: 2, axis: 'X Axis', status: 'Available' },
  { level: '1.7', erpCode: 'RM-02712', description: 'Aria LOGO', partNo: 'N/A', category: 'Standard FG', material: 'Stainless Steel', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'Ming Hong Technology', leadTimeDays: 30, axis: 'X Axis', status: 'On Order' },
  { level: '1.8', erpCode: 'RM-01214', description: 'Junction box cover', partNo: 'LRGN0/01-00-005', category: 'Manufacturing Part', material: 'Steel 37 Sheet Metal', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'Garrana', leadTimeDays: 1, axis: 'X Axis', status: 'Active' },
  { level: '1.9', erpCode: 'RM-01213', description: 'Junction box', partNo: 'LRGN0/01-00-004', category: 'Manufacturing Part', material: 'Steel 37 Sheet Metal', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'Garrana', leadTimeDays: 1, axis: 'X Axis', status: 'Active' },
  { level: '1.11', erpCode: 'RM-01314', description: 'X-guide wedge', partNo: 'LRGN0/01-X1-002', category: 'Manufacturing Part', material: 'Steel M201', quantity: 10, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 2, axis: 'X Axis', status: 'Active' },
  { level: '1.12', erpCode: 'RM-00030', description: 'GEARED RACK-M1.5 x 100LG', partNo: 'LRGN0/01-X1-003', category: 'Standard FG', material: 'Carbon steel', quantity: 4, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'X Axis', status: 'On Order' },
  { level: '1.13', erpCode: 'RM-01220', description: 'HOMING CAM', partNo: 'LRGN0/01-X1-004', category: 'Manufacturing Part', material: 'Steel M201', quantity: 2, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 2, axis: 'X Axis', status: 'Active' },
  { level: '1.14', erpCode: 'RM-00971', description: 'LIMIT SWITCH CAM PLATE', partNo: 'LRGN0/01-X1-005', category: 'Manufacturing Part', material: 'Steel 37 Sheet Metal', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'Garrana', leadTimeDays: 1, axis: 'X Axis', status: 'Active' },
  { level: '1.15', erpCode: 'RM-02714', description: 'X AXIS NAME PLATE', partNo: 'LRGN0/01-X1-006', category: 'Standard FG', material: 'Nickel Chroming', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'X Axis', status: 'On Order' },
  { level: '1.16', erpCode: 'RM-00874', description: '300C-GUIDE RAIL ASSY TRH30 FE', partNo: 'TRH30FE', category: 'Standard FG', material: 'Hardened steel', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'X Axis', status: 'On Order' },
  { level: '1.17', erpCode: 'RM-01174', description: 'Rubber Stopper', partNo: 'N/A', category: 'Standard FG', material: 'Rubber', quantity: 4, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 7, axis: 'X Axis', status: 'Available' },
  { level: '1.18', erpCode: 'RM-00768', description: 'Socket Head Screw M10x35-35N', partNo: 'DIN 912', category: 'Standard Fastener', material: 'Stainless Steel', quantity: 16, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 3, axis: 'X Axis', status: 'Available' },
  { level: '1.19', erpCode: 'RM-00125', description: 'Spring Washer M10', partNo: 'DIN 912', category: 'Standard Fastener', material: 'Stainless Steel', quantity: 24, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 3, axis: 'X Axis', status: 'Available' },
  { level: '1.21', erpCode: 'RM-00583', description: 'Socket Head Screw M5x16-16N', partNo: 'ISO 4762', category: 'Standard Fastener', material: 'Stainless Steel', quantity: 30, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 3, axis: 'X Axis', status: 'Available' },
  { level: '1.27', erpCode: 'RM-00105', description: 'Socket Head Screw M8x25-25N', partNo: 'ISO 4762', category: 'Standard Fastener', material: 'Stainless Steel', quantity: 120, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 3, axis: 'X Axis', status: 'Available' },
  // Y Axis
  { level: '2', erpCode: 'RM-02793', description: 'LR 340 V1 R1 Y Axis', partNo: 'LR340/01-Y1-000', category: 'Semi Finished', material: 'Standard FG', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 2, axis: 'Y Axis', status: 'Active' },
  { level: '2.1', erpCode: 'RM-02296', description: 'Y-beam', partNo: 'LR340/01-Y1-001', category: 'Manufacturing Part', material: 'Steel M201', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 5, axis: 'Y Axis', status: 'Active' },
  { level: '2.1.1', erpCode: 'RM-01605', description: 'Seamless beam ATSM A36 200x150mm T6 L1.9M', partNo: 'N/A', category: 'Raw Material', material: 'Steel M201', quantity: 2, uom: 'M', makeBuy: 'Make', preferredSupplier: 'N/A', leadTimeDays: 30, axis: 'Y Axis', status: 'On Order' },
  { level: '2.2', erpCode: 'RM-02593', description: 'Y stopper', partNo: 'LRGN0/01-Y1-001', category: 'Manufacturing Part', material: 'Steel M201', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 3, axis: 'Y Axis', status: 'Active' },
  { level: '2.3', erpCode: 'RM-00981', description: 'Y REAR COVER', partNo: 'LRGN0/01-Y1-002', category: 'Manufacturing Part', material: 'Steel 37 Sheet Metal', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'Garrana', leadTimeDays: 1, axis: 'Y Axis', status: 'Active' },
  { level: '2.4', erpCode: 'RM-01198', description: 'Y beam TOP Cover', partNo: 'LRGN0/01-Y1-003', category: 'Manufacturing Part', material: 'Steel 37 Sheet Metal', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'Garrana', leadTimeDays: 1, axis: 'Y Axis', status: 'Active' },
  { level: '2.11', erpCode: 'RM-00917', description: 'Cable chain H25xW38 cm, Length:1.3m', partNo: 'N/A', category: 'Standard FG', material: 'Igumid G', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'IGUS', leadTimeDays: 30, axis: 'Y Axis', status: 'On Order' },
  { level: '2.13', erpCode: 'RM-00030', description: 'GEARED RACK-M1.5 x 100LG', partNo: 'N/A', category: 'Standard FG', material: 'Carbon steel', quantity: 3, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Y Axis', status: 'On Order' },
  { level: '2.17', erpCode: 'RM-00025', description: 'Guided Rails TRS25VN', partNo: 'TRS25VN', category: 'Standard FG', material: 'Hardened steel', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Y Axis', status: 'On Order' },
  { level: '2.20', erpCode: 'RM-02790', description: 'XY Carriage', partNo: 'LR340/01-XC-001', category: 'Manufacturing Part', material: 'Aluminum 6061 T6', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 5, axis: 'Y Axis', status: 'Active' },
  { level: '2.22', erpCode: 'RM-00028', description: 'Y-AXIS PINION', partNo: 'LRGN0/01-00-001', category: 'Standard FG', material: 'Alloy Steel', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Y Axis', status: 'On Order' },
  { level: '2.24', erpCode: 'RM-00802', description: 'Y Motor AM8032-0D10', partNo: 'AM8032-0D10', category: 'Standard FG', material: 'Multi-Material Electrical Assembly', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 30, axis: 'Y Axis', status: 'On Order' },
  { level: '2.25', erpCode: 'RM-00804', description: 'X Motor AM8052-0J10', partNo: 'AM8052-0J10', category: 'Standard FG', material: 'Multi-Material Electrical Assembly', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 30, axis: 'Y Axis', status: 'On Order' },
  { level: '2.30', erpCode: 'RM-00868', description: 'LIMIT SWITCH', partNo: 'MCADID0003486', category: 'Standard FG', material: 'Multi-Material Electrical Assembly', quantity: 4, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Y Axis', status: 'Available' },
  { level: '2.31', erpCode: 'RM-00054', description: 'PROXIMITY SENSOR', partNo: 'E2B_M12LS04_M1_B1', category: 'Standard FG', material: 'Multi-Material Electrical Assembly', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Y Axis', status: 'Available' },
  // Z Axis
  { level: '3', erpCode: 'RM-02792', description: 'LR 340 V1 R1 Z Axis', partNo: 'LR340/01-Z1-000', category: 'Semi Finished', material: 'Standard FG', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 2, axis: 'Z Axis', status: 'Active' },
  { level: '3.1', erpCode: 'RM-02127', description: 'Z Outer Beam', partNo: 'LR340/01-Z1-003', category: 'Manufacturing Part', material: 'Aluminum 6063 T6', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 5, axis: 'Z Axis', status: 'Active' },
  { level: '3.2', erpCode: 'RM-02223', description: 'Z Inner Beam', partNo: 'LR340/01-Z1-002', category: 'Manufacturing Part', material: 'Aluminum 6063 T6', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 5, axis: 'Z Axis', status: 'Active' },
  { level: '3.3', erpCode: 'RM-00800', description: 'Z Motor AM8052-0L11', partNo: 'AM8052-0L11', category: 'Standard FG', material: 'Multi-Material Electrical Assembly', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 30, axis: 'Z Axis', status: 'On Order' },
  { level: '3.4', erpCode: 'RM-00801', description: 'Z Axis Planetary Gearbox, Ratio 1:10', partNo: 'AG3210-+NP025S-MF1-10-1G1-AM805x', category: 'Standard FG', material: 'Multi-Material Mechanical Assembly', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 30, axis: 'Z Axis', status: 'On Order' },
  { level: '3.5', erpCode: 'RM-02208', description: 'Z Carriage', partNo: 'LRGN0/01-Z1-004', category: 'Manufacturing Part', material: 'Aluminum 6061 T6', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 5, axis: 'Z Axis', status: 'Active' },
  { level: '3.7', erpCode: 'RM-00030', description: 'GEARED RACK-M1.5 x 100LG', partNo: 'N/A', category: 'Standard FG', material: 'Carbon steel', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Z Axis', status: 'On Order' },
  { level: '3.8', erpCode: 'RM-00473', description: 'TRS20VN-2-XNB-1350-H-Z1', partNo: 'TRS20VN-1-XNB-1350-H-Z1', category: 'Standard FG', material: 'Hardened steel', quantity: 5, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Z Axis', status: 'On Order' },
  { level: '3.16', erpCode: 'RM-01095', description: 'Telescopic Pulley AT10', partNo: 'AT10', category: 'Standard FG', material: 'Aluminum', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Z Axis', status: 'On Order' },
  { level: '3.26', erpCode: 'RM-00054', description: 'PROXIMITY SENSOR', partNo: 'E2B_M12LS04_M1_B1', category: 'Standard FG', material: 'Multi-Material Electrical Assembly', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Z Axis', status: 'Available' },
  { level: '3.28', erpCode: 'RM-00791', description: 'BELT', partNo: 'N/A', category: 'Standard FG', material: 'PVC', quantity: 1, uom: 'M', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Z Axis', status: 'On Order' },
  { level: '3.32', erpCode: 'RM-00868', description: 'LIMIT SWITCH', partNo: 'MCADID0003486', category: 'Standard FG', material: 'Multi-Material Electrical Assembly', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Z Axis', status: 'Available' },
  // Fixation
  { level: '4', erpCode: 'N/A', description: 'Standard Robot Fixation Columns', partNo: 'N/A', category: 'Semi Finished', material: 'Carbon steel', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'Aria Technologies', leadTimeDays: 5, axis: 'Fixation', status: 'Active' },
  { level: '4.1', erpCode: 'RM-02632', description: 'Robot Fixation Columns', partNo: 'R340/01-F2-001', category: 'Manufacturing Part', material: 'ASTM A36', quantity: 2, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Fixation', status: 'On Order' },
  { level: '4.4', erpCode: 'N/A', description: 'HMI Panel Assembly', partNo: 'N/A', category: 'Standard FG', material: 'Aluminum', quantity: 1, uom: 'EA', makeBuy: 'Make', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Fixation', status: 'On Order' },
  { level: '4.4.1', erpCode: 'RM-00878', description: 'HMI 400x300 Aluminum Enclosure', partNo: 'ECO9000.0206', category: 'Standard FG', material: 'Aluminum', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Fixation', status: 'On Order' },
  { level: '4.4.2', erpCode: 'RM-00879', description: 'HMI Aluminum Frontsheet', partNo: 'LVH2.00.4030', category: 'Standard FG', material: 'Aluminum', quantity: 1, uom: 'EA', makeBuy: 'Buy', preferredSupplier: 'N/A', leadTimeDays: 14, axis: 'Fixation', status: 'On Order' },
]

export const actionPlanData = [
  { id: 'c', axis: 'X Axis', itemNo: 1, erpCode: 'RM-02910', partName: 'X-BEAM (Machined)', partNo: 'LR200-01-0P-R00-00001-01', category: 'Internal Manufacturing', material: 'Aluminum 6063 T6', qty: 1, executionType: 'Production Control', action: 'Material Request', refNo: 'RWO/01921', status: 'Done', responsible: 'Ahmed Ramadan' },
  { id: '2', axis: 'X Axis', itemNo: 1, erpCode: 'RM-02910', partName: 'X-BEAM (Machined)', partNo: 'LR200-01-0P-R00-00001-01', category: 'Internal Manufacturing', material: 'Aluminum 6063 T6', qty: 1, executionType: 'Production Control', action: 'MO Issue', refNo: 'MO/00529', status: 'Done', responsible: 'Ahmed Ramadan' },
  { id: '3', axis: 'X Axis', itemNo: 1, erpCode: 'RM-02910', partName: 'X-BEAM (Machined)', partNo: 'LR200-01-0P-R00-00001-01', category: 'Internal Manufacturing', material: 'Aluminum 6063 T6', qty: 1, executionType: 'Production Control', action: 'Item Data Folder', refNo: '', status: 'Done', responsible: 'Ahmed Ramadan' },
  { id: '4', axis: 'X Axis', itemNo: 1, erpCode: 'RM-02910', partName: 'X-BEAM (Machined)', partNo: 'LR200-01-0P-R00-00001-01', category: 'Internal Manufacturing', material: 'Aluminum 6063 T6', qty: 1, executionType: 'Production Control', action: 'Job Order Issue', refNo: 'OBM-17-12-25', status: 'Done', responsible: 'Ahmed Ramadan' },
  { id: '5', axis: 'X Axis', itemNo: 1, erpCode: 'RM-02910', partName: 'X-BEAM (Machined)', partNo: 'LR200-01-0P-R00-00001-01', category: 'Internal Manufacturing', material: 'Aluminum 6063 T6', qty: 1, executionType: 'Internal Manufacturing', action: 'Machining', refNo: '', status: 'Done', responsible: 'Ahmed Musaad' },
  { id: '6', axis: 'X Axis', itemNo: 1, erpCode: 'RM-02910', partName: 'X-BEAM (Machined)', partNo: 'LR200-01-0P-R00-00001-01', category: 'Internal Manufacturing', material: 'Aluminum 6063 T6', qty: 1, executionType: 'Manual Operations', action: 'Threading', refNo: '', status: 'Done', responsible: 'Ahmed Musaad' },
  { id: '7', axis: 'X Axis', itemNo: 1, erpCode: 'RM-02910', partName: 'X-BEAM (Machined)', partNo: 'LR200-01-0P-R00-00001-01', category: 'Internal Manufacturing', material: 'Aluminum 6063 T6', qty: 1, executionType: 'Assembly Operations', action: 'Assembling', refNo: '', status: 'Done', responsible: 'Technician' },
  { id: '8', axis: 'X Axis', itemNo: 1, erpCode: 'RM-02910', partName: 'X-BEAM (Machined)', partNo: 'LR200-01-0P-R00-00001-01', category: 'Internal Manufacturing', material: 'Aluminum 6063 T6', qty: 1, executionType: 'Production Control', action: 'Service Request (Coating)', refNo: 'PO/', status: 'Done', responsible: 'Ahmed Ramadan' },
  { id: '9', axis: 'X Axis', itemNo: 2, erpCode: 'RM-01215', partName: 'X beam cover', partNo: 'LR340/01-X1-002', category: 'Manufacturing Part', material: 'Steel 37 Sheet Metal', qty: 2, executionType: 'Purchasing', action: 'Purchase Order', refNo: 'PO/', status: 'In Progress', responsible: 'Purchasing Team' },
  { id: '10', axis: 'Y Axis', itemNo: 3, erpCode: 'RM-02296', partName: 'Y-beam', partNo: 'LR340/01-Y1-001', category: 'Manufacturing Part', material: 'Steel M201', qty: 1, executionType: 'Production Control', action: 'MO Issue', refNo: 'MO/', status: 'In Progress', responsible: 'Ahmed Ramadan' },
  { id: '11', axis: 'Z Axis', itemNo: 4, erpCode: 'RM-00800', partName: 'Z Motor AM8052-0L11', partNo: 'AM8052-0L11', category: 'Standard FG', material: 'Electrical Assembly', qty: 1, executionType: 'Purchasing', action: 'Purchase Order', refNo: 'PO/', status: 'Pending', responsible: 'Purchasing Team' },
  { id: '12', axis: 'Z Axis', itemNo: 5, erpCode: 'RM-00801', partName: 'Z Axis Gearbox', partNo: 'AG3210-+NP025S-MF1-10-1G1', category: 'Standard FG', material: 'Mechanical Assembly', qty: 1, executionType: 'Purchasing', action: 'Purchase Order', refNo: 'PO/', status: 'Pending', responsible: 'Purchasing Team' },
]

export const assemblySteps = [
  {
    sheet: 1,
    title: 'X Axis Rail Screwing',
    description: 'Secure linear guide rails to the frame using appropriate screws, ensuring proper alignment and torque specifications.',
    estimatedHours: 2,
    tools: ['Allen Key Set'],
    torqueStandard: 'Follow ISO 6789-1',
    items: [
      { no: 1, description: 'X-BEAM', partNo: 'LR340/01-X1-001', rmCode: 'RM-00323', qty: 1 },
      { no: 3, description: '300C-GUIDE RAIL ASSY TRH30 FE', partNo: 'TRH30FE', rmCode: 'RM-00875', qty: 2 },
      { no: 4, description: 'Bolt Cap', partNo: 'EN ISO 4762 M8x25', rmCode: 'RM-00105', qty: 100 },
    ],
    issuedBy: 'Eng. Ahmad Essameldin',
    approvedBy: 'Eng. Alaa Saad',
    date: '6/1/2025',
  },
  {
    sheet: 2,
    title: 'Alignment Adjustment',
    description: 'Adjust linear and rotational alignment of assemblies such as rails, pulleys, and joints to ensure smooth operation.',
    estimatedHours: 1,
    tools: ['Allen Key Set', 'Screwdriver'],
    torqueStandard: 'Follow ISO 6789-1',
    items: [
      { no: 1, description: 'X-guide wedge', partNo: 'LRGN0/01-X1-002', rmCode: 'RM-01314', qty: 10 },
      { no: 2, description: 'Socket Head Screw M5x16-16N', partNo: 'ISO 4762', rmCode: 'RM-00583', qty: 30 },
    ],
    issuedBy: 'Eng. Ahmad Essameldin',
    approvedBy: 'Eng. Alaa Saad',
    date: '6/1/2025',
  },
  {
    sheet: 3,
    title: 'Rack Screwing',
    description: 'Secure Rack to the frame using appropriate screws, ensuring proper alignment and torque specifications.',
    estimatedHours: 1.5,
    tools: ['Vernier Caliper', 'Allen Key Set'],
    torqueStandard: 'Follow ISO 6789-1',
    items: [
      { no: 2, description: 'GEARED RACK-M1.5 x 100LG', partNo: 'LRGN0/01-X1-003', rmCode: 'RM-00030', qty: 3 },
      { no: 4, description: 'Socket Head Screw M6x25-24N', partNo: 'EN ISO 4762 M6x25', rmCode: 'N/A', qty: 34 },
      { no: 6, description: 'GEARED RACK-M1.5 x 100LG', partNo: 'LR220/01-X1-006', rmCode: 'RM-00030', qty: 1 },
    ],
    issuedBy: 'Eng. Ahmad Essameldin',
    approvedBy: 'Eng. Alaa Saad',
    date: '6/1/2025',
  },
  {
    sheet: 4,
    title: 'Stoppers / Homing Cam Assembly',
    description: 'Attach supporting or structural brackets (Stoppers) to main frames or subassemblies using bolts, ensuring squareness and torque specs.',
    estimatedHours: 0.75,
    tools: ['Allen Key Set'],
    torqueStandard: 'Follow ISO 6789-1',
    items: [
      { no: 5, description: 'Socket Head Screw M5x30-30N', partNo: 'ISO 4762', rmCode: 'RM-00578', qty: 2 },
      { no: 6, description: 'Socket Head Screw M10x1x20-20N', partNo: 'DIN 912 M10x1x20', rmCode: 'RM-01242', qty: 8 },
      { no: 9, description: 'HOMING CAM', partNo: 'LRGN0/01-X1-004', rmCode: 'RM-02088', qty: 1 },
      { no: 10, description: 'X stopper', partNo: 'LRGN0/01-X1-001', rmCode: 'RM-02424', qty: 4 },
      { no: 11, description: 'Rubber Stopper', partNo: 'Rubber M8', rmCode: 'RM-01174', qty: 4 },
    ],
    issuedBy: 'Eng. Ahmad Essameldin',
    approvedBy: 'Eng. Alaa Saad',
    date: '6/1/2025',
  },
]

export const kpiData = [
  { name: 'On-Time Delivery', target: 95, actual: 88, unit: '%', trend: 'up' },
  { name: 'BOM Accuracy', target: 98, actual: 96, unit: '%', trend: 'stable' },
  { name: 'JO Completion Rate', target: 90, actual: 84, unit: '%', trend: 'up' },
  { name: 'Purchasing On-Time', target: 85, actual: 79, unit: '%', trend: 'down' },
  { name: 'External Op Return', target: 90, actual: 91, unit: '%', trend: 'up' },
  { name: 'Scrap & Rework Rate', target: 2, actual: 1.3, unit: '%', trend: 'up', inverse: true },
  { name: 'ERP Data Quality', target: 95, actual: 93, unit: '%', trend: 'stable' },
  { name: 'Open ECO Age (avg)', target: 14, actual: 9, unit: 'd', trend: 'up', inverse: true },
]

export const weeklyKpiChart = [
  { week: 'W1', delivery: 82, bom: 95, jo: 80, purchasing: 75 },
  { week: 'W2', delivery: 85, bom: 96, jo: 82, purchasing: 77 },
  { week: 'W3', delivery: 87, bom: 97, jo: 84, purchasing: 78 },
  { week: 'W4', delivery: 88, bom: 96, jo: 84, purchasing: 79 },
]
