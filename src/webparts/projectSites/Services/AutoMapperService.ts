import { ProjectSite } from "../Interfaces/ProjectSite";

export class ProjectSitesMapperService {
    public ProjectSites: Array<ProjectSite> = [];

    constructor(projectSites: any) {
        debugger;
        if(!projectSites || projectSites.length == 0)
            return;
        projectSites.forEach(site => {
            this.ProjectSites.push({
                Id: site.ID,
                Title: site.Title,
                Description: site.Description,
                Url: site.url,
                Country: site.Country,
                Attachement: site.AttachmentFiles.length != 0 ? site.AttachmentFiles[0].ServerRelativeUrl : "",
                ProjectType: site.Project_x0020_Type       
            });
        });
    }
}