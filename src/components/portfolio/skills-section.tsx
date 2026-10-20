import type { Skill } from '@/types';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) {
    return null;
  }

  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                {category}
              </h3>
              <div className="space-y-2">
                {grouped[category].map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card/80 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                    {skill.proficiency_label && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {skill.proficiency_label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
