'use client';

import type { Skill } from '@/types';
import { useI18n } from '@/lib/i18n/context';

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryTranslations: Record<string, string> = {
  'Frontend Fundamentals': 'أساسيات الواجهة الأمامية',
  'Frameworks & Libraries': 'أطر العمل والمكتبات',
  'Styling & UI': 'التصميم وواجهات المستخدم',
  'Tools & Workflow': 'الأدوات وبيئة العمل',
  'Backend & APIs': 'الخلفية وواجهات البرمجة',
  'Other': 'أخرى',
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t, locale } = useI18n();

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
            {t.skills.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const displayCategory =
              locale === 'ar'
                ? categoryTranslations[category] || category
                : category;

            return (
              <div key={category} className="space-y-4">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  {displayCategory}
                </h3>
                <div className="space-y-2">
                  {grouped[category].map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card/80 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <span className="text-sm font-medium">{skill.name}</span>
                      {skill.proficiency_label && (
                        <span className="ms-auto text-xs text-muted-foreground">
                          {skill.proficiency_label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
