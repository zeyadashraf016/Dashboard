import { useState } from 'react';
import { Package, CheckSquare, Square, AlertTriangle, XCircle } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  partNumber: string;
  required: number;
  unit: string;
}

interface MaterialStatus {
  available: boolean;
  missing: number;
  blocker: string;
}

interface EnhancedBOMPanelProps {
  taskId: string | null;
  onValidationChange: (isValid: boolean) => void;
}

const mockBOM: { [key: string]: Material[] } = {
  '1': [
    { id: 'm1', name: 'Steel Beam - 2m', partNumber: 'SB-2000-A', required: 4, unit: 'pcs' },
    { id: 'm2', name: 'Mounting Bracket Set', partNumber: 'MB-401', required: 8, unit: 'sets' },
    { id: 'm3', name: 'M12 Bolt Kit', partNumber: 'BK-M12-100', required: 32, unit: 'pcs' },
    { id: 'm4', name: 'Steel Plate 500x500mm', partNumber: 'SP-500', required: 2, unit: 'pcs' },
    { id: 'm5', name: 'Welding Rod ER70S-6', partNumber: 'WR-70S6', required: 5, unit: 'kg' }
  ],
  '2': [
    { id: 'm6', name: 'Frame Base Section A', partNumber: 'FBS-A-200', required: 2, unit: 'pcs' },
    { id: 'm7', name: 'Frame Base Section B', partNumber: 'FBS-B-200', required: 2, unit: 'pcs' },
    { id: 'm8', name: 'Welding Rod ER70S-6', partNumber: 'WR-70S6', required: 8, unit: 'kg' }
  ]
};

export function EnhancedBOMPanel({ taskId, onValidationChange }: EnhancedBOMPanelProps) {
  const [materialStatus, setMaterialStatus] = useState<{ [key: string]: MaterialStatus }>({});

  const materials = taskId ? mockBOM[taskId] || [] : [];

  const toggleAvailability = (materialId: string) => {
    setMaterialStatus(prev => {
      const current = prev[materialId] || { available: false, missing: 0, blocker: '' };
      const newStatus = {
        ...prev,
        [materialId]: { ...current, available: !current.available, missing: current.available ? 0 : current.missing }
      };

      const allAvailable = materials.every(m => newStatus[m.id]?.available === true);
      onValidationChange(allAvailable);

      return newStatus;
    });
  };

  const updateMissing = (materialId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setMaterialStatus(prev => ({
      ...prev,
      [materialId]: { ...(prev[materialId] || { available: false, missing: 0, blocker: '' }), missing: numValue }
    }));
  };

  const updateBlocker = (materialId: string, value: string) => {
    setMaterialStatus(prev => ({
      ...prev,
      [materialId]: { ...(prev[materialId] || { available: false, missing: 0, blocker: '' }), blocker: value }
    }));
  };

  const allAvailable = materials.length > 0 && materials.every(m => materialStatus[m.id]?.available === true);
  const hasMissing = materials.some(m => materialStatus[m.id]?.available === false);

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
    <div className="bg-card border-2 border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-primary" />
          <h3>Bill of Materials Validation</h3>
        </div>
        {allAvailable && (
          <div className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
            <CheckSquare className="w-5 h-5" />
            All Materials Available
          </div>
        )}
        {hasMissing && !allAvailable && (
          <div className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Missing Materials
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left p-3 bg-muted">Available</th>
              <th className="text-left p-3 bg-muted">Part Number</th>
              <th className="text-left p-3 bg-muted">Material Name</th>
              <th className="text-left p-3 bg-muted">Required</th>
              <th className="text-left p-3 bg-muted">Missing Qty</th>
              <th className="text-left p-3 bg-muted">Blocker / Issue</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(material => {
              const status = materialStatus[material.id] || { available: false, missing: 0, blocker: '' };
              const rowClass = status.available
                ? 'bg-green-50 border-l-4 border-l-green-600'
                : 'bg-red-50 border-l-4 border-l-red-600';

              return (
                <tr key={material.id} className={`border-b border-border ${rowClass}`}>
                  <td className="p-3">
                    <button
                      onClick={() => toggleAvailability(material.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      {status.available ? (
                        <CheckSquare className="w-7 h-7 text-green-600" />
                      ) : (
                        <Square className="w-7 h-7 text-red-600" />
                      )}
                    </button>
                  </td>
                  <td className="p-3">
                    <code className="text-sm bg-muted px-2 py-1 rounded font-mono">{material.partNumber}</code>
                  </td>
                  <td className="p-3">{material.name}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                      {material.required} {material.unit}
                    </span>
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      disabled={status.available}
                      value={status.available ? 0 : status.missing}
                      onChange={(e) => updateMissing(material.id, e.target.value)}
                      className="w-24 px-3 py-2 border-2 border-border rounded-lg disabled:bg-muted disabled:text-muted-foreground"
                      placeholder="0"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      disabled={status.available}
                      value={status.blocker}
                      onChange={(e) => updateBlocker(material.id, e.target.value)}
                      className="w-full px-3 py-2 border-2 border-border rounded-lg disabled:bg-muted disabled:text-muted-foreground"
                      placeholder={status.available ? "N/A" : "Enter issue..."}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hasMissing && !allAvailable && (
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-600 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-red-900 mb-1">Materials Not Available</h4>
            <p className="text-red-700">
              All materials must be marked as available before assembly can begin. Please resolve missing items or blockers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
