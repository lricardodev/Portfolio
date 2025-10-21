// components/portfolio/ProjectCard.tsx
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Github, ExternalLink, Eye } from 'lucide-react';

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.6, rotateX: -25, rotateY: -15 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 12,
      duration: 0.8
    } 
  },
};

const hoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: 5,
    rotateY: 5,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      duration: 0.3
    }
  }
};

export const ProjectCard = ({ icon, title, description, tags, liveUrl, githubUrl, image, index }) => (
  <Dialog>
    <DialogTrigger asChild>
      <motion.div 
        variants={cardVariants}
        whileHover="hover"
        variants={hoverVariants}
        className="group cursor-pointer"
      >
        <Card className="h-full project-card glass-morphism hover-neon-subtle transition-all duration-500 overflow-hidden">
          {/* Imagen del proyecto */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
            <div className="absolute top-4 right-4 text-4xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              {icon}
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="flex space-x-2">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.8, type: 'spring' }}
                  whileHover={{ scale: 1.2, rotate: 10, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="glass-morphism hover-neon-subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(liveUrl, '_blank');
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.8, type: 'spring' }}
                  whileHover={{ scale: 1.2, rotate: -10, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass-morphism hover-neon-subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(githubUrl, '_blank');
                    }}
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Código
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              <span className="text-2xl">{icon}</span>
              <span>{title}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map(tag => (
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
                className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium"
              >
                <Eye className="w-4 h-4 mr-1" />
                Ver detalles
              </motion.div>
              
              <div className="flex space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="hover-neon-subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(liveUrl, '_blank');
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="hover-neon-subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(githubUrl, '_blank');
                    }}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </motion.div>
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
        {/* Imagen del proyecto */}
        <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
          <div className="absolute top-4 right-4 text-6xl opacity-60">
            {icon}
          </div>
        </div>

        {/* Tecnologías */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-slate-700 dark:text-slate-300">
            Tecnologías Utilizadas
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge 
                key={tag} 
                className="skill-badge px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-4">
          <Button 
            asChild 
            className="btn-primary-gradient hover-lift flex-1"
          >
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4"/>
              Ver Demo
            </a>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className="btn-neon-outline hover-lift flex-1"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4"/>
              Código Fuente
            </a>
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);