import { useState } from 'react';
import { Users, X, ChevronDown } from 'lucide-react';

interface Technician {
  id: string;
  name: string;
  avatar: string;
}

const availableTechnicians: Technician[] = [
  { id: '1', name: 'Magdy', avatar: 'M' },
  { id: '2', name: 'Abo Kareem', avatar: 'AK' },
  { id: '3', name: 'Mohamed Elsayedi', avatar: 'ME' },
  { id: '4', name: 'Ahmed Hassan', avatar: 'AH' },
  { id: '5', name: 'Khaled Ibrahim', avatar: 'KI' }
];

interface TechnicianAssignmentProps {
  selectedTechnicians: Technician[];
  onTechniciansChange: (technicians: Technician[]) => void;
}

export function TechnicianAssignment({ selectedTechnicians, onTechniciansChange }: TechnicianAssignmentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTechnician = (tech: Technician) => {
    const isSelected = selectedTechnicians.some(t => t.id === tech.id);
    if (isSelected) {
      onTechniciansChange(selectedTechnicians.filter(t => t.id !== tech.id));
    } else {
      onTechniciansChange([...selectedTechnicians, tech]);
    }
  };

  const removeTechnician = (techId: string) => {
    onTechniciansChange(selectedTechnicians.filter(t => t.id !== techId));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-6 h-6 text-primary" />
        <h3>Technician Assignment</h3>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-input-background rounded-lg hover:bg-muted transition-all min-h-[56px]"
        >
          <span className="text-muted-foreground">
            {selectedTechnicians.length === 0 ? 'Select technicians...' : `${selectedTechnicians.length} selected`}
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-10">
            {availableTechnicians.map(tech => {
              const isSelected = selectedTechnicians.some(t => t.id === tech.id);
              return (
                <button
                  key={tech.id}
                  onClick={() => toggleTechnician(tech)}
                  className={`w-full p-4 hover:bg-accent transition-all text-left border-b border-border last:border-b-0 flex items-center gap-3 ${
                    isSelected ? 'bg-accent' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    isSelected ? 'bg-green-600' : 'bg-muted-foreground'
                  }`}>
                    {tech.avatar}
                  </div>
                  <span>{tech.name}</span>
                  {isSelected && (
                    <div className="ml-auto w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedTechnicians.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedTechnicians.map(tech => (
            <div
              key={tech.id}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg"
            >
              <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs">
                {tech.avatar}
              </div>
              <span>{tech.name}</span>
              <button
                onClick={() => removeTechnician(tech.id)}
                className="ml-1 hover:bg-primary-foreground/20 rounded p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export type { Technician };
