import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  title: string;
  description: string;
  skills: string[];
  icon?: React.ReactNode;
  gradientFrom?: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export function Project3DCard({
  title,
  description,
  skills,
  icon,
  gradientFrom = "from-primary/20",
  actionText = "Explore Stack",
  onActionClick,
  className,
}: SkillCardProps) {
  return (
    <CardContainer className="inter-var w-full">
      <CardBody
        className={cn(
          "bg-gray-50 relative group/card",
          "dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]",
          "dark:bg-black dark:border-white/[0.2] border-black/[0.1]",
          "w-auto sm:w-[22rem] h-auto rounded-xl p-6 border",
          className
        )}
      >
        {/* Title — translateZ 50 */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white flex items-center gap-3"
        >
          {icon}
          {title}
        </CardItem>

        {/* Description — translateZ 60 */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>

        {/* Visual / Skill Pills block — translateZ 100 */}
        <CardItem translateZ="100" className="w-full mt-4">
          <div
            className={cn(
              "h-40 w-full rounded-xl flex flex-wrap items-center justify-center gap-2 p-4",
              "bg-gradient-to-br border border-white/10",
              "relative overflow-hidden",
              gradientFrom,
              "to-transparent"
            )}
          >
            {/* Subtle radial highlight */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
            {skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-white/10 border border-white/15 rounded-full text-[11px] font-semibold text-white/90 backdrop-blur-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardItem>

        {/* Footer — both items translateZ 20, matching demo exactly */}
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as="a"
            href="#contact"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white text-neutral-600 hover:underline cursor-pointer"
          >
            Get in touch →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            onClick={onActionClick}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity"
          >
            {actionText}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
