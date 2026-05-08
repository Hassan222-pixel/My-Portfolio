// app/admin/projects/page.tsx
"use client";

import { useEffect, useState } from "react";

// Define the shape of our data based on the Mongoose model
interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from our MongoDB API route
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const result = await response.json();
        if (result.success) {
          setProjects(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-textMain">Projects</h1>
          <p className="text-textDim mt-1">
            Manage and organize your portfolio projects.
          </p>
        </div>
        <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Add New Project
        </button>
      </div>

      {/* Data Table Section */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-border text-textDim text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Project Name</th>
                <th className="p-4 font-medium">Technologies</th>
                <th className="p-4 font-medium">Links</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-textDim">
                    Loading projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-textDim">
                    No projects found. Click "Add New Project" to get started!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project._id}
                    className="hover:bg-background/50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-semibold text-textMain">
                        {project.title}
                      </p>
                      <p className="text-sm text-textDim truncate max-w-xs">
                        {project.description}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-background border border-border text-xs rounded-md text-textMain"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 space-x-3 text-sm">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          Live Site
                        </a>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button className="text-textDim hover:text-primary transition-colors text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-textDim hover:text-danger transition-colors text-sm font-medium">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
