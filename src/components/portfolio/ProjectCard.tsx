import { motion } from "framer-motion";
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

type ProjectCardProps = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  index: number;
};

type ActionButtonProps = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
};

type AnimatedButtonProps = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  delay?: number;
};

const AnimatedButton = ({
  href,
  icon: Icon,
  children,
  variant = "secondary",
  delay = 0,
}: AnimatedButtonProps) => (
  <motion.div
    initial={{ scale: 0, rotate: variant === "secondary" ? -180 : 180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    whileHover={{
      scale: 1.2,
      rotate: variant === "secondary" ? 10 : -10,
      y: -3,
    }}
    whileTap={{ scale: 0.9 }}
  >
    <Button
      size="sm"
      variant={variant}
      className="glass-morphism hover-neon-subtle"
      onClick={(e) => {
        e.stopPropagation();
        window.open(href, "_blank");
      }}
    >
      <Icon className="w-4 h-4 mr-1" />
      {children}
    </Button>
  </motion.div>
);

const ProjectImage = ({
  icon,
  children,
}: {
  icon: string;
  children?: React.ReactNode;
}) => (
  <div className="relative h-48 bg-gradient-to-br from-kick-green/10 to-kick-green-dark/10 dark:from-kick-green/20 dark:to-kick-green-dark/20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-kick-green/20 to-kick-green-dark/20" />
    <div className="absolute top-4 right-4 text-4xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
      {icon}
    </div>
    {children}
  </div>
);

const ActionButton = ({ href, icon: Icon, onClick }: ActionButtonProps) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    <Button
      size="sm"
      variant="ghost"
      className="hover-neon-subtle"
      onClick={(e) => {
        e.stopPropagation();
        onClick ? onClick() : window.open(href, "_blank");
      }}
    >
      <Icon className="w-4 h-4" />
    </Button>
  </motion.div>
);

export const ProjectCard = ({
  icon,
  title,
  description,
  tags,
  liveUrl,
  githubUrl,
  index,
}: ProjectCardProps) => {
  const openUrl = (url: string) => () => window.open(url, "_blank");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{
            y: 50,
            opacity: 0,
            scale: 0.6,
            rotateX: -25,
            rotateY: -15,
          }}
          animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 12,
            duration: 0.8,
          }}
          whileHover={{ y: -8, scale: 1.02, rotateX: 5, rotateY: 5 }}
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
                  Código
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

              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-sm text-kick-green dark:text-kick-green-light font-medium"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Ver detalles
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
              Tecnologías Utilizadas
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
                Ver Demo
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="btn-neon-outline hover-lift flex-1"
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Código Fuente
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
