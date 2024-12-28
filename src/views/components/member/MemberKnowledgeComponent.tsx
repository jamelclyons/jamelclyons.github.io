import React, { useEffect, useRef } from 'react';
import IconComponent from '../IconComponent';
import Taxonomy from '../../../model/Taxonomy';

interface MemberKnowledgeProps {
  languages: Array<Taxonomy>;
  frameworks: Array<Taxonomy>;
  technologies: Array<Taxonomy>;
}

const MemberKnowledgeComponent: React.FC<MemberKnowledgeProps> = ({
  languages,
  frameworks,
  technologies
}) => {
  const knowledge = [...languages, ...frameworks, ...technologies];

  const skillsSlideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const skillsSlide = skillsSlideRef.current;

    if (skillsSlide) {
      const totalSkills = skillsSlide.children.length;

      if (skillsSlide.dataset.cloned) {

        for (let i = 0; i < totalSkills; i++) {
          const clonedNode = skillsSlide.children[i].cloneNode(true);
          skillsSlide.appendChild(clonedNode);
        }

        skillsSlide.dataset.cloned = "true";
        document.documentElement.style.setProperty("--total-skills", `${totalSkills}`);
      }
    }
  }, [knowledge]);

  return (
    <>
      <div className="author-knowledge">
        <div className="author-knowledge-slide" ref={skillsSlideRef}>
          {Array.isArray(knowledge) &&
            knowledge.length > 0 &&
            knowledge.map((knowledge: Taxonomy) => (
              <IconComponent image={knowledge.image} />
            ))}
        </div>
      </div>
    </>
  );
};

export default MemberKnowledgeComponent;