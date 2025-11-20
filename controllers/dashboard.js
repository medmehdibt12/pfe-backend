import { Project } from "../models/project.js";
import { Sprint } from "../models/sprint.js";
import { UserStory } from "../models/userStory.js";
import Task from "../models/task.js";
import { Meeting } from "../models/meeting.js";
import { Report } from "../models/report.js";

export const getDashboard = async (req, res, next) => {
  try {
    // Récupérer tous les projets accessibles à l'utilisateur
    const filter =
      req.auth.role === "student" ? { student: req.auth.userId } : {};
    const projects = await Project.find(filter).sort("-createdAt");

    const dashboard = [];

    for (const project of projects) {
      const sprints = await Sprint.find({ project: project._id }).sort(
        "startDate"
      );
      const projectData = {
        projectId: project._id,
        title: project.title,
        sprints: [],
      };

      for (const sprint of sprints) {
        const userStories = await UserStory.find({ sprint: sprint._id });
        let sprintTasks = [];
        for (const us of userStories) {
          const tasks = await Task.find({ userStory: us._id });
          sprintTasks = sprintTasks.concat(tasks);
        }

        const totalTasks = sprintTasks.length;
        const doneTasks = sprintTasks.filter((t) => t.status === "Done").length;
        const standbyTasks = sprintTasks.filter(
          (t) => t.status === "Standby"
        ).length;
        const validationsPending = sprintTasks.filter(
          (t) =>
            t.status === "Done" &&
            (!t.validations || t.validations.length === 0)
        ).length;

        projectData.sprints.push({
          sprintId: sprint._id,
          name: sprint.name,
          percentDone:
            totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0,
          tasksStandby: standbyTasks,
          validationsPending,
          totalTasks,
        });
      }

      // Journal et dernières actions
      const meetings = await Meeting.find({ project: project._id }).sort(
        "-date"
      );
      const reports = await Report.find({ project: project._id }).sort("-date");
      projectData.journal = {
        latestMeetings: meetings.slice(0, 5),
        latestReports: reports.slice(0, 5),
      };

      dashboard.push(projectData);
    }

    res.json({ dashboard });
  } catch (err) {
    next(err);
  }
};
