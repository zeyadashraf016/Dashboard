import { Award, Star } from 'lucide-react';

interface SkillLevel {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'none';
  label: string;
}

interface TechnicianSkills {
  name: string;
  skills: {
    welding: SkillLevel['level'];
    assembly: SkillLevel['level'];
    hydraulics: SkillLevel['level'];
    electrical: SkillLevel['level'];
    quality: SkillLevel['level'];
    cnc: SkillLevel['level'];
  };
}

const skillLevels: Record<SkillLevel['level'], { label: string; color: string; stars: number }> = {
  none: { label: 'None', color: 'bg-gray-200 text-gray-600', stars: 0 },
  beginner: { label: 'Beginner', color: 'bg-red-100 text-red-700', stars: 1 },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-700', stars: 2 },
  advanced: { label: 'Advanced', color: 'bg-blue-100 text-blue-700', stars: 3 },
  expert: { label: 'Expert', color: 'bg-green-100 text-green-700', stars: 4 }
};

const technicians: TechnicianSkills[] = [
  {
    name: 'Magdy',
    skills: {
      welding: 'expert',
      assembly: 'advanced',
      hydraulics: 'intermediate',
      electrical: 'intermediate',
      quality: 'advanced',
      cnc: 'beginner'
    }
  },
  {
    name: 'Abo Kareem',
    skills: {
      welding: 'advanced',
      assembly: 'expert',
      hydraulics: 'advanced',
      electrical: 'beginner',
      quality: 'intermediate',
      cnc: 'intermediate'
    }
  },
  {
    name: 'Mohamed Elsayedi',
    skills: {
      welding: 'intermediate',
      assembly: 'advanced',
      hydraulics: 'expert',
      electrical: 'advanced',
      quality: 'advanced',
      cnc: 'none'
    }
  },
  {
    name: 'Ahmed Hassan',
    skills: {
      welding: 'beginner',
      assembly: 'intermediate',
      hydraulics: 'intermediate',
      electrical: 'expert',
      quality: 'intermediate',
      cnc: 'advanced'
    }
  },
  {
    name: 'Khaled Ibrahim',
    skills: {
      welding: 'intermediate',
      assembly: 'intermediate',
      hydraulics: 'beginner',
      electrical: 'advanced',
      quality: 'expert',
      cnc: 'expert'
    }
  }
];

const skillNames: { key: keyof TechnicianSkills['skills']; label: string }[] = [
  { key: 'welding', label: 'Welding' },
  { key: 'assembly', label: 'Assembly' },
  { key: 'hydraulics', label: 'Hydraulics' },
  { key: 'electrical', label: 'Electrical' },
  { key: 'quality', label: 'Quality Control' },
  { key: 'cnc', label: 'CNC Operation' }
];

export function SkillMatrix() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-6 h-6 text-primary" />
        <h2>Technician Skill Matrix</h2>
      </div>

      <div className="mb-6 flex gap-4 items-center flex-wrap">
        <span className="text-sm">Legend:</span>
        {Object.entries(skillLevels).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded text-xs ${config.color}`}>
              {config.label}
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < config.stars ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left p-4 bg-primary text-primary-foreground sticky left-0 z-10">Technician</th>
              {skillNames.map(skill => (
                <th key={skill.key} className="text-center p-4 bg-muted min-w-[140px]">
                  {skill.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {technicians.map(tech => (
              <tr key={tech.name} className="border-b border-border hover:bg-muted/50">
                <td className="p-4 bg-card sticky left-0 z-10 border-r-2 border-border">
                  {tech.name}
                </td>
                {skillNames.map(skill => {
                  const level = tech.skills[skill.key];
                  const config = skillLevels[level];
                  return (
                    <td key={skill.key} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`px-3 py-1 rounded text-sm w-full ${config.color}`}>
                          {config.label}
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < config.stars ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
