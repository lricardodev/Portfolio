import { motion, MotionProps, Transition } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Github, ExternalLink, Eye } from "lucide-react";
import { memo } from "react";

// Types
export interface ProjectCardProps {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  index: number;
}

interface ButtonProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  delay?: number;
}

interface ActionButtonProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

interface CardAnimation extends MotionProps {
  transition: Transition & { delay: number };
}

interface ButtonAnimation extends MotionProps {
  transition: Transition & { delay: number };
}

interface AnimationConfig {
  card: (index: number) => CardAnimation;
  button: (variant: string, delay: number) => ButtonAnimation;
}

const ANIMATION_CONFIG: AnimationConfig = {
  card: (index: number) => ({
    initial: { y: 50, opacity: 0, scale: 0.6, rotateX: -25, rotateY: -15 },
    animate: { y: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0 },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: index * 0.1,
    },
    whileHover: { y: -8, scale: 1.02, rotateX: 5, rotateY: 5 },
  }),
  button: (variant: string, delay: number) => ({
    initial: { scale: 0, rotate: variant === "secondary" ? -180 : 180 },
    animate: { scale: 1, rotate: 0 },
    transition: { delay, duration: 0.8, type: "spring" },
    whileHover: {
      scale: 1.2,
      rotate: variant === "secondary" ? 10 : -10,
      y: -3,
    },
    whileTap: { scale: 0.9 },
  }),
};

// Custom hook for URL handling
const useOpenUrl = (url: string) => {
  return (e?: React.MouseEvent) => {
    e?.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };
};

// Animated button component
const AnimatedButton = memo(
  ({
    href,
    icon: Icon,
    children,
    variant = "secondary",
    delay = 0,
  }: ButtonProps) => {
    const handleClick = useOpenUrl(href);

    return (
      <motion.div {...ANIMATION_CONFIG.button(variant, delay)}>
        <Button
          size="sm"
          variant={variant}
          className="glass-morphism hover-neon-subtle"
          onClick={handleClick}
        >
          <Icon className="w-4 h-4 mr-1" />
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

// Project image component
const ProjectImage = memo(
  ({ icon, children }: { icon: string; children?: React.ReactNode }) => (
    <div className="relative h-48 bg-gradient-to-br from-kick-green/10 to-kick-green-dark/10 dark:from-kick-green/20 dark:to-kick-green-dark/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-kick-green/20 to-kick-green-dark/20" />
      <div className="absolute top-4 right-4 text-4xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        {icon}
      </div>
      {children}
    </div>
  )
);

ProjectImage.displayName = "ProjectImage";

// Action button component
const ActionButton = memo(
  ({ href, icon: Icon, onClick }: ActionButtonProps) => {
    const defaultHandler = useOpenUrl(href);

    return (
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="sm"
          variant="ghost"
          className="hover-neon-subtle"
          onClick={onClick || defaultHandler}
        >
          <Icon className="w-4 h-4" />
        </Button>
      </motion.div>
    );
  }
);

ActionButton.displayName = "ActionButton";

// Tag list component
const TagList = memo(({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {tags.map((tag) => (
      <Badge
        key={tag}
        variant="secondary"
        className="skill-badge text-xs px-2 py-1"
      >
        {tag}
      </Badge>
    ))}
  </div>
));

TagList.displayName = "TagList";

// Dialog content component
const DialogProjectContent = memo(
  ({
    icon,
    title,
    description,
    tags,
    liveUrl,
    githubUrl,
  }: Omit<ProjectCardProps, "image" | "index">) => (
    <>
      <DialogHeader>
        <DialogTitle className="text-3xl flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          {title}
        </DialogTitle>
        <DialogDescription className="pt-4 text-lg leading-relaxed">
          {description}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="relative h-64 bg-gradient-to-br from-kick-green/10 to-kick-green-dark/10 dark:from-kick-green/20 dark:to-kick-green-dark/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-kick-green/20 to-kick-green-dark/20" />
          <div className="absolute top-4 right-4 text-6xl opacity-60">
            {icon}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3 text-slate-700 dark:text-slate-300">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} className="skill-badge px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button asChild className="btn-primary-gradient hover-lift flex-1">
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Demo
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="btn-neon-outline hover-lift flex-1"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </a>
          </Button>
        </div>
      </div>
    </>
  )
);

DialogProjectContent.displayName = "DialogProjectContent";

// Main component
export const ProjectCard = memo(
  ({
    icon,
    title,
    description,
    tags,
    liveUrl,
    githubUrl,
    index,
  }: ProjectCardProps) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <motion.div
            {...ANIMATION_CONFIG.card(index)}
            className="group cursor-pointer"
          >
            <Card className="h-full project-card glass-morphism hover-neon-subtle transition-all duration-500 overflow-hidden">
              <ProjectImage icon={icon}>
                <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                  <AnimatedButton
                    href={liveUrl}
                    icon={ExternalLink}
                    delay={0.2 + index * 0.1}
                  >
                    Demo
                  </AnimatedButton>
                  <AnimatedButton
                    href={githubUrl}
                    icon={Github}
                    variant="outline"
                    delay={0.3 + index * 0.1}
                  >
                    Code
                  </AnimatedButton>
                </div>
              </ProjectImage>

              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-xl group-hover:text-kick-green dark:group-hover:text-kick-green-light transition-colors duration-300">
                  <span className="text-2xl">{icon}</span>
                  <span>{title}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {description}
                </p>

                <TagList tags={tags} />

                <div className="flex items-center justify-between">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-sm text-kick-green dark:text-kick-green-light font-medium"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </motion.div>

                  <div className="flex space-x-2">
                    <ActionButton href={liveUrl} icon={ExternalLink} />
                    <ActionButton href={githubUrl} icon={Github} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </DialogTrigger>

        <DialogContent className="max-w-3xl glass-morphism">
          <DialogProjectContent
            icon={icon}
            title={title}
            description={description}
            tags={tags}
            liveUrl={liveUrl}
            githubUrl={githubUrl}
          />
        </DialogContent>
      </Dialog>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
