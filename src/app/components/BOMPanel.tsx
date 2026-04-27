import { useState } from 'react';
import { Package, CheckSquare, Square, AlertCircle } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  partNumber: string;
  quantity: number;
  unit: string;
  available: boolean;
}

interface BOMPanelProps {
  taskId: string | null;
  onMaterialsConfirmed: () => void;
  materialsConfirmed: boolean;
}

const mockBOM: { [key: string]: Material[] } = {
  '1': [
    { id: 'm1', name: 'Steel Beam - 2m', partNumber: 'SB-2000-A', quantity: 4, unit: 'pcs', available: false },
    { id: 'm2', name: 'Mounting Bracket Set', partNumber: 'MB-401', quantity: 8, unit: 'sets', available: false },
    { id: 'm3', name: 'M12 Bolt Kit', partNumber: 'BK-M12-100', quantity: 32, unit: 'pcs', available: false },
    { id: 'm4', name: 'Steel Plate 500x500mm', partNumber: 'SP-500', quantity: 2, unit: 'pcs', available: false },
    { id: 'm5', name: 'Welding Rod ER70S-6', partNumber: 'WR-70S6', quantity: 5, unit: 'kg', available: false }
  ],
  '2': [
    { id: 'm6', name: 'Frame Base Section A', partNumber: 'FBS-A-200', quantity: 2, unit: 'pcs', available: false },
    { id: 'm7', name: 'Frame Base Section B', partNumber: 'FBS-B-200', quantity: 2, unit: 'pcs', available: false },
    { id: 'm8', name: 'Welding Rod ER70S-6', partNumber: 'WR-70S6', quantity: 8, unit: 'kg', available: false }
  ]
};

export function BOMPanel({ taskId, onMaterialsConfirmed, materialsConfirmed }: BOMPanelProps) {
  const [checkedMaterials, setCheckedMaterials] = useState<string[]>([]);

  const materials = taskId ? mockBOM[taskId] || [] : [];
  const allChecked = materials.length > 0 && checkedMaterials.length === materials.length;

  const toggleMaterial = (materialId: string) => {
    setCheckedMaterials(prev =>
      prev.includes(materialId)
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const handleConfirm = () => {
    if (allChecked) {
      onMaterialsConfirmed();
    }
  };

  if (!taskId) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-6 h-6 text-muted-foreground" />
          <h3 className="text-muted-foreground">Bill of Materials (BOM)</h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Select a task to view required materials</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-primary" />
          <h3>Bill of Materials (BOM)</h3>
        </div>
        {materialsConfirmed && (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            Confirmed
          </span>
        )}
      </div>

      {!materialsConfirmed && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-orange-700">
            Verify all materials are available before confirming
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 text-sm text-muted-foreground">✓</th>
              <th className="text-left p-3 text-sm text-muted-foreground">Part Number</th>
              <th className="text-left p-3 text-sm text-muted-foreground">Material Name</th>
              <th className="text-left p-3 text-sm text-muted-foreground">Quantity</th>
              <th className="text-left p-3 text-sm text-muted-foreground">Unit</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(material => (
              <tr key={material.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                <td className="p-3">
                  <button
                    onClick={() => !materialsConfirmed && toggleMaterial(material.id)}
                    disabled={materialsConfirmed}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkedMaterials.includes(material.id) ? (
                      <CheckSquare className="w-6 h-6 text-green-600" />
                    ) : (
                      <Square className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>
                </td>
                <td className="p-3">
                  <code className="text-sm bg-muted px-2 py-1 rounded">{material.partNumber}</code>
                </td>
                <td className="p-3">{material.name}</td>
                <td className="p-3">{material.quantity}</td>
                <td className="p-3 text-muted-foreground">{material.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!materialsConfirmed && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {checkedMaterials.length} of {materials.length} materials verified
          </div>
          <button
            onClick={handleConfirm}
            disabled={!allChecked}
            className={`px-6 py-3 rounded-lg transition-all ${
              allChecked
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Confirm All Materials Available
          </button>
        </div>
      )}
    </div>
  );
}
